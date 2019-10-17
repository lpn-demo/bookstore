import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


import productsStore from '~s/products';
import autorizationStore from '~s/autorization';
import cartStore from '~s/cart';

import '~/i18n';


productsStore.loadData().then(() => {
	ReactDOM.render(<App />, document.querySelector('#root'));
});
autorizationStore.loadUser();
cartStore.load();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


