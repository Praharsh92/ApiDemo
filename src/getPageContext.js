/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500],
		},
		secondary: {
			light: amber[300],
			main: amber[500],
			dark: amber[700],
		},
	},
	typography: {
		useNextVariants: true,
	},
	breakpoints: {
		values: {
			md: 968,
		},
	},
});

function createPageContext() {
	return {
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager: new Map(),
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		// The standard class name generator.
		generateClassName: createGenerateClassName(),
	};
}

export default function getPageContext() {
	// Make sure to create a new context for every server-side request so that data
	// isn't shared between connections (which would be bad).
	if (!process.browser) {
		return createPageContext();
	}

	// Reuse context on the client-side.
	if (!global.__INIT_MATERIAL_UI__) {
		global.__INIT_MATERIAL_UI__ = createPageContext();
	}

	return global.__INIT_MATERIAL_UI__;
}
