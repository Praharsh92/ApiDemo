import React from 'react';
import LayOut from 'Root/src/components/formLayout';
import Eligibility from 'Root/src/containers/eligibility';
import withRoot from 'Root/src/withRoot';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';


class Index extends React.Component {
	componentDidMount() {
		// const { store } = this.context;
		// this.prefetchComponentData(store.dispatch);
		console.log(this.props, this.context);
	}

	// prefetchComponentData(dispatch) {
	// 	dispatch(getEligibilityData())
	// 		.then((response) => {
	// 			if (response.data.data) {
	// 				this.setState({
	// 					...response.data.data,
	// 				});
	// 			}
	// 		});
	// }

	// static getInitialProps({
	// 	store, isServer, pathname, query,
	// }) {
	// 	console.log(store);
	// 	return { custom: 'custom' }; // you can pass some custom props to component from here
	// }

	render() {
		return (
			<LayOut title="Eligibility" description="Eligibility Check" titleHead="Test to Test" subTitle="Testing Eligibility">
				<Eligibility />
			</LayOut>
		);
	}
}
Index.getInitialProps = async ({ req, store, isServer }) => {
	if (isServer) {
		console.log('yup its server');
	}
};

Index.contextTypes = {
	store: PropTypes.object.isRequired,
};


export default compose(connect(),
	withRoot)(Index);
