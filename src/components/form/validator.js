import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import matches from 'validator/lib/matches';
import isBefore from 'validator/lib/isBefore';

export const notEmptyValidator = (value, field) => {
	if (isEmpty(value)) {
		return `${field} is required`;
	}
	return null;
};
export const emailValidator = (value, field) => {
	if (isEmpty(value)) {
		return `${field} is required`;
	}
	if (!isEmail(value)) {
		return `Please check the value of ${field}`;
	}
	return null;
};

export const selectValidator = (value, field) => {
	if (isEmpty(value)) {
		return `Please select ${field} from dropdown`;
	}
	return null;
};

export const mobileNumberValidator = (value, field) => {
	if (isEmpty(value)) {
		return `${field} is required`;
	}
	if (!matches(value, /^(\+?91|0)?[6789]\d{9}$/)) {
		return `Please check the value of ${field}`;
	}
	return null;
};

export const panValidator = (value, field) => {
	if (isEmpty(value)) {
		return `${field} is required`;
	}
	if (!matches(value, /^[A-Z]{5}[0-9]{4}[A-Z]$/)) {
		return `Please check the value of ${field}`;
	}
	return null;
};

export const pincodeValidator = (value, field) => {
	if (isEmpty(value)) {
		return `${field} is required`;
	}
	if (!matches(value, /^\d{6}$/)) {
		return `Please check the value of ${field}`;
	}
	return null;
};

export const dateValidator = (value, field) => {
	if (isEmpty(value)) {
		return `${field} is required`;
	}
	if (!isBefore(value)) {
		return `Please check the value of ${field}`;
	}
	return null;
};
