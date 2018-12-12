import React from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import LockedIcon from '@material-ui/icons/Lock';

import { formatInputToInr, getIntString } from './lib/inputHelpers';
import NumberFormat from './lib/numberformat';

function NumberFormatCurrency(props) {
	const { inputRef, ...other } = props;
	return (
		<NumberFormat
			{...other}
			formatInputFunc={formatInputToInr}
			ref={inputRef}
		/>
	);
}

NumberFormatCurrency.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

function NumberFormatInt(props) {
	const { inputRef, ...other } = props;
	return (
		<NumberFormat
			{...other}
			formatInputFunc={getIntString}
			ref={inputRef}
		/>
	);
}

NumberFormatInt.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			helperText: '',
		};
		this.validate = this.validate.bind(this);
	}


	shouldComponentUpdate(nextProps) {
		const { validateForm } = this.props;
		if (nextProps.validateForm !== validateForm) {
			this.validate(nextProps);
			return false;
		}
		return true;
	}

	provideInputProps() {
		const { componentType, value, disabled } = this.props;
		switch (componentType) {
			case 'currency':
				return {
					startAdornment: (value ? <InputAdornment position="start">₹</InputAdornment> : null),
					inputComponent: NumberFormatCurrency,
					endAdornment: (disabled && (
						<InputAdornment position="end">
							<LockedIcon />
						</InputAdornment>
					)),
				};
			case 'mobileNumber':
				return {
					startAdornment: (value ? <InputAdornment position="start">+91</InputAdornment> : null),
					inputComponent: NumberFormatInt,
					endAdornment: (disabled && (
						<InputAdornment position="end">
							<LockedIcon />
						</InputAdornment>
					)),
				};
			default:
				return {
					inputComponent: NumberFormatInt,
					endAdornment: (disabled && (
						<InputAdornment position="end">
							<LockedIcon />
						</InputAdornment>
					)),
				};
		}
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
			value, label, id, onChange, fullWidth, noErrorHelperText, disabled, placeholder,
		} = this.props;
		const { error, helperText } = this.state;
		return (
			<TextField
				label={label}
				id={id}
				name={id}
				value={value}
				fullWidth={fullWidth}
				onChange={(e) => {
					// Re-set the error flag, so that it gets set
					// again in onBlur, once the user is done with typing!
					if (error) {
						this.setState({ error: false });
					}
					onChange(e);
				}}
				disabled={disabled}
				onBlur={this.validate}
				error={error}
				helperText={error ? helperText : noErrorHelperText}
				InputProps={this.provideInputProps()}
				placeholder={placeholder}
			/>
		);
	}
}

NumberInput.propTypes = {
	validateForm: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	validationHelper: PropTypes.object.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	componentType: PropTypes.string,
	noErrorHelperText: PropTypes.string,
	placeholder: PropTypes.string,
};

NumberInput.defaultProps = {
	fullWidth: true,
	disabled: false,
	componentType: 'number',
	noErrorHelperText: '',
	placeholder: '',
};

export default NumberInput;
