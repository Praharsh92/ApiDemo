// @flow
import PropTypes from 'prop-types';
import React from 'react';

import {
	noop,
	fixLeadingZero,
	omit,
	setCaretPosition,
	clamp,
	getNumberRegex,
	getIntString,
} from './inputHelpers';


const propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onMouseUp: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	type: PropTypes.oneOf(['text', 'tel']),
	getInputRef: PropTypes.func,
	onBlur: PropTypes.func.isRequired,
	formatInputFunc: PropTypes.func.isRequired,
};

const defaultProps = {
	value: '',
	type: 'text',
	onChange: noop,
	onMouseUp: noop,
	onFocus: noop,
	getInputRef: noop,
};

// Set caret position
const setPatchedCaretPosition = (el, caretPos, currentValue) => {
	/* setting caret position within timeout of 0ms is required for mobile chrome,
	otherwise browser resets the caret position after we set it
	We are also setting it without timeout so that in normal browser we don't see the flickering */
	setCaretPosition(el, caretPos);
	setTimeout(() => {
		if (el.value === currentValue) setCaretPosition(el, caretPos);
	}, 0);
};


/* This keeps the caret within typing area so people can't type in between prefix or suffix */
const correctCaretPosition = (value, caretPos) => {
	// if value is empty return 0
	if (value === '') return 0;

	// caret position should be between 0 and value length
	return clamp(caretPos, 0, value.length);
};

// I have no idea, what this routine does!
const getCaretPosition = (inputValue, formattedValue, caretPos) => {
	const numRegex = getNumberRegex();

	let j = 0;
	let	i = 0;

	for (i = 0; i < caretPos; i += 1) {
		const currentInputChar = inputValue[i] || '';
		const currentFormatChar = formattedValue[j] || '';
		// no need to increase new cursor position if formatted value does not have those characters
		// case inputValue = 1111,233 and formattedValue =  1,11,12,33
		if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) {
			// eslint-disable-next-line no-continue
			continue;
		}

		// we are not using currentFormatChar because j can change here
		while (currentInputChar !== formattedValue[j] && j < formattedValue.length) j += 1;
		j += 1;
	}
	// correct caret position if its outside of editable area
	j = correctCaretPosition(formattedValue, j);

	return j;
};


// TODO: Original implementation had componentDidMount implemented too.
class NumberFormat extends React.Component {
	constructor(props) {
		super(props);
		const formattedValue = props.formatInputFunc(props.value);
		this.state = {
			value: formattedValue,
			numAsString: getIntString(formattedValue),
		};

		this.selectionBeforeInput = {
			selectionStart: 0,
			selectionEnd: 0,
		};

		this.onChange = this.onChange.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentDidUpdate(prevProps) {
		this.updateValueIfRequired(prevProps);
	}


	onChange(e) {
		e.persist();
		const el = e.target;
		const inputValue = el.value;
		const { props } = this;

		/* Max of selectionStart and selectionEnd is taken for the
		patch of pixel and other mobile device caret bug */
		const currentCaretPosition = Math.max(el.selectionStart, el.selectionEnd);

		const formattedValue = props.formatInputFunc(inputValue) || '';

		// set the value imperatively, this is required for IE fix
		el.value = formattedValue;

		// get the caret position
		// Don't need this!
		const caretPos = getCaretPosition(inputValue, formattedValue, currentCaretPosition);

		// set caret position
		setPatchedCaretPosition(el, caretPos, formattedValue);

		this.setState({ value: formattedValue, numAsString: getIntString(formattedValue) }, () => {
			// Mock an event
			props.onChange({
				target: {
					name: e.target.name,
					value: this.state.numAsString,
				},
			});
		});
	}

	onBlur(e) {
		const { value } = this.state;
		const { onBlur, onChange, formatInputFunc } = this.props;
		// TODO: Optimise me. getIntString is again getting called in formatInputFunc
		const unformattedValue = getIntString(value);
		const numAsString = fixLeadingZero(unformattedValue);
		const formattedValue = formatInputFunc(numAsString);

		// the event needs to be persisted because its
		// properties can be accessed in an asynchronous way
		e.persist();
		// change the state
		this.setState({ value: formattedValue, numAsString: getIntString(formattedValue) }, () => {
			// Mock an event
			onChange({
				target: {
					name: e.target.name,
					value: this.state.numAsString,
				},
			});
			onBlur();
		});
	}

	/** required to handle the caret position when click anywhere within the input * */
	onMouseUp(e) {
		const el = e.target;

		/**
     * NOTE: we have to give default value for value as in case when custom input is provided
     * value can come as undefined when nothing is provided on value prop.
    */
		const { selectionStart, selectionEnd, value = '' } = el;

		if (selectionStart === selectionEnd) {
			const caretPosition = correctCaretPosition(value, selectionStart);
			if (caretPosition !== selectionStart) {
				setPatchedCaretPosition(el, caretPosition, value);
			}
		}

		this.props.onMouseUp(e);
	}

	onFocus(e) {
	// Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
	// (onFocus event target selectionStart is always 0 before setTimeout)
		e.persist();
		setTimeout(() => {
			const el = e.target;
			const { selectionStart, value = '' } = el;

			const caretPosition = correctCaretPosition(value, selectionStart);
			if (caretPosition !== selectionStart) {
				setPatchedCaretPosition(el, caretPosition, value);
			}

			this.props.onFocus(e);
		}, 0);
	}

	updateValueIfRequired(prevProps) {
		const { props, state } = this;

		if (prevProps !== props) {
			const stateValue = state.value;

			const lastNumStr = state.numAsString || '';

			const formattedValue = (
				props.value === undefined ?
					this.formatInputFunc(lastNumStr) :
					props.formatInputFunc(props.value)
			);

			if (formattedValue !== stateValue) {
				this.setState({
					value: formattedValue,
					numAsString: getIntString(formattedValue),
				});
			}
		}
	}

	render() {
		const { type, getInputRef } = this.props;
		const { value } = this.state;

		const otherProps = omit(this.props, propTypes);

		const inputProps = Object.assign({}, otherProps, {
			type,
			value,
			onChange: this.onChange,
			onMouseUp: this.onMouseUp,
			onFocus: this.onFocus,
			onBlur: this.onBlur,
		});

		return (
			<input
				{...inputProps}
				ref={getInputRef}
			/>
		);
	}
}

NumberFormat.propTypes = propTypes;
NumberFormat.defaultProps = defaultProps;

export default NumberFormat;
