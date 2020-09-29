"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _redux = require("redux");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defaults to localStorage for web
const persistConfig = {
  key: "root",
  storage: _storage.default
};

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // Redux DevTools, a must


const persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, _reducers.default);
const store = (0, _redux.createStore)(persistedReducer, enhancer);
exports.store = store;
const persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;