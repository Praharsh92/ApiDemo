
// basic noop function
export const noop = () => {};

// Remove leading zeros from numStr
export const fixLeadingZero = (numStr) => {
	if (!numStr) return numStr;
	const isNegative = numStr[0] === '-';
	let number = numStr;
	if (isNegative) {
		number = numStr.substring(1, numStr.length);
	}
	const parts = number.split('.');
	const beforeDecimal = parts[0].replace(/^0+/, '') || '0';
	const afterDecimal = parts[1] || '';

	return `${isNegative ? '-' : ''}${beforeDecimal}${afterDecimal ? `.${afterDecimal}` : ''}`;
};

// Remove keyMaps from obj
export function omit(obj, keyMaps) {
	const filteredObj = {};
	Object.keys(obj).forEach((key) => {
		if (!keyMaps[key]) filteredObj[key] = obj[key];
	});
	return filteredObj;
}

/** set the caret positon in an input field * */
// eslint-disable-next-line no-undef
export function setCaretPosition(el, caretPos) {
	// eslint-disable-next-line no-param-reassign
	el.value = el.value;
	// ^ this is used to not only get "focus", but
	// to make sure we don't have it everything -selected-
	// (it causes an issue in chrome, and having it doesn't hurt any other browser)
	if (el !== null) {
		if (el.createTextRange) {
			const range = el.createTextRange();
			range.move('character', caretPos);
			range.select();
			return true;
		}
		// (el.selectionStart === 0 added for Firefox bug)
		if (el.selectionStart || el.selectionStart === 0) {
			el.focus();
			el.setSelectionRange(caretPos, caretPos);
			return true;
		}

		// fail city, fortunately this never happens (as far as I've tested) :)
		el.focus();
		return false;
	}
}

/** Returns a number whose value is limited to the given range */
export function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}


/**
 * @param  {string} numStr Numeric string/floatString]
 * @return {string} formatted Value
 */
// Format as INR - 12,00,000
export const formatToInr = (numStr) => {
	if (!numStr) return numStr;
	let sanitisedNumStr = numStr;
	if (typeof sanitisedNumStr !== 'string') {
		sanitisedNumStr = sanitisedNumStr.toString();
	}
	let lastThree = sanitisedNumStr.substring(sanitisedNumStr.length - 3);
	const otherNumbers = sanitisedNumStr.substring(0, sanitisedNumStr.length - 3);
	if (otherNumbers !== '') { lastThree = `,${lastThree}`; }
	return otherNumbers.replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,') + lastThree;
};

// Regular expression for valid number
export const getNumberRegex = () => new RegExp('\\d', 'g');

// Remove formatting from number to return string representation of number
export const getIntString = (num) => {
	if (!num) return num;
	const numRegex = getNumberRegex();
	let sanitisedNum = num;
	if (typeof num !== 'string') {
		sanitisedNum = sanitisedNum.toString();
	}
	return (sanitisedNum.match(numRegex) || []).join('');
};

// Format input after removing formatting or any other unwanted characters
export const formatInputToInr = (value) => {
	const unformattedValue = getIntString(value);
	return formatToInr(unformattedValue);
};
