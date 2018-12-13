import React from 'react';
import withRoot from 'Root/src/withRoot';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import MainHeader from 'Root/src/components/mainHeader';
import stateMap from 'Root/src/state/stateMap';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		background: 'linear-gradient(to right, #ece9e6, #ffffff);',
	},
	content: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		paddingTop: 20,
		paddingBottom: 20,
		// background: 'linear-gradient(to top, #8e9eab, #eef2f3);',
	},
	cardBackground: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	cardHeader: {
		padding: theme.spacing.unit * 2,
		paddingBottom: 0,
		minHeight: '15vh',
		justifyContent: 'flex-end',
		display: 'flex',
		flexDirection: 'column',
	},
	card: {
		padding: '0 20px',
		width: '30%',
		minWidth: 400,
		[theme.breakpoints.down('sm')]: {
			width: '60%',
		},
	},
	titleHead: {
		fontWeight: 300,
	},
	subTitle: {
		fontSize: '1rem',
		fontWeight: 400,
	},
	btnText: {
		fontSize: '0.875rem',
		textTransform: 'capitalize',
	},
});

const Index = ({ classes, user }) => {
	let btnText;
	let btnFunction;
	if (user.status === 'nok') {
		btnText = 'Start Application';
		btnFunction = () => { Router.push('/eligibility'); };
	} else {
		btnText = 'Continue to App';
		btnFunction = () => { Router.push(stateMap[user.user.current_state]); };
	}
	return (
		<div className={classes.root}>
			<Head>
				<title>Demo API</title>
			</Head>
			<Grid container spacing={0}>
				<MainHeader />
			</Grid>
			<Grid container spacing={0} style={{ display: 'flex', flex: 1 }}>
				<Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
					<div className={classes.content}>
						<Button variant="outlined" onClick={btnFunction}>
							<Typography component="h2" variant="h2" className={classes.btnText}>{btnText}</Typography>
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};
const mapStateToProps = state => ({
	user: state.user.user,
});

Index.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};


export default compose(
	connect(mapStateToProps),
	withRoot,
	withStyles(styles),
)(Index);
