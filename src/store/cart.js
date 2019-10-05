import { observable, computed, action, runInAction } from 'mobx';

export default class {
	@observable products = []
	@observable processId = {}

	constructor(rootStore) {
		this.rootStore = rootStore;
		this.api = this.rootStore.api.cart;
		this.storage = this.rootStore.storage;
		this.token = this.storage.getItem('cartToken');
	}

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
		this.api.load(this.token).then((response) => {
			runInAction(() => {			
				this.products = response.data.cart;	
				if (response.data.needUpdate) {
					this.token = response.data.token;
					this.storage.setItem('cartToken', this.token);
				}
			});
		}).catch(() => {
			// 
		});
	}

	@action add(id) {
		if (!(this.inCart(id) || id in this.processId)) {
			this.processId[id] = true;
			let product = this.rootStore.products.getById(id);
			
			this.api.add(this.token, product).then((res) => {
				if (res) {
					this.products.push(product);
				}
			}).catch(() => {

				this.rootStore.notification.add('Can`t add item in cart! Try again!');

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

	@action clean(){
		return new Promise((resolve, reject) => {
				this.api.clean(this.token).then((res) => {
						if(res){
								this.products = [];
								resolve();
						}
						else{
								reject();
						}
				});
		});
	}



}

