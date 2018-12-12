import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockedIcon from '@material-ui/icons/Lock';

import TextField from '@material-ui/core/TextField';

class TextInput extends React.Component {
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

	provideInputLabelProps() {
		const { componentType } = this.props;
		switch (componentType) {
			case 'date':
				return {
					shrink: true,
				};
			default:
				return {};
		}
	}

	provideInputProps() {
		const { componentType, disabled } = this.props;
		switch (componentType) {
			case 'date':
				return {
					endAdornment: (disabled && (
						<InputAdornment position="end">
							<LockedIcon />
						</InputAdornment>
					)),
				};
			default:
				return {
					endAdornment: (disabled && (
						<InputAdornment position="end">
							<LockedIcon />
						</InputAdornment>
					)),
				};
		}
	}


	render() {
		const {
			value, id, onChange, label, noErrorHelperText,
			componentType, isMultiLine, disabled, capitalize,
		} = this.props;
		return (
			<TextField
				fullWidth
				label={label}
				id={id}
				name={id}
				value={value}
				multiline={isMultiLine}
				disabled={disabled}
				type={componentType}
				rowsMax="4"
				onBlur={this.validate}
				onChange={(e) => {
					if (this.state.error) {
						this.setState({ error: false });
					}
					if (capitalize) {
						e.target.value = e.target.value.toUpperCase();
					}
					onChange(e);
				}}
				InputLabelProps={this.provideInputLabelProps()}
				InputProps={this.provideInputProps()}
				error={this.state.error}
				helperText={this.state.error ? this.state.helperText : (noErrorHelperText || null)}
			/>
		);
	}
}

TextInput.propTypes = {
	validateForm: PropTypes.bool.isRequired,
	validationHelper: PropTypes.object.isRequired,
	value: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	componentType: PropTypes.string,
	noErrorHelperText: PropTypes.string,
	isMultiLine: PropTypes.bool,
	disabled: PropTypes.bool,
	capitalize: PropTypes.bool,
};
TextInput.defaultProps = {
	noErrorHelperText: '',
	componentType: 'text',
	isMultiLine: false,
	disabled: false,
	capitalize: false,
};

export default TextInput;
