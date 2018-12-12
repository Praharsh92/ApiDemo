import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Router from 'next/router';
import ProfileIcon from '@material-ui/icons/Person';
import { logOut } from 'Root/src/state/user/actions';


const styles = () => ({
	appBarTransparent: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
	},
	loginButton: {
		justifySelf: 'flex-end',
	},
	loggedIngreet: {
		justifySelf: 'flex-end',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	nameDiv: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	nameText: {
		paddingRight: 10,
		paddingLeft: 5,
		fontSize: '0.875rem',
		textTransform: 'capitalize',
	},
});

class MainHeader extends React.Component {
	componentDidMount() {

	}


	render() {
		const {
			classes, showLogout, user, logUserOut,
		} = this.props;
		let btnText;
		let btnFunction;
		if (user.status === 'nok') {
			btnText = 'Login';
			btnFunction = () => { Router.push('/login'); };
		} else {
			btnText = 'Logout';
			btnFunction = () => { logUserOut(); };
		}
		return (
			<AppBar position="static" color="default" className={classes.appBarTransparent}>
				<Toolbar>
					<div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
						<Typography component="h2" variant="h2" style={{ fontSize: 22 }}>Demo API</Typography>
					</div>
					<div className={classes.nameDiv}>
						{(showLogout && user.status === 'ok')
						&& (
							<div className={classes.loggedIngreet}>
								<ProfileIcon />
								<Typography component="h2" variant="h2" className={classes.nameText}>{user.username}</Typography>
							</div>
						)
						}
						{showLogout
								&& (
									<Button color="inherit" className={classes.loginButton} onClick={btnFunction}>
										<Typography component="h2" variant="h2" style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>{btnText}</Typography>
									</Button>
								)
						}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

MainHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	showLogout: PropTypes.bool,
	user: PropTypes.object.isRequired,
	logUserOut: PropTypes.func.isRequired,
};

MainHeader.defaultProps = {
	showLogout: true,
};

const mapStateToProps = state => ({
	user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
	logUserOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainHeader));
