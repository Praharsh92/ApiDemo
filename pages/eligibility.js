import React from 'react';
import LayOut from 'Root/src/components/formLayout';
import Eligibility from 'Root/src/containers/eligibility';
import withRoot from 'Root/src/withRoot';

const EligibilityPage = () => (
	<LayOut title="Eligibility" description="Eligibility Check" titleHead="Eligibility" subTitle="Testing Eligibility">
		<Eligibility />
	</LayOut>
);

export default withRoot(EligibilityPage);
