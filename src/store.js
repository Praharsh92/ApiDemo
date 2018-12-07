import {
	compose, createStore, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as combinedReducer } from './state/reducer';

// for redux debugging
/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	}) : compose;
/* eslint-enable */

// TODO: write fetch api
const fetchApi = () => {
	console.log('fecting');
};

export default (initialState) => {
	const enhancer = (
		composeEnhancers(applyMiddleware(thunk.withExtraArgument({ fetchApi })))
	);

	const store = createStore(combinedReducer, initialState, enhancer);

	return store;
};
