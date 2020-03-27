import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga'
//import thunk from 'redux-thunk'
import logger from "redux-logger";

import rootReducer from "./root-reducer";
import rootSaga from './root-saga'

//const middlewares = [thunk];/
// redux-saga implementation
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]
// apply redux logger
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

// spread all the methods in the array
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store); // persisted version of store
export default { store, persistor };
