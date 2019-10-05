import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'mobx-react';
import stores from './store';

import '~/i18n';


stores.products.loadData().then(() => {
	ReactDOM.render(<Provider stores={stores}> <App /> </Provider>,
		document.querySelector('#root'));
});
stores.autorization.loadUser();
stores.cart.load();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


