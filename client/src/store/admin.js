import { observable, computed, action } from 'mobx';

import * as productsApi from '~/api/products';
import productsModel from '~s/products';
import notificationModel from '~s/notification';


 class Admin{
	constructor() {
		this.api = productsApi;
	}
	
	@observable formData = {
		en_title: {
			label: 'Title',
			value: '',
			validator: val => val.length >= 2 ,
			errorText: 'Latin letters, at least two',
			valid: null
		},
		ru_title: {
			label: 'Заголовок',
			value: '',
			validator: val => val.length >= 2 ,
			errorText: 'Русские символы, не менее двух',
			valid: null
		},
		en_genre: {
			label: 'Genre',
			value: '',
			validator: val => val.length >= 2 ,
			errorText: 'Latin letters, at least two',
			valid: null
		},
		ru_genre: {
			label: 'Жанр',
			value: '',
			validator: val => val.length >= 2 ,
			errorText: 'Русские символы, не менее двух',
			valid: null
		},
		en_author: {
			label: 'Autho',
			value: '',
			validator: val => val.length >= 2 ,
			errorText: 'Latin letters, at least two',
			valid: null
		},
		ru_author: {
			label: 'Автор',
			value: '',
			validator: val => val.length >= 2 ,
			errorText: 'Русские символы, не менее двух',
			valid: null
		},
		en_price: {
			label: 'Price',
			value: '',
			validator: val => /^[0-9]{1,}$/.test(val),
			errorText: 'Only numbers',
			valid: null
		},
		ru_price: {
			label: 'Цена',
			value: '',
			validator: val => /^[0-9]{1,}$/.test(val),
			errorText: 'Только цифры',
			valid: null
		}
	};

	@observable flag = false;

	@action change(key, value) {
		let field = this.formData[key];
		field.value = value;
		field.valid = field.validator(field.value);
	}
	
	@computed get formValid() {
		return Object.values(this.formData).every(field => field.valid);
	}

	@action clear() {
		for(let name in this.formData){
			this.formData[name].value = '';
			this.formData[name].valid = null;
		}
	}

	@action add = () => {
		let sendData = {};
		for (let key in this.formData) {
			sendData[key] = this.formData[key].value;
		}

		this.api.add(sendData).then((response) => {
			productsModel.loadData();
			this.clear();
			notificationModel.add('newProductAdd', 'success');
		});
	}


	@action update=(id)=>{
		let sendData = {};
		for (let key in this.formData) {
			sendData[key] = this.formData[key].value;
		}
		
		this.api.update(id,sendData).then((response) => {
			productsModel.loadData();
			notificationModel.add('productUpd', 'success');
		});
	}

	@action remove=(id)=>{
		this.api.remove(id).then((res) => {
			productsModel.remove(id);
		});
	}

	@action getOneProduct=(id)=>{

		this.api.getOne(id).then((res) => {
			let data = res.data;
			this.flag = (res.data == null) ? true : false;
			for(let key in data){
				if(key != '_id' && key != 'createdAt' && key != 'updatedAt' && key != '__v'){
					this.formData[key] = {...this.formData[key], value : data[key]};
					this.change(key, data[key]);
				}	
			}
		});
		
	}



}

export default new Admin();