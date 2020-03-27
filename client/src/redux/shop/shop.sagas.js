import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  //yield console.log("redux saga fetchCollections");
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get(); // returns a promise form like async await

    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // dispatch 
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // yield control back to the library
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}


export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}