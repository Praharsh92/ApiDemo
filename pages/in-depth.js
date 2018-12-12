import React from 'react';
import LayOut from 'Root/src/components/formLayout';
import FurtherDetails from 'Root/src/containers/furtherDetails';
import withRoot from 'Root/src/withRoot';

const InDepthPage = () => (
	<LayOut title="Further Details" description="Further Details" titleHead="Further Details" subTitle="Just Some More Details">
		<FurtherDetails />
	</LayOut>
);

export default withRoot(InDepthPage);
