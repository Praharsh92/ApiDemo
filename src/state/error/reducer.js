import * as actionTypes from './actionTypes';

export const initialState = {
	networkError: false,
	networkTimeoutError: false,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_NETWORK_ERROR:
			return Object.assign({}, state, {
				networkError: action.networkError,
			});
		case actionTypes.UPDATE_NETWORK_TIMEOUT_ERROR:
			return Object.assign({}, state, {
				networkTimeoutError: action.timeoutError,
			});
		default:
			return state;
	}
};
