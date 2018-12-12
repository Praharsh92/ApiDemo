import Router from 'next/router';
import * as profileActionTypes from './actionTypes';

export const updateUser = user => ({
	type: profileActionTypes.UPDATE_USER,
	user,
});
// export const logOut = () => ({
// 	type: profileActionTypes.UPDATE_USER,
// 	user: { status: 'nok' },
// });
export const logOut = () => (
	(dispatch) => {
		dispatch({
			type: profileActionTypes.UPDATE_USER,
			user: { status: 'nok' },
		});
		Router.push('/');
	}
);
