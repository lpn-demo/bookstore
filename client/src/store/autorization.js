import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist'

import * as usersApi from '~/api/user';

import notificationModel from '~s/notification';


const hydrate = create({
	storage: localStorage,
	jsonify: true
});

class Autorization {

	@observable role;
	@observable access = null;
	@observable userName = '';

	constructor() {
		this.api = usersApi;
	}

	@persist @observable userToken = null


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

	@action login = (data) => {

		let { email, password } = data;
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


	@action registration(data) {
		hydrate('userToken', this).then((res) => {
			this.api.registration(data).then((response) => {
				if (!response.success) {
					notificationModel.add('email exist');
					return;
				}
				let data = response.data;
				this.role = data.role;
				this.access = true;
				this.userName = data.name + ' ' + data.surname;
				this.userToken = data.token;
			});
		});
	}

	@action updatePassword = (data) => {

		let { email, oldpassword, newpassword } = data;
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
			});
		});
	}

}



export default new Autorization();

