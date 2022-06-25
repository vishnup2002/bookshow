import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import Reducers from "../Reducers";

let store;

export function configureStore() {
  store = createStore(Reducers, applyMiddleware(thunk, logger));
  return store;
}
