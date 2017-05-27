 // Example 1:

/*import { createStore } from 'redux';

const reducer = function(state, action){
	if (action.type === "INCREMENT"){
		return state + action.payload;
	}
	if (action.type === "DECREMENT"){
		return state - action.payload;
	}
	return state;
}

const store = createStore(reducer, 0);

store.subscribe( () => {
	console.log("Store changed, new state: ", store.getState());
});

store.dispatch({type: "INCREMENT", payload: 7});
store.dispatch({type: "INCREMENT", payload: 2});
store.dispatch({type: "INCREMENT", payload: 8});
store.dispatch({type: "DECREMENT", payload: 10});
store.dispatch({type: "INCREMENT", payload: 70});*/





import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
//import promise from "redux-promise-middleware";

const customLogger = (store) => (next) => (action) => {
	console.log("Middleware logged an action");
	//action.type = "DEC"; <-We could forcibly change the type for all incoming actions
	next(action);
}
//Could use a custom middleware to catch errors:
const error = (store) => (next) => (action) => {
	try{
		next(action);
	}catch(e){
		console.log("Error: ", e);
	}
}

const middleware = applyMiddleware(thunk, logger);

const userReducer = (state={}, action) => {

	switch (action.type){
		case "CHANGE_NAME":
			state = Object.assign({}, state, {name: action.payload});
			break;
		case "CHANGE_AGE":
			state = Object.assign({}, state, {age: action.payload});
			break;
	}
	return Object.assign({}, state);
}

const tweetsReducer = (state=[], action) => {

	switch (action.type){
		case "ADD_TWEET":
			state = state.concat(action.payload);
	}
	return state.concat();
}


let usersLogInitialState = {
	fetching: false,
	fetched: false,
	users: [],
	error: null
}
const usersLogReducer = (state=usersLogInitialState, action) => {

	switch (action.type){
		case "FETCH_USERS_START":
			return Object.assign({}, state, {fetching: true});
			break;
		case "FETCH_USERS_ERROR":
			return Object.assign({}, state, {error: action.payload});
			break;
		case "RECEIVE_USERS":
			return Object.assign({}, state, {
				fetching: false,
				fetched: true,
				users: action.payload,
				error: null
			});
			break;
	}
	return Object.assign({}, state);
}

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetsReducer,
	usersLog: usersLogReducer
});
const store = createStore(reducers, {}, middleware);

store.subscribe( () => {
	console.log("Store changed, new state: ", store.getState());
});

store.dispatch({type: "CHANGE_NAME", payload: "Kell"});
store.dispatch({type: "CHANGE_AGE", payload: 27});
store.dispatch({type: "ADD_TWEET", payload: "Random Tweet"});

store.dispatch( (dispatch) => {
	dispatch({type: "FETCH_USERS_START"});
	axios.get("http://rest.learncode.academy/api/wstern/users")
		.then( (response) => {
			dispatch({type: "RECEIVE_USERS", payload: response.data});
		})
		.catch( (err) => {
			dispatch({type: "FETCH_USERS_ERROR", payload: err});
		});

});

/* Using redux-promise-middleware is a bit cleaner:

store.dispatch({
	type: "EXAMPLE_ACTION",
	payload: axios.get("http://rest.learncode.academy/api/wstern/users")
});

The middleware will detect that the payload is of a promise type and then
automatically dispatch actions of type X_PENDING, X_FULFILLED, or X_REJECTED as needed


source: https://www.youtube.com/watch?v=Td-2D-_7Y2E
*/


/* Basic Redux Template:

1. Creating reducer(s)
2. Applying middlewares
3. Creating store
4. Setting subscriptions
5. Dispatching actions

import {applyMiddleware, createStore } from "redux";

const reducer = (state={}, action) => {
	return state;
}

const middleware = applyMiddleware();
const store = createStore(reducer, middleware);

store.subscribe( () => {
	console.log("Store changed", store.getState());
});

store.dispatch({type: "Foo"});

*/