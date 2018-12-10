import axios from 'axios';
import apiConfig from '../api/config';

export const logServer = (logMessage) => {
	const axiosConfig = {
		method: 'post',
		timeout: apiConfig.networkTimeoutThreshold,
		data: {
			category: 'log',
			content: logMessage,
		},
	};
	axios(`${apiConfig.url}/users/applog/`, axiosConfig).catch(() => {});
};
