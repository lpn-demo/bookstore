import { observable, computed, action, runInAction } from 'mobx';
import { create, persist } from 'mobx-persist'


import * as cartApi from '~/api/cart';
import storeProducts from '~s/products';
import storeNotification from '~s/notification';




const hydrate = create({
	storage: localStorage,
	jsonify: true
})


class Cart {
	@observable products = []
	@observable processId = {}

	constructor() {
		this.api = cartApi;
	}


	@persist @observable token = null



	@computed get inCart() {
		return (id) => this.products.some((product) => product._id === id);
	}

	@computed get cartCnt() {
		return this.products.length;
	}

	@computed get total() {
		return this.products.reduce((t, pr) => {
			return t + +pr.price;
		}, 0);
	}

	@action load = () => {
		hydrate('token', this).then(() => {

			this.api.load(this.token).then((response) => {
				runInAction(() => {
					this.products = response.data.cart;
					if (response.data.needUpdate) {
						this.token = response.data.token;
					}
				});
			}).catch(() => {
				// 
			});
		});

	}

	@action add(id) {
		if (!(this.inCart(id) || id in this.processId)) {
			this.processId[id] = true;
			let product = storeProducts.getById(id);

			this.api.add(this.token, product).then((res) => {
				if (res) {
					this.products.push(product);
				}
			}).catch(() => {

				storeNotification.add('Can`t add item in cart! Try again!');

			}).finally(() => {
				delete this.processId[id];
			});
		}
	}

	@action remove(id) {
		if (this.inCart(id) && !(id in this.processId)) {
			let index = this.products.findIndex((pr) => pr._id === id);
			if (index !== -1) {
				this.processId[id] = true;
				this.api.remove(this.token, id).then((res) => {
					this.products.splice(index, 1);
					delete this.processId[id];
				});
			}
		}
	}

	@action clean() {
		return new Promise((resolve, reject) => {
			this.api.clean(this.token).then((res) => {
				if (res) {
					this.products = [];
					resolve();
				}
				else {
					reject();
				}
			});
		});
	}
}





export default new Cart();