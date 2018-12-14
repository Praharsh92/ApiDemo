import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextInput from 'Root/src/components/form/textinput';
import Select from 'Root/src/components/form/select';
import { notEmptyValidator, selectValidator } from 'Root/src/components/form/validator';
import { submitFurtherDetails, getFurtherDetails } from 'Root/src/state/application/actions';

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

const sectorOptions = [
	{ id: 'Agriculture', value: 'Agriculture' },
	{ id: 'Retail', value: 'Retail' },
	{ id: 'Medical Research', value: 'Medical Research' },
	{ id: 'Infrastructure', value: 'Infrastructure' },
	{ id: 'Finance', value: 'Finance' },
	{ id: 'Others', value: 'Others' },
];

class FurtherDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taxRegNo: '',
			sector: '',
			location: '',
			validateForm: false,
			lockFurtherDetails: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		if (user.status === 'nok') {
			Router.push('/login');
		} else {
			this.props.getFurtherDetails()
				.then((response) => {
					console.log(response);
					if (response.data.locked) {
						this.setState({
							...response.data,
							lockFurtherDetails: response.data.locked,
							location: response.data.address,
							taxRegNo: response.data.tax_reg_no,
						});
					}
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
					<TextInput
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
					<Select
						id="sector"
						label="Sector"
						value={sector}
						onChange={this.handleClick}
						validationHelper={validators.sector}
						validateForm={validateForm}
						options={sectorOptions}
						disabled={lockFurtherDetails}
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="location"
						label="Address"
						value={location}
						onChange={this.handleClick}
						validationHelper={validators.location}
						validateForm={validateForm}
						disabled={lockFurtherDetails}
					/>
				</Grid>
				<Grid item xs={12} style={{ padding: 8 }}>
					{!lockFurtherDetails && (
						<Button variant="outlined" onClick={() => this.submitForm()}>
							<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize' }}>Submit</Typography>
						</Button>
					)}
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
	getFurtherDetails: () => dispatch(getFurtherDetails()),
});


export default connect(mapStateToProps, mapDispatchToProps)(FurtherDetails);
