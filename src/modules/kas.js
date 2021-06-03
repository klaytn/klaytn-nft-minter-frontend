import { handleActions } from 'redux-actions';
import { createRoutine } from "redux-saga-routines";
import { createDefaultReducer } from "./utils";
import { all, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

export const kasGetMyNFTsRoutine = createRoutine('kasGetMyNFTs')
export const kasGetMintedNFTsRoutine = createRoutine('kasGetMintedNFTs')
export const kasNFTInfoRoutine = createRoutine('kasNFTInfo')

function* kasGetMyNFTsSaga(action) {
  var r = yield axios.get(`${process.env.REACT_APP_BACKEND_URL}/nft/mine/${action.payload.addr}`)

  yield put(kasGetMyNFTsRoutine.success({result:r.data.items}))
}

function* kasGetMintedNFTsSaga(action) {
  var r = yield axios.get(`${process.env.REACT_APP_BACKEND_URL}/nft/minted/${action.payload.addr}`)

  yield put(kasGetMintedNFTsRoutine.success({result:r.data.items}))
}

function* kasNFTInfoSaga(action) {
  var r = yield axios.get(`${process.env.REACT_APP_BACKEND_URL}/nft/info/${action.payload.contractAddr}/${action.payload.tokenId}`)
  console.log(r.data)
  yield put(kasNFTInfoRoutine.success({result:r.data}))
}

const routines = [
  {routine:kasGetMyNFTsRoutine, saga:kasGetMyNFTsSaga},
  {routine:kasGetMintedNFTsRoutine, saga:kasGetMintedNFTsSaga},
  {routine:kasNFTInfoRoutine, saga:kasNFTInfoSaga},
]

export function* kasSaga() {
  yield all(routines.map(x=> {
    return takeLatest(x.routine.TRIGGER, x.saga)
  }))
}

export default handleActions({
  ...createDefaultReducer(routines),
}, {})