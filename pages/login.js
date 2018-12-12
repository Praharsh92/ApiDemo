import React from 'react';
import LayOut from 'Root/src/components/formLayout';
import Login from 'Root/src/containers/login';
import withRoot from 'Root/src/withRoot';

const LoginPage = () => (
	<LayOut title="Login" description="Log In!" titleHead="Log In!">
		<Login />
	</LayOut>
);

export default withRoot(LoginPage);
