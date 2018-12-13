const endPoints = {
	logOut: '/users/logout/',
};

export const logOut = fetchApi => fetchApi()(endPoints.logOut, {}, 'post');
