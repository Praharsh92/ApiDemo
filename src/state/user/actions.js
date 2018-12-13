import Router from 'next/router';
import * as profileActionTypes from './actionTypes';
import * as api from './api';

export const updateUser = user => ({
	type: profileActionTypes.UPDATE_USER,
	user,
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
			});
			Router.push('/');
		})
);
