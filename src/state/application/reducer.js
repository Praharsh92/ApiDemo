import * as actionTypes from './actionTypes';

const initialState = {
	letUserRegister: false,
	signupErrorCode: 'error_signing_up',
	signupError: 'Error while signing up',
	uuid: '',
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHECKED_ELIGIBILITY:
			return {
				...state,
				letUserRegister: action.payload,
				uuid: action.uuid,
			};
		case actionTypes.SIGNUP_ERROR:
			return {
				...state,
				eligibilityAppState: 'error',
				signupErrorCode: action.payload.code,
				signupError: action.payload.data,
			};
		case actionTypes.SIGNUP_SUCCESS:
			return {
				...state,
				eligibilityAppState: 'success',
			};
		default:
			return state;
	}
};
