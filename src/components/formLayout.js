import React from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import MainHeader from 'Root/src/components/mainHeader';
import Typography from '@material-ui/core/Typography';


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
});

const LayOutLogin = ({
	children, classes, titleHead, subTitle, title, description,
}) => (
	<div className={classes.root}>
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Head>
		<Grid container spacing={0}>
			<MainHeader />
		</Grid>
		<Grid container spacing={0} style={{ display: 'flex', flex: 1 }}>
			<Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
				<div className={classes.content}>
					<Card className={classes.card} classes={{ root: classes.cardBackground }}>
						{titleHead !== ''
							? (
								<CardContent className={classes.cardHeader}>
									<Grid item xs={12} style={{ paddingTop: 8 }}>
										<Typography variant="h5" gutterBottom align="center" className={classes.titleHead}>{titleHead}</Typography>
										{ subTitle !== ''
											? <Typography variant="h6" align="center" className={classes.subTitle}>{subTitle}</Typography>
											: null}
									</Grid>
								</CardContent>
							)
							: null }
						<CardContent className={classes.cardChildren} style={{ position: 'relative' }}>
							{children}
						</CardContent>
					</Card>
				</div>
			</Grid>
		</Grid>
	</div>
);

LayOutLogin.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.object.isRequired,
	titleHead: PropTypes.string,
	subTitle: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
};
LayOutLogin.defaultProps = {
	titleHead: '',
	subTitle: '',
	title: 'API Demo',
	description: 'Eligibility Page',
};


export default (withStyles(styles)(LayOutLogin));
