import { handleActions } from 'redux-actions';
import { createRoutine } from "redux-saga-routines";
import { prepare, getResult } from 'klip-sdk'
import { createDefaultReducer } from "./utils";
import { all, delay, put, takeLatest } from "redux-saga/effects";
import Caver from 'caver-js'
import axios from 'axios';

export const LOCAL_STORAGE_KEY_KLIP_ADDRESS='klipAddress'

export const getKlipAddressRoutine = createRoutine('getKlipAddress');
export const getKlipAddressFetcherRoutine = createRoutine('getKlipAddressFetcher')
export const klipLogoutRoutine = createRoutine('klipLogout')
export const klipSendRoutine = createRoutine('klipSend')
export const klipSendStatusCheckerRoutine = createRoutine('klipSendStatusChecker')

const caver = new Caver();

function* getKlipAddressSaga(action) {
  const bappName = process.env.REACT_APP_BAPP_NAME
  const successLink = ""
  const failLink = ""
  const res = yield prepare.auth({ bappName, successLink, failLink })
  const klipAddress = localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS)
  if( klipAddress && klipAddress !== '' ) {
    yield put(getKlipAddressFetcherRoutine.success({klaytnAddress:klipAddress}))
  } else {
    if (res.err) {
      // 에러 처리
      yield put(getKlipAddressRoutine.failure({err:res.err}));
    } else if (res.request_key) {
      yield put(getKlipAddressRoutine.success({requestKey:res.request_key}));
      yield put(getKlipAddressFetcherRoutine.trigger({requestKey:res.request_key}))
    }
  }
}

function* getKlipAddressFetcherSaga(action) {
  const res = yield getResult(action.payload.requestKey)
  if (res.status !== "completed") {
    yield delay(1000)
    yield put(getKlipAddressFetcherRoutine.trigger({requestKey:action.payload.requestKey}))
  } else {
    yield put(getKlipAddressFetcherRoutine.success({klaytnAddress:res.result.klaytn_address}))
    localStorage.setItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS, res.result.klaytn_address)
  }
}

function* klipLogoutSaga(action) {
  localStorage.setItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS, '')
  yield put(klipLogoutRoutine.success())
}

function* klipSendSaga(action) {
  const bappName = process.env.REACT_APP_BAPP_NAME
  const from = action.payload.from
  const recipient = action.payload.to
  const tokenId = action.payload.tokenId
  const value = '0'
  const to= action.payload.contractAddr

  const abi =
  `{
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }`
  const params =  `["${from}","${recipient}","${caver.utils.toBN(tokenId).toString()}"]`
  const successLink = ''
  const failLink = ''
  const res = yield prepare.executeContract({ bappName, from, to, value, abi, params, successLink, failLink })
  if (res.err) {
    console.log('send error', res.err)
    yield put(klipSendRoutine.failure({error:res.err}))
  } else if (res.request_key) {
    console.log('request key', res.request_key)
    yield put(klipSendRoutine.success({requestKey:res.request_key}));
    yield put(klipSendStatusCheckerRoutine.trigger({requestKey:res.request_key, contractAddr:action.payload.contractAddr,
    tokenId:action.payload.tokenId}))
  }
}

function* klipSendStatusCheckerSaga(action) {
  var res = yield axios.get(`${process.env.REACT_APP_BACKEND_URL}/klip/getResult/${action.payload.requestKey}`)
  res = res.data;
  if (res.status !== "completed") {
    if(res.status === "requested") {
      yield put(klipSendStatusCheckerRoutine.fulfill({requestKey:action.payload.requestKey, status:res.status}))
    }
    yield delay(1000)
    yield put(klipSendStatusCheckerRoutine.trigger({requestKey:action.payload.requestKey, contractAddr:action.payload.contractAddr,
    tokenId:action.payload.tokenId}))
  } else {
    yield put(klipSendStatusCheckerRoutine.success(res))
  }
}

const routines = [
  {routine:getKlipAddressRoutine, saga:getKlipAddressSaga},
  {routine:getKlipAddressFetcherRoutine, saga:getKlipAddressFetcherSaga},
  {routine:klipLogoutRoutine, saga:klipLogoutSaga},
  {routine:klipSendRoutine, saga:klipSendSaga},
  {routine:klipSendStatusCheckerRoutine, saga:klipSendStatusCheckerSaga}
]

export function* klipSaga() {
  yield all(routines.map(x=> {
    return takeLatest(x.routine.TRIGGER, x.saga)
  }))
}

export default handleActions({
  ...createDefaultReducer(routines),
}, {})