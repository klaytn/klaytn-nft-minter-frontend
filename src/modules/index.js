import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import kasReducer, { kasSaga } from './kas';
import klipReducer, { klipSaga } from './klip';
import kaikasReducer, { kaikasSaga } from './kaikas';

const rootReducer = combineReducers({klipReducer, kasReducer, kaikasReducer});
export function* rootSaga() {
  yield all([klipSaga(), kasSaga(), kaikasSaga()])
}

export default rootReducer;