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
store.dispatch({type: "INCREMENT", payload: 70});