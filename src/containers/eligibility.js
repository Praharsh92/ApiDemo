import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextInput from 'Root/src/components/form/textinput';
import NumberInput from 'Root/src/components/form/numberinput';
import { notEmptyValidator, dateValidator } from 'Root/src/components/form/validator';
import { checkEligibility, getEligibilityData } from 'Root/src/state/application/actions';

const validators = {
	amountRequested: {
		validatorMethod: notEmptyValidator,
	},
	revenue: {
		validatorMethod: notEmptyValidator,
	},
	companyName: {
		validatorMethod: notEmptyValidator,
	},
	dateOfRegistration: {
		validatorMethod: dateValidator,
	},
};

class Eligibility extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companyName: '',
			dateOfRegistration: '',
			revenue: '',
			amountRequested: '',
			validateForm: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		if (user.status !== 'nok') {
			this.props.getEligibilityData()
				.then((response) => {
					this.setState({
						lockEligibility: response.data.locked,
						dateOfRegistration: response.data.date_of_registration,
						revenue: `${response.data.revenue}`,
						amountRequested: `${response.data.amount_requested}`,
						companyName: response.data.company_name,
					});
				});
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
			this.props.checkEligibility(this.state);
		}
	}

	render() {
		const {
			amountRequested, lockEligibility, validateForm, dateOfRegistration, revenue, companyName,
		} = this.state;
		return (
			<div>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<NumberInput
						id="amountRequested"
						label="Desired Loan Amount"
						value={amountRequested}
						onChange={this.handleClick}
						validationHelper={validators.amountRequested}
						validateForm={validateForm}
						componentType="currency"
						disabled={lockEligibility}
						noErrorHelperText="Please Enter Desired Loan Amount"
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="dateOfRegistration"
						label="Date of Registration"
						value={dateOfRegistration}
						onChange={this.handleClick}
						validationHelper={validators.dateOfRegistration}
						validateForm={validateForm}
						componentType="date"
						disabled={lockEligibility}
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<NumberInput
						id="revenue"
						label="Company Revenue"
						value={revenue}
						onChange={this.handleClick}
						validationHelper={validators.revenue}
						validateForm={validateForm}
						disabled={lockEligibility}
						componentType="currency"
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="companyName"
						label="Company Name"
						value={companyName}
						onChange={this.handleClick}
						validationHelper={validators.companyName}
						validateForm={validateForm}
						disabled={lockEligibility}
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
Eligibility.propTypes = {
	checkEligibility: PropTypes.func.isRequired,
	getEligibilityData: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
	checkEligibility: data => dispatch(checkEligibility(data)),
	getEligibilityData: () => dispatch(getEligibilityData()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Eligibility);
