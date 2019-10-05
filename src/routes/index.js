import Cart from '~p/cart';
import Order from '~p/order';
import ActionAdd from '~p/actionAdd';
import ActionUpd from '~p/actionUpd';
import Login from '~p/autorization/login';
import Reset from '~p/autorization/reset';
import Registration from '~p/autorization/registration';
import Page404 from '~p/error404';


import ProductList from '~p/products/list';
import ProductItem from '~p/products/item';

let routes = [
    {
        name: 'main',
        url: '/',
        component: ProductList,
        exact: true
    },
    {
        name: 'home',
        url: '/page/:id',
        component: ProductList,
        exact: true
    },
    {
        name: 'product',
        url: '/products/:id',
        component: ProductItem,
        exact: true
    },
    {
        name: 'cart',
        url: '/cart',
        component: Cart,
        exact: true
    },
    {
        name: 'order',
        url: '/order',
        component: Order,
        exact: true
    },
    {
        name: 'update',
        url: '/upd/:id',
        component: ActionUpd,
        exact: true
    },
    {
        name: 'add',
        url: '/add',
        component: ActionAdd,
        exact: true
    },
    {
        name: 'login',
        url: '/login',
        component: Login,
        exact: true
    },
    {
        name: 'reset',
        url: '/reset',
        component: Reset,
        exact: true
    },
    {
        name: 'registration',
        url: '/registration',
        component: Registration,
        exact: true
    },
    {
        url: '**',
        component: Page404
    }
];

let routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function(name, params){
    if(!routesMap.hasOwnProperty(name)){
        return null;
    }

    let url = routesMap[name]; // news/:id

    for(let key in params){
        url = url.replace(':' + key, params[key]);
    }

    return url;
}

export default routes;
export {routesMap, urlBuilder};