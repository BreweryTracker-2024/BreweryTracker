/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers/reducers";

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
