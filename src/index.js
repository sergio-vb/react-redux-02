/* Example 1:
import { createStore } from 'redux';

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





import { combineReducers, createStore } from 'redux';

const userReducer = (state={}, action) => {

	switch (action.type){
		case "CHANGE_NAME":
			state = Object.assign({}, state, {name: action.payload});
			break;
		case "CHANGE_AGE":
			state = Object.assign({}, state, {age: action.payload});
			break;
	}
	return state;
}
const tweetsReducer = (state=[], action) => {

	switch (action.type){
		case "ADD_TWEET":
			state = state.concat(action.payload);
	}
	return state;	
}

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetsReducer
});
const store = createStore(reducers, {});

store.subscribe( () => {
	console.log("Store changed, new state: ", store.getState());
});

store.dispatch({type: "CHANGE_NAME", payload: "Kell"});
store.dispatch({type: "CHANGE_AGE", payload: 27});
store.dispatch({type: "ADD_TWEET", payload: "Random Tweet"});