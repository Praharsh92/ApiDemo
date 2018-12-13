import Router from 'next/router';
import stateMap from 'Root/src/state/stateMap';
import { updateUser } from 'Root/src/state/user/actions';
import * as actionTypes from './actionTypes';
import * as api from './api';


export const checkEligibility = data => (
	(dispatch, getState, { fetchApi }) => api.checkEligibility(fetchApi, data)
		.then((response) => {
			if (response.data.next_state === 'declined') {
				Router.push(`/${response.data.next_state}`);
			} else if (response.data.next_state === 'register') {
				dispatch({
					type: actionTypes.CHECKED_ELIGIBILITY,
					payload: true,
					uuid: response.data.uuid,
				});
				Router.push(`/${response.data.next_state}`);
			}
		})
);
export const getEligibilityData = () => (
	(dispatch, getState, { fetchApi }) => api.getEligibilityData(fetchApi)
);

export const submitFurtherDetails = data => (
	(dispatch, getState, { fetchApi }) => api.submitFurtherDetails(fetchApi, data)
		.then((response) => {
			if (response.data.status === 'ok') {
				dispatch(updateUser(response.data.user));
				Router.push('/choose-package');
			} else if (response.data.status === 'nok') {
				Router.push('/declined');
			}
		})
);
export const register = (username, password, email, passedUuid) => (
	(dispatch, getState, { fetchApi }) => api.register(fetchApi, username, password, email, passedUuid)
		.then((response) => {
			if (response.data.status === 'nok') {
				return response;
			}
			if (response.data.status === 'ok') {
				dispatch({
					type: actionTypes.CHECKED_ELIGIBILITY,
					payload: false,
				});
				dispatch(updateUser(response.data.user));
			}
			return response;
		})
);

export const getFurtherDetails = () => (
	(dispatch, getState, { fetchApi }) => api.getFurtherDetails(fetchApi)
);

export const getPackage = () => (
	(dispatch, getState, { fetchApi }) => api.getPackage(fetchApi)
);
export const submitPackage = packageId => (
	(dispatch, getState, { fetchApi }) => api.submitPackage(fetchApi, packageId)
		.then((response) => {
			if (response.data.status === 'ok') {
				Router.push('/dashboard');
			}
		})
);

export const verifyLogin = (username, password) => (dispatch, getState, { fetchApi }) => (
	api.verifyLogin(fetchApi, username, password));
