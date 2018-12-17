import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextInput from 'Root/src/components/form/textinput';
import { notEmptyValidator } from 'Root/src/components/form/validator';
import { verifyLogin } from 'Root/src/state/application/actions';
import { updateUser, logOut } from 'Root/src/state/user/actions';
import stateMap from 'Root/src/state/stateMap';


const validators = {
	username: {
		validatorMethod: notEmptyValidator,
	},
	password: {
		validatorMethod: notEmptyValidator,
	},
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			error: false,
			errorMessage: '',
			validateForm: false,
		};
		this.handleClick = this.handleClick.bind(this);
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
			const { username, password } = this.state;
			const { login, updateloggedUser } = this.props;
			login(username, password)
				.then((res) => {
					if (res.data.status === 'ok') {
						updateloggedUser(res.data);
						Router.push(stateMap[res.data.current_state]);
					} else {
						this.setState({ error: true, errorMessage: res.data.response });
					}
				});
		}
	}

	render() {
		const {
			validateForm, username, password, error, errorMessage,
		} = this.state;
		const { user } = this.props;
		if (user.status === 'ok') {
			return (
				<div>
					<Typography variant="h2" style={{ fontSize: 18,	textTransform: 'capitalize' }}>Hello {user.username}</Typography>
					<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize', marginTop: 10 }}>you are already logged in</Typography>
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


Login.propTypes = {
	user: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	logOut: PropTypes.func.isRequired,
	updateloggedUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	user: state.user.user,
});


const mapDispatchToProps = dispatch => ({
	login: (username, password) => dispatch(verifyLogin(username, password)),
	updateloggedUser: data => dispatch(updateUser(data)),
	logOut: () => dispatch(logOut()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
