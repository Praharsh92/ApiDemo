import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextInput from 'Root/src/components/form/textinput';
import NumberInput from 'Root/src/components/form/numberinput';
import Select from 'Root/src/components/form/select';
import { notEmptyValidator, selectValidator } from 'Root/src/components/form/validator';
import { submitFurtherDetails } from 'Root/src/state/application/actions';

const validators = {
	taxRegNo: {
		validatorMethod: notEmptyValidator,
	},
	sector: {
		validatorMethod: notEmptyValidator,
	},
	location: {
		validatorMethod: selectValidator,
	},
};

const locationOptions = [
	{ id: 1, value: 'Urban' },
	{ id: 2, value: 'Semi-Urban' },
	{ id: 3, value: 'Rural' },
];

class FurtherDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taxRegNo: '',
			sector: '',
			location: '',
			validateForm: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		console.log(user);
		if (user.status === 'nok') {
			Router.push('/eligibility');
		}
	}

	handleClick = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	submitForm = () => {
		this.setState({ validateForm: true });
		let isInvalid = false;
		Object.keys(this.state).some((key) => {
			if (validators[key] && validators[key].validatorMethod(this.state[key]) !== null) {
				isInvalid = true;
				return true; // to short-circuit the Array.prototype.some
			}
			return false;
		});
		if (!isInvalid) {
			this.props.submitFurtherDetails(this.state);
		}
	}

	render() {
		const {
			lockFurtherDetails, validateForm, taxRegNo, sector, location,
		} = this.state;
		return (
			<div>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<NumberInput
						id="taxRegNo"
						label="Tax Registartion Number"
						value={taxRegNo}
						onChange={this.handleClick}
						validationHelper={validators.taxRegNo}
						validateForm={validateForm}
						disabled={lockFurtherDetails}
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="sector"
						label="Sector"
						value={sector}
						onChange={this.handleClick}
						validationHelper={validators.sector}
						validateForm={validateForm}
						disabled={lockFurtherDetails}
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<Select
						id="location"
						label="Location"
						value={location}
						onChange={this.handleClick}
						validationHelper={validators.location}
						validateForm={validateForm}
						options={locationOptions}
						disabled={lockFurtherDetails}
					/>
				</Grid>
				<Grid item xs={12} style={{ padding: 8 }}>
					<Button variant="outlined" onClick={() => this.submitForm()}>
						<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize' }}>Submit</Typography>
					</Button>
				</Grid>
			</div>
		);
	}
}

FurtherDetails.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
	submitFurtherDetails: data => dispatch(submitFurtherDetails(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FurtherDetails);
