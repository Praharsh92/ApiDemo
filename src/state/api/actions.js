import * as actionTypes from './actionTypes';

export const updateFetchingNetworkDataFlag = fetchingNetworkData => ({
	type: actionTypes.UPDATE,
	fetchingNetworkData,
});
