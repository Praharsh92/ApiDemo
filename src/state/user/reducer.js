import * as actionTypes from './actionTypes';

const initialState = {
	user: {
		status: 'nok',
	},
	currentState: 'eligibility',
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_USER:
			return {
				user: action.user,
				currentState: action.currentState,
			};
		case actionTypes.UPDATE_CURRENT_STATE:
			return {
				...state,
				currentState: action.payload,
			};
		default:
			return state;
	}
};
