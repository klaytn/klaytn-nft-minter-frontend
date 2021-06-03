
import { handleActions } from 'redux-actions';
import { createRoutine } from "redux-saga-routines";
import { prepare, getResult } from 'klip-sdk'
import { createDefaultReducer } from "./utils";
import { all, delay, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

export const setKaikasAddressRoutine = createRoutine('setKaikasAddress')
export const kaikasLogoutRoutine = createRoutine('kaikasLogout')
export const kaikasSendTxRoutine = createRoutine('kaikasSendTx')

function* setKaikasAddressSaga(action) {
  const klaytnAddress = action.payload.klaytnAddress
  localStorage.setItem('kaikasAddress', klaytnAddress)
  yield put(setKaikasAddressRoutine.success({klaytnAddress}))
}

function* kaikasLogoutSaga(action) {
  localStorage.setItem('kaikasAddress', '')
  yield put(setKaikasAddressRoutine.success({klaytnAddress:''}))
}

function* kaikasSendTxSaga(action) {
  const txRlp = action.payload.rawTransaction
  var r = yield axios.post(`${process.env.REACT_APP_BACKEND_URL}/nft/transfer`,{txRlp})

  yield put(kaikasSendTxRoutine.success({result:r.data}))

}

const routines = [
  {routine:setKaikasAddressRoutine, saga:setKaikasAddressSaga},
  {routine:kaikasLogoutRoutine, saga:kaikasLogoutSaga},
  {routine:kaikasSendTxRoutine, saga:kaikasSendTxSaga}
]

export function* kaikasSaga() {
  yield all(routines.map(x=> {
    return takeLatest(x.routine.TRIGGER, x.saga)
  }))
}

export default handleActions({
  ...createDefaultReducer(routines),
}, {})