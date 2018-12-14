import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatInputToInr } from 'Root/src/components/form/lib/inputHelpers';
import Checkbox from '@material-ui/core/Checkbox';

import { getPackage, submitPackage } from 'Root/src/state/application/actions';


const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		padding: theme.spacing.unit,
		textAlign: 'center',
	},
	body: {
		textAlign: 'center',
		padding: theme.spacing.unit,
	},
}))(TableCell);

class ChoosePlan extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: '',
			locked: false,
			packages: null,
			prefetchedData: false,
			selectedIndex: null,
			error: false,
		};
	}


	componentDidMount() {
		const { user, getUserPackage } = this.props;
		if (user.status === 'nok') {
			Router.push('/login');
		}
		getUserPackage()
			.then((response) => {
				this.setState({
					...response.data, prefetchedData: true,
				});
			});
	}

	updatedSelectedLoan = (plan) => {
		const { locked } = this.state;
		if (locked) {
			return;
		}
		this.setState({ selectedIndex: plan.id, error: false });
	};

	submitForm = () => {
		const { submitSelectedPackage } = this.props;
		const { selectedIndex } = this.state;
		if (selectedIndex) {
			submitSelectedPackage(selectedIndex);
		} else {
			this.setState({ error: true });
		}
	}

	render() {
		const { prefetchedData } = this.state;
		if (!prefetchedData) {
			return null;
		}
		const {
			packages, amount, selectedIndex, locked, error,
		} = this.state;
		return (
			<div>
				<Grid item xs={12} style={{ padding: 4 }}>
					<Typography gutterBottom align="center">
							Please find below the available plans
							for loan amount of ₹ {formatInputToInr(amount)} Lakhs.
					</Typography>
				</Grid>
				<Grid item xs={12} style={{ padding: 8 }}>
					<Table>
						<TableHead>
							<TableRow>
								<CustomTableCell>Select</CustomTableCell>
								<CustomTableCell>Tenure</CustomTableCell>
								<CustomTableCell>Monthly EMI</CustomTableCell>
								<CustomTableCell>Interest Rate</CustomTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{packages.map((plan) => {
								const {
									emi, years: tenure, rate, selected,
								} = plan;
								return (
									<TableRow
										key={plan.id}
										hover
										selected={selected || plan.id === selectedIndex}
										onClick={() => { this.updatedSelectedLoan(plan); }}
									>
										<CustomTableCell component="th" scope="row" key={`checkbox${plan.id}`}>
											<Checkbox
												checked={selected || plan.id === selectedIndex}
												onChange={() => { this.updatedSelectedLoan(plan); }}
												color="primary"
											/>
										</CustomTableCell>
										<CustomTableCell key={`tenure${plan.id}`}>{tenure} Years</CustomTableCell>
										<CustomTableCell key={`emi${plan.id}`}>
											₹ {formatInputToInr(Math.round(emi))}
										</CustomTableCell>
										<CustomTableCell key={`rate${plan.id}`}>
											{rate} %
										</CustomTableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Grid>
				{ error
					&& (
						<Grid item xs={12} style={{ textAlign: 'center', padding: 4 }}>
							<Typography color="error" align="center">
								Please Select a Package
							</Typography>
						</Grid>
					)
				}
				{ !locked
				&& (
					<Grid item xs={12} style={{ padding: 8 }}>
						<Button variant="outlined" onClick={() => this.submitForm()}>
							<Typography variant="h2" style={{ fontSize: 14,	textTransform: 'capitalize' }}>Submit</Typography>
						</Button>
					</Grid>
				)
				}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	getUserPackage: () => dispatch(getPackage()),
	submitSelectedPackage: packageId => dispatch(submitPackage(packageId)),
});

ChoosePlan.propTypes = {
	getUserPackage: PropTypes.func.isRequired,
	submitSelectedPackage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	user: state.user.user,
});

ChoosePlan.contextTypes = {
	store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePlan);
