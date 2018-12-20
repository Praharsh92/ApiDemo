import Router from 'next/router';
import * as profileActionTypes from './actionTypes';
import * as api from './api';

export const updateUser = data => ({
	type: profileActionTypes.UPDATE_USER,
	user: data.user,
	currentState: data.current_state,
});
export const updateCurrState = payload => ({
	type: profileActionTypes.UPDATE_CURRENT_STATE,
	payload,
});
// export const logOut = () => ({
// 	type: profileActionTypes.UPDATE_USER,
// 	user: { status: 'nok' },
// });
// export const logOut = () => (
// 	(dispatch, { fetchApi }) => {
// 		api.logOut(fetchApi);
// 		dispatch({
// 			type: profileActionTypes.UPDATE_USER,
// 			user: { status: 'nok' },
// 		});
// 		Router.push('/');
// 	}
//
// );

export const logOut = () => (
	(dispatch, getState, { fetchApi }) => api.logOut(fetchApi)
		.then(() => {
			dispatch({
				type: profileActionTypes.UPDATE_USER,
				user: { status: 'nok' },
				currentState: 'eligibility',
			});
			Router.push('/');
		})
);
