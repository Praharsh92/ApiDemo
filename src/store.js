import {
	compose, createStore, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { getFetchApi } from 'Root/src/services/api';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';

import { reducer as combinedReducer } from './state/reducer';

// for redux debugging
/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	}) : compose;
/* eslint-enable */

export default (initialState, { isServer }) => {
	let store;
	const fetchApi = () => getFetchApi(store.dispatch, store.getState);
	const enhancer = (
		composeEnhancers(applyMiddleware(thunk.withExtraArgument({ fetchApi })))
	);
	if (isServer) {
		store = createStore(combinedReducer, initialState, enhancer);
	} else {
		const persistConfig = {
			storage: localForage,
			key: 'userData',
		};
		const persistedReducer = persistReducer(persistConfig, combinedReducer);
		store = createStore(persistedReducer, initialState, enhancer);

		store.__persistor = persistStore(store, {}, () => {});
	}
	return store;
};
