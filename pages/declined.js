import React from 'react';
import withRoot from 'Root/src/withRoot';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Clear';


import MainHeader from 'Root/src/components/mainHeader';

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
		marginTop: 10,
		fontSize: '1.5rem',
		textTransform: 'capitalize',
	},
});

const Index = ({ classes }) => (
	<div className={classes.root}>
		<Head>
			<title>Demo API</title>
		</Head>
		<Grid container spacing={0}>
			<MainHeader showLogout={false} />
		</Grid>
		<Grid container spacing={0} style={{ display: 'flex', flex: 1 }}>
			<Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
				<div className={classes.content}>
					<ErrorIcon style={{ height: 45, width: 45 }} />
					<Typography component="h2" variant="h2" className={classes.btnText}>Declined!</Typography>
				</div>
			</Grid>
		</Grid>
	</div>
);

Index.propTypes = {
	classes: PropTypes.object.isRequired,
};


export default compose(
	withRoot,
	withStyles(styles),
)(Index);
