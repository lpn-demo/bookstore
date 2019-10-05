import cartStore from '~s/cart';
import productsStore from '~s/products';
import orderStore from '~s/order';
import adminStore from '~s/admin';
import notificationStore from '~s/notification';
import autorizationStore from '~s/autorization';

import i18n from '~/i18n';

import * as products from '~/api/products';
import * as cart from '~/api/cart';
import * as users from '~/api/user';


// One global store
// One global store where you can change any store and conduct a unit test.


class RootStore{
    constructor(){

        this.api = {
            products,
            cart,
            users
        };

        this.storage = localStorage; 
        this.lang = i18n.language;

        this.cart = new cartStore(this);
        this.products = new productsStore(this);
        this.order = new orderStore(this);
        this.admin = new adminStore(this);
        this.notification = new notificationStore(this);
        this.autorization = new autorizationStore(this);
    }    
}

export default new RootStore();