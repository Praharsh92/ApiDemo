import * as actionTypes from './actionTypes';

export const initialState = {
	fetchingNetworkData: false,
};


export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
				fetchingNetworkData: action.fetchingNetworkData,
			};
		default:
			return state;
	}
};
