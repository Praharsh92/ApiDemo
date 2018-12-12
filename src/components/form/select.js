import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class CfSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			helperText: '',
		};
		this.validate = this.validate.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.validateForm !== this.props.validateForm) {
			this.validate(nextProps);
			return false;
		}
		return true;
	}


	validate() {
		const {
			validationHelper, value, label,
		} = this.props;
		const error = validationHelper.validatorMethod(value, label);
		if (error !== null) {
			this.setState({ error: true, helperText: error });
			return false;
		} else {
			this.setState({ error: false, helperText: '' });
		}
		return true;
	}


	render() {
		const {
			id, value, options, onChange,
			label, metric, noErrorHelperText,
			disabled,
		} = this.props;
		return (
			<FormControl fullWidth>
				<InputLabel
					htmlFor={id}
					error={this.state.error}
				>
					{label}
				</InputLabel>
				<Select
					value={value}
					onChange={(e) => {
						// Re-set the error flag, so that it gets set
						// again in onBlur, once the user is done with typing!
						if (this.state.error) {
							this.setState({ error: false });
						}
						onChange(e);
					}}
					style={{ textAlign: 'left' }}
					error={this.state.error}
					onBlur={this.validate}
					inputProps={{
						name: id,
						id,
					}}
					disabled={disabled}
				>
					{options.map(option => (
						<MenuItem key={option.id} value={option[metric]}>
							{option[metric]}
						</MenuItem>))}
				</Select>
				{this.state.error
					? <FormHelperText error>{this.state.helperText}</FormHelperText> : null}
				{(!this.state.error && noErrorHelperText)
					? <FormHelperText>{noErrorHelperText}</FormHelperText> : null}
			</FormControl>
		);
	}
}

CfSelect.propTypes = {
	validateForm: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	validationHelper: PropTypes.object.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	metric: PropTypes.string,
	noErrorHelperText: PropTypes.string,
	disabled: PropTypes.bool,
};

CfSelect.defaultProps = {
	metric: 'value',
	disabled: false,
	noErrorHelperText: '',
};

export default CfSelect;
