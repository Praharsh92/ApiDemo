import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import initStore from 'Root/src/store';


const loader = () => (
	<div style={{
		display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to right, #ece9e6, #ffffff)',
	}}
	>
		<div style={{
			display: 'flex', fontSize: '1.5em', fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontWeight: 300,
		}}
		>Loading!
		</div>
	</div>
);

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Container>
				<Provider store={store}>
					<PersistGate persistor={store.__persistor} loading={loader()}>
						<Component {...pageProps} />
					</PersistGate>
				</Provider>
			</Container>
		);
	}
}

export default withRedux(initStore)(MyApp);
