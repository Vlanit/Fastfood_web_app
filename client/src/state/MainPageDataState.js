import { makeAutoObservable, runInAction, toJS } from "mobx";
import instance from '../api/server_api';

class MainPageDataState {
    error = false;
    _actions = [];
    _dishes = [];
    _dish_indexes = new Map();
    _products = [];
    _product_indexes = new Map();
    _toppings = [];
    _topping_indexes = new Map();

    constructor () {
        makeAutoObservable(this);
    }

    generateDescriptionForDishes() {
        this._dishes.forEach((element, index) => {
            this._dishes[index].description = '';
            element.toppings.map((topping, t_index) => {
                this._dishes[index].description += this.toppings[this._topping_indexes.get(topping)].name;
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

                this._dishes.forEach((item, index) => {
                    this._dish_indexes.set(item.dish_id, index);
                });

                this._products = data.other_products;

                this._products.forEach((item, index) => {
                    this._product_indexes.set(item.product_id, index);
                });

                this._toppings = data.toppings;

                this._toppings.forEach((item, index) => {
                    this._topping_indexes.set(item.topping_id, index);
                });

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

                this._dishes.forEach((item, index) => {
                    this._dish_indexes.set(item.dish_id, index);
                });

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

                this._products.forEach((item, index) => {
                    this._product_indexes.set(item.product_id, index);
                });

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

                this._toppings.forEach((item, index) => {
                    this._topping_indexes.set(item.topping_id, index);
                });

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

    get_dish_array_index(dish_id) {
        return this._dish_indexes.get(dish_id);
    }

    get_product_array_index(product_id) {
        return this._product_indexes.get(product_id);
    }

    get_topping_array_index(topping_id) {
        return this._topping_indexes.get(topping_id);
    }
}

export const main_page_store = new MainPageDataState();