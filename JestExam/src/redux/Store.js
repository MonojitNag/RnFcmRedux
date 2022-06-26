import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { mainReducer } from "./Reducer";

const rootReducer = combineReducers({mainReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));