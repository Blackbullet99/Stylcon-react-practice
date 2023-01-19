import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCollectionAndDocument } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPE } from "./categories.type";

//saga generator function
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCollectionAndDocument);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// accumulator that holds all of the sagas
//that are related to the categories
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
