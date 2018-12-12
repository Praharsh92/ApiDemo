import React from 'react';
import LayOut from 'Root/src/components/formLayout';
import Register from 'Root/src/containers/register';
import withRoot from 'Root/src/withRoot';

const RegisterPage = () => (
	<LayOut title="Register" description="Register" titleHead="Register!" subTitle="Testing Register">
		<Register />
	</LayOut>
);

export default withRoot(RegisterPage);
