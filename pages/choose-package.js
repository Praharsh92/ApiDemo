import React from 'react';
import LayOut from 'Root/src/components/formLayout';
import ChoosePackage from 'Root/src/containers/choosePackage';
import withRoot from 'Root/src/withRoot';

const ChoosePackagePage = () => (
	<LayOut title="Packages" description="Packages" titleHead="Choose Package" noHorizontalPadding>
		<ChoosePackage />
	</LayOut>
);

export default withRoot(ChoosePackagePage);
