import axios from 'axios';

import { logServer } from 'Root/src/services/logServer';
import { updateFetchingNetworkDataFlag } from 'Root/src/state/api/actions';
import { updateNetworkErrorFlag, updateNetworkTimeoutErrorFlag } from 'Root/src/state/error/actions';
import apiConfig from './config';

export const getFetchApi = (dispatch, getState) => (endPoint, payload = {}, method = 'get', headers = {}) => {
	dispatch(updateFetchingNetworkDataFlag(true));

	const axiosConfig = {
		headers,
		method: method.toLowerCase(),
		timeout: apiConfig.networkTimeoutThreshold,
		/** TODO: figure out how to use finally in axios, had to do this */
		transformResponse: [(data) => {
			/* eslint no-param-reassign:0 */
			dispatch(updateFetchingNetworkDataFlag(false));
			if (typeof data === 'string') {
				try {
					data = JSON.parse(data);
				} catch (e) { /* Ignore */ }
			}
			return data;
		}],
	};
	if (method === 'get') {
		axiosConfig.params = payload;
	} else {
		axiosConfig.data = payload;
	}
	return axios(`${apiConfig.url}${endPoint}`, axiosConfig).catch((e) => {
		if (!e.response) {
			/** Only doing it in case of network error, or connection aborted,
					because in case of succesful network error, it will be handled by transformResponse */
			dispatch(updateFetchingNetworkDataFlag(false));
			// Timeout or Connection aborted
			if (e.code === 'ECONNABORTED') {
				dispatch(updateNetworkTimeoutErrorFlag(true));
				// Reset the flag after 1 second
				setTimeout(() => dispatch(updateNetworkTimeoutErrorFlag(false)), 1000);
			} else {
				dispatch(updateNetworkErrorFlag(true));
				// Reset the flag after 1 second
				setTimeout(() => dispatch(updateNetworkErrorFlag(false)), 1000);
			}
		} else {
			logServer(`fetchApi Error endpoint: ${endPoint} error: ${e.message}, ${JSON.stringify(e.response.data)} axiosConfig: ${JSON.stringify(axiosConfig)}`, getState);
		}
		throw e;
	});
};
