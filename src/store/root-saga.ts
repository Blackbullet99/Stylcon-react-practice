import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/categories.saga";
import { userSagas } from "./user/user.saga";

//generator function (Es6)
export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}
