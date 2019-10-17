import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist'

import * as usersApi from '~/api/user';

import notificationModel from '~s/notification';


const hydrate = create({
	storage: localStorage,
	jsonify: true
});

class Autorization {
	@observable formDataLogin = {
		email: {
			value: '',
			label: 'email',
			type: 'email',
			validator: val => /^.+@.+$/.test(val),
			errorText: 'Wrong email',
			valid: null
		},
		password: {
			value: '',
			label: 'password',
			type: 'password',
			validator: val => val.length > 6,
			errorText: 'password length',
			valid: null
		}
	}

	@observable formDataRegistr = {
		name: {
			value: '',
			label: 'name',
			validator: val => /^[aA-zZ аА-яЯ]{2,}$/.test(val),
			errorText: 'only characters',
			valid: null
		},
		surname: {
			value: '',
			label: 'surname',
			validator: val => /^[aA-zZ аА-яЯ]{2,}$/.test(val),
			errorText: 'only characters',
			valid: null
		},
		email: {
			value: '',
			label: 'email',
			type: 'email',
			validator: val => /^.+@.+$/.test(val),
			errorText: '@',
			valid: null
		},
		password: {
			value: '',
			label: 'password',
			type: 'password',
			validator: val => val.length > 6,
			errorText: 'password length',
			valid: null
		}
	}

	@observable formDataReset = {
		email: {
			value: '',
			label: 'email',
			type: 'email',
			validator: val => /^.+@.+$/.test(val),
			valid: null
		},
		oldpassword: {
			value: '',
			label: 'oldpassword',
			type: 'password',
			validator: val => val.length > 6,
			valid: null
		},
		newpassword: {
			value: '',
			label: 'newpassword',
			type: 'password',
			validator: val => val.length > 6,
			valid: null
		}
	}

	@observable role;
	@observable access = null;
	@observable userName = '';

	constructor() {
		this.api = usersApi;
	}

	@persist @observable userToken = null



	@computed get formValidReg() {
		return Object.values(this.formDataRegistr).every(field => field.valid);
	}

	@computed get formValid() {
		return Object.values(this.formDataLogin).every(field => field.valid);
	}
	@computed get formValidReset() {
		return Object.values(this.formDataReset).every(field => field.valid);
	}

	@action change(key, value, type) {
		let field;
		switch (type) {
			case 'login':
				field = this.formDataLogin[key];
				field.value = value;
				field.valid = field.validator(field.value);
				break;
			case 'registration':
				field = this.formDataRegistr[key];
				field.value = value;
				field.valid = field.validator(field.value);
				break;
			case 'reset':
				field = this.formDataReset[key];
				field.value = value;
				field.valid = field.validator(field.value);
				break;
		}
	}

	@action clean(data) {

		for (let key in data) {
			data[key].value = '';
			data[key].valid = null;
		}
	}


	@action loadUser = () => {
		hydrate('userToken', this).then((res) => {
			if (this.userToken != null && this.userToken != '' && this.userToken != undefined) {
				this.api.userLoad(this.userToken).then((response) => {
					let data = response.data;
					this.role = data.role;
					this.access = true;
					this.userName = data.name + ' ' + data.surname;
					this.userToken = data.token;
				});
			}
		});
	}

	@action login = (event) => {
		event.preventDefault();
		let sendData = {};
		for (let key in this.formDataLogin) {
			sendData[key] = this.formDataLogin[key].value;
		}
		let { email, password } = sendData;
		hydrate('userToken', this).then((res) => {

			this.api.login(email, password).then((response) => {
				if (!response.success) {
					notificationModel.add('wrong email or password');
					return;
				}
				let data = response.data;
				this.role = data.role;
				this.access = true;
				this.userName = data.name + ' ' + data.surname;
				this.userToken = data.token;
				this.clean(this.formDataLogin)
			});

		});

	}



	@action logout() {
		this.role = null;
		this.access = false;
		this.userName = null;
		this.token = null;
		this.userToken = null;
	}


	@action registration(event) {
		event.preventDefault();
		let sendData = {};
		for (let key in this.formDataRegistr) {
			sendData[key] = this.formDataRegistr[key].value;
		}
		hydrate('userToken', this).then((res) => {
			this.api.registration(sendData).then((response) => {
				if (!response.success) {
					notificationModel.add('email exist');
					return;
				}
				let data = response.data;
				this.role = data.role;
				this.access = true;
				this.userName = data.name + ' ' + data.surname;
				this.userToken = data.token;
				this.clean(this.formDataRegistr)

			});
		});
	}

	@action updatePassword = (event) => {
		event.preventDefault();
		let sendData = {};

		for (let key in this.formDataReset) {
			sendData[key] = this.formDataReset[key].value;
		}
		let { email, oldpassword, newpassword } = sendData;
		hydrate('userToken', this).then((res) => {
			this.api.reset(email, oldpassword, newpassword).then((response) => {
				if (!response.success) {
					notificationModel.add('wrong email or password');
					return;
				}
				let data = response.data;
				this.role = data.role;
				this.access = true;
				this.userName = data.name + ' ' + data.surname;
				this.userToken = data.token;
				this.clean(this.formDataReset)
			});
		});
	}

}



export default new Autorization();

