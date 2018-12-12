import * as actionTypes from './actionTypes';

const initialState = {
	user: {
		status: 'nok',
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_USER:
			return {
				user: action.user,
			};
		default:
			return state;
	}
};
