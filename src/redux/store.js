import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk'
import postsReducer from './posts-reducer';




let reducers = combineReducers({
    posts: postsReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;