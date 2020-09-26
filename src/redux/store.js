import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from "./reducers";

const persistConfig = {
  key: 'root',
  storage,
}

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools, a must

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store);
