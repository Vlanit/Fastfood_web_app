import { makeAutoObservable, runInAction, toJS } from "mobx";
import instance from '../api/server_api';

class MainPageDataState {
    error = false;
    _actions = [];
    _dishes = [];
    _products = [];
    _toppings = [];

    constructor () {
        makeAutoObservable(this);
    }

    generateDescriptionForDishes() {
        let toppings_indexes = new Map();
        this._toppings.forEach((item, index) => {
            toppings_indexes.set(item.topping_id, index);
        });

        this._dishes.forEach((element, index) => {
            this._dishes[index].description = '';
            element.toppings.map((topping, t_index) => {
                this._dishes[index].description += this.toppings[toppings_indexes.get(topping)].name;
                if (t_index != element.toppings.length - 1) {
                    this._dishes[index].description += ', ';
                }
            })
        });
    }

    async renewAllData() {
        try {
            let data = (await instance.get('/full_data')).data;

            runInAction(() => {
                this._actions = data.actions;
                this._dishes = data.dishes;
                this._products = data.other_products;
                this._toppings = data.toppings;
                this.error = false;
                this.generateDescriptionForDishes();
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    async renewActionsList() {
        try {
            let data = (await instance.get('/actions')).data;

            runInAction(() => {
                this._actions = data;
                this.error = false;
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    async renewDishesList() {
        try {
            let data = (await instance.get('/dishes')).data;

            runInAction(() => {
                this._dishes = data;
                this.generateDescriptionForDishes();
                this.error = false;
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    async renewProductsList() {
        try {
            let data = (await instance.get('/products')).data;

            runInAction(() => {
                this._products = data;
                this.error = false;
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    async renewToppingsList() {
        try {
            let data = (await instance.get('/toppings')).data;

            runInAction(() => {
                this._toppings = data;
                this.error = false;
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    get actions() {
        return toJS(this._actions);
    }

    get dishes() {
        return toJS(this._dishes);
    }

    get products() {
        return toJS(this._products);
    }

    get toppings() {
        return toJS(this._toppings);
    }
}

export const main_page_store = new MainPageDataState();