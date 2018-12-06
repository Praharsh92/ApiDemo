import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const styles = () => ({
	appBarTransparent: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
	},
	loginButton: {
		justifySelf: 'flex-end',
	},
});


const MainHeader = ({	classes, showLogout }) => (
	<AppBar position="static" color="default" className={classes.appBarTransparent}>
		<Toolbar>
			<div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
				<Typography component="h2" variant="h2" style={{ fontSize: 22 }}>Demo API</Typography>
			</div>
			<div>
				{showLogout
					? (
						<Button color="inherit" className={classes.loginButton} onClick={() => console.log('log in')}>
							<Typography component="h2" variant="h2" style={{ fontSize: '0.875rem' }}>Login</Typography>
						</Button>
					)
					: null}
			</div>
		</Toolbar>
	</AppBar>
);

MainHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	showLogout: PropTypes.bool,
};

MainHeader.defaultProps = {
	showLogout: true,
};


export default withStyles(styles)(MainHeader);
