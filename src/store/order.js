import { observable, computed, action } from 'mobx';

export default class {
	@observable formData = {
		name: {
			value: '',
			label: 'name',
			validator: val => /^[aA-zZ аА-яЯ]{2,}$/.test(val),
			errorText: 'only characters',
			valid: null
		},
		phone: {
			value: '',
			label: 'phone',
			validator: val => /^[0-9]{9,12}$/.test(val),
			errorText: 'numbers',
			valid: null
		},
		email: {
			value: '',
			label: 'email',
			validator: val => /^.+@.+$/.test(val),
			errorText: '@',
			valid: null
		}
	}


	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed get formValid() {
		return Object.values(this.formData).every(field => field.valid);
	}


	@action change(key, value) {
		let field = this.formData[key];
		field.value = value;
		field.valid = field.validator(field.value);
	}

	@action send() {
		return new Promise((resolve, reject) => {
			this.rootStore.cart.clean().then(() => {

				for (let key in this.formData) {
					this.formData[key].value = '';
					this.formData[key].valid = null;
				}
				resolve();
			});
		});
	}
}


