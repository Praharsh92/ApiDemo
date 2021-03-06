const endPoints = {
	appdata: '/users/getuser',
	eligibility: '/users/eligibility/',
	signup: '/users/register/',
	login: '/users/login/',
	inDepth: '/users/indepth/',
	choosePackage: '/packages/choose-package/',
};

export const getAppData = fetchApi => fetchApi()(endPoints.appdata, {}, 'get');

export const checkEligibility = (fetchApi, data) => fetchApi()(endPoints.eligibility, data, 'post');

export const getEligibilityData = fetchApi => fetchApi()(endPoints.eligibility, {}, 'get');

export const submitFurtherDetails = (fetchApi, data) => fetchApi()(endPoints.inDepth, data, 'post');

export const getFurtherDetails = (fetchApi, data) => fetchApi()(endPoints.inDepth, data, 'get');

export const register = (fetchApi, username, password, email, passedUuid) => fetchApi()(
	endPoints.signup,
	{
		username, password, email, uuid: passedUuid,
	},
	'post',
);
export const submitPackage = (fetchApi, packageId) => fetchApi()(
	endPoints.choosePackage,
	{ id: packageId },
	'post',
);

export const getPackage = fetchApi => fetchApi()(endPoints.choosePackage, {}, 'get');

export const verifyLogin = (fetchApi, username, password) => fetchApi()(endPoints.login, { username, password }, 'post');
