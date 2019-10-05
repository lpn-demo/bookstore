import { observable, computed, action } from 'mobx';


export default class {
	@observable products = [];
	@observable pager = {};
	@observable pageSize = 6;
	@observable pageSizeVarian = [6, 9, 12];
	@observable page = 1;
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.api = this.rootStore.api.products;
		this.lang = this.rootStore.lang;
	}

	@observable startDate = null;
	@observable endDate = new Date();
	@observable search = '';

	@computed get productsMap() {
		let map = {};

		this.products.forEach((pr, i) => {
			map[pr._id] = i;
		});
		return map;
	}

	@action loadData() {

		let lang =  this.rootStore.storage.getItem('lang') || this.lang;
		let page = this.page;
		let pageSize = this.pageSize;
		let search = (this.search.length > 4) ? this.search : '';
		let startDate = (this.startDate != null) ? this.startDate.toISOString() : null;
		let endDate = this.endDate.toISOString();
		return new Promise((resolve, reject) => {
			this.api.all(lang, page, pageSize, search, startDate, endDate).then((response) => {
				this.products = response.pageOfItems;
				this.pager = response.pager;
				resolve(true);
			});
		});

	}

	@action changeLang(lang){
		this.rootStore.storage.setItem('lang', lang);
		this.loadData();
	}

	@action filterDate(from, to, data) {

		return data.filter((item) => {
			if (item.createdAt >= from && item.createdAt <= to) {
				return item;
			}
		});
		
	}

	@action setNewPage(id) {
		this.page = id;
		this.loadData();
	}
	@action setPageSize(cnt) {
		this.pageSize = cnt;
		this.page = 1;
		this.loadData();
	}

	@action doSearch(val) {
		this.search = val;
		this.clearFilter();
		if (val.length > 4) {
			this.loadData();
		}
	}
	@action clearFilter() {
		this.startDate = null;
		this.endDate = new Date();
		this.loadData();
	}

	@action setStartDate = (date) => {
		this.startDate = date;
		this.loadData();
	}
	@action setEndDate = (date) => {
		if (this.startDate != null) {
			this.loadData();
		}
		this.endDate = date;
	}


	getById(id) {
		let index = this.productsMap[id];
		if (index === undefined) {
			return null;
		}
		return this.products[index];
	}

	@action remove(id) {
		let index = this.productsMap[id];
		this.products.splice(index, 1);
	}


}
