import * as actionTypes from './actionTypes';


export const updateNetworkErrorFlag = errorFlag => ({
	type: actionTypes.UPDATE_NETWORK_ERROR,
	networkError: errorFlag,
});

export const updateNetworkTimeoutErrorFlag = errorFlag => ({
	type: actionTypes.UPDATE_NETWORK_TIMEOUT_ERROR,
	timeoutError: errorFlag,
});
