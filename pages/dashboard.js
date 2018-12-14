import React from 'react';
import withRoot from 'Root/src/withRoot';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


import MainHeader from 'Root/src/components/mainHeader';


const styles = () => ({
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
	progress: {
		width: '30%',
	},
	btnText: {
		marginBottom: 10,
		fontSize: '1.5rem',
		textTransform: 'capitalize',
	},
	btnText2: {
		marginTop: 10,
		fontSize: '1rem',
		textTransform: 'capitalize',
	},
});

const Index = ({ classes }) => (
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
					<Typography component="h2" variant="h2" className={classes.btnText}>DashBoard!</Typography>
					<LinearProgress className={classes.progress} />
					<Typography component="h2" variant="h2" className={classes.btnText2}>just static page without login check</Typography>
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
