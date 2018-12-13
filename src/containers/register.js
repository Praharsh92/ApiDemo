import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextInput from 'Root/src/components/form/textinput';
import { notEmptyValidator, emailValidator } from 'Root/src/components/form/validator';
import { register } from 'Root/src/state/application/actions';
import { updateUser, logOut } from 'Root/src/state/user/actions';
import stateMap from 'Root/src/state/stateMap';


const validators = {
	username: {
		validatorMethod: notEmptyValidator,
	},
	password: {
		validatorMethod: notEmptyValidator,
	},
	email: {
		validatorMethod: emailValidator,
	},
};

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			error: false,
			errorMessage: '',
			validateForm: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const { canRegister, user } = this.props;
		if (!canRegister && user.status === 'nok') {
			Router.push('/eligibility');
		}
	}

	handleClick = (e) => {
		this.setState({ error: false, errorMessage: '' });
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
			const { username, password, email } = this.state;
			const { registerUser, passedUuid } = this.props;
			registerUser(username, password, email, passedUuid)
				.then((res) => {
					console.log('in then setting state', res);
					if (res.data.status === 'nok') {
						this.setState({ error: true, errorMessage: res.data.response });
					}
					return res;
				})
				.then((res) => {
					// console.log(res);
					console.log('in 2nd then pushing', res);
					if (res.data.status === 'ok') {
						Router.push(stateMap.indepth_details);
					}
				});
		}
	}

	render() {
		const {
			validateForm, username, password, email, error, errorMessage,
		} = this.state;
		const { user } = this.props;
		console.log(this.props);
		if (user.status === 'ok') {
			return (
				<div>
					<Typography variant="h2" style={{ fontSize: 18,	textTransform: 'capitalize' }}>Hello {user.username}</Typography>
					<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize', marginTop: 10 }}>you are already Registered</Typography>
					<Button variant="outlined" onClick={() => this.props.logOut()} style={{ marginTop: 20 }}>
						<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize' }}>Logout</Typography>
					</Button>
				</div>
			);
		}

		return (
			<div>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="username"
						label="Username"
						value={username}
						onChange={this.handleClick}
						validationHelper={validators.username}
						validateForm={validateForm}
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="password"
						label="Password"
						value={password}
						onChange={this.handleClick}
						validationHelper={validators.password}
						validateForm={validateForm}
						componentType="password"
					/>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
					<TextInput
						id="email"
						label="Email Id"
						value={email}
						onChange={this.handleClick}
						validationHelper={validators.email}
						validateForm={validateForm}
					/>
				</Grid>
				{error &&	(
					<Grid item xs={12} style={{ textAlign: 'center', padding: 4 }}>
						<Typography color="error" align="center">
							{errorMessage}
						</Typography>
					</Grid>
				)}
				<Grid item xs={12} style={{ padding: 8 }}>
					<Button variant="outlined" onClick={() => this.submitForm()}>
						<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize' }}>Submit</Typography>
					</Button>
				</Grid>
			</div>
		);
	}
}


Register.propTypes = {
	user: PropTypes.object.isRequired,
	registerUser: PropTypes.func.isRequired,
	canRegister: PropTypes.bool.isRequired,
	logOut: PropTypes.func.isRequired,
	passedUuid: PropTypes.string,
};

const mapStateToProps = state => ({
	user: state.user.user,
	canRegister: state.application.letUserRegister,
	passedUuid: state.application.uuid,
});


const mapDispatchToProps = dispatch => ({
	registerUser:
	(username, password, email, passedUuid) => dispatch(register(
		username, password, email, passedUuid,
	)),
	logOut: () => dispatch(logOut()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
