import { makeAutoObservable, runInAction, toJS } from "mobx";
import instance from "../api/server_api";
import { io } from 'socket.io-client';

class ShoppingCartState {
    _name = "";
    _surname = "";
    _phone_number = "";
    _delivery = false;
    _town = "";
    _delivery_address = "";
    _outlet = -1;
    _dish_array = new Map();
    _product_array = new Map();
    _price = 0;
    _ordered = false;
    _isstarted = false;
    _iscooked = false;
    _isfinished = false;

    constructor () {
        makeAutoObservable(this);
    }

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }
 
    set surname(value) {
        this._surname = value;
    }

    get surname() {
        return this._surname;
    }

    set phone_number(value) {
        this._phone_number = value;
    }

    get phone_number() {
        return this._phone_number;
    }

    set delivery(value) {
        this._delivery = value;
    }

    get delivery() {
        return this._delivery;
    }

    set town(value) {
        this._town = value;
    }

    get town() {
        return this._town;
    }

    set delivery_address(value) {
        this._delivery_address = value;
    }

    get delivery_address() {
        return this._delivery_address;
    }

    set outlet(value) {
        this._outlet = value;
    }

    get outlet() {
        return this._outlet;
    }

    set price(value) {
        this._price = value;
    }

    get price() {
        return this._price;
    }

    set dish_array(value) {
        this._dish_array = value;
    }

    get dish_array() {
        return toJS(this._dish_array);
    }

    set product_array(value) {
        this._product_array = value;
    }

    get product_array() {
        return toJS(this._product_array);
    }

    get isordered() {
        return this._ordered;
    }

    get isstarted() {
        return this._isstarted;
    }

    get iscooked() {
        return this._iscooked;
    }

    get isfinished() {
        return this._isfinished;
    }

    getDataFromSessionStorage() {
        const storage_data = JSON.parse(sessionStorage.getItem("shoppingCartState"));
        if (storage_data) {
            this._name = storage_data.name;
            this._surname = storage_data.surname;
            this._phone_number = storage_data.phone_number;
            this._delivery = false.delivery;
            this._town = storage_data.town;
            this._delivery_address = storage_data.delivery_address;
            this._outlet = storage_data.outlet;
            this._dish_array = new Map(Object.entries(storage_data.dish_array));
            this._product_array = new Map(Object.entries(storage_data.product_array));
            this._price = storage_data.price;
            this._ordered = storage_data.ordered;
            this._isstarted = storage_data.isstatred;
            this._iscooked = storage_data.iscooked;
            this._isfinished = storage_data.isfinished;
            this.current_order_id = storage_data.id;
        }
    }

    setDataToSessionStorage() {
        const json_data = {
            id: this.current_order_id,
            name: this._name,
            surname: this._surname,
            phone_number: this._phone_number,
            delivery: this._delivery,
            town: this._town,
            delivery_address: this._delivery_address,
            outlet: this._outlet,
            price: this._price,
            ordered: this._ordered,
            isstarted: this._isstarted,
            iscooked: this._iscooked,
            isfinished: this._isfinished
        };
        json_data.dish_array = Object.fromEntries(this._dish_array);
        json_data.product_array = Object.fromEntries(this._product_array);
        sessionStorage.setItem("shoppingCartState",JSON.stringify(json_data));
    }

    addDishToCart(id, dish_id,  count, size, price) {
        this._dish_array.set(id, 
            {
                dish_id: dish_id,
                count: count, 
                size: size,
                current_price: price
            });
        this._price += price * count;
    }

    addProductToCart(id, product_id, count, price) {
        this._product_array.set(id,             
            {
                product_id: product_id,
                count: count, 
            });
        this._price += price * count;
    }

    increaseCountOfDish(id, price) {
        if (this._dish_array.get(id).count < 6) {
            this._dish_array.get(id).count++;
            this._price += price;
        }
    }

    decreaseCountOfDish(id, price) {
        if (this._dish_array.get(id).count > 1) {
            this._dish_array.get(id).count--;
        }
        else if (this._dish_array.get(id).count == 1) {
            this._dish_array.delete(id);
        }
        this._price -= price;
    }

    increaseCountOfProduct(id, price) {
        if (this._product_array.get(id).count < 20) {
            this._product_array.get(id).count++;
            this._price += price;
        }
    }

    decreaseCountOfProduct(id, price) {
        if (this._product_array.get(id).count > 1) {
            this._product_array.get(id).count--;
        }
        else if (this._product_array.get(id).count == 1) {
            this._product_array.delete(id);
        }
        this._price -= price;
    }

    makeOrder() {
        const dishes_keys_array = Array.from(this._dish_array.keys());
        const dishes_array = dishes_keys_array.map(item => {
            const current = this._dish_array.get(item);
            return {
                id: item,
                dish_id: current.dish_id, 
                size: current.size, 
                count: current.count,
                current_price: current.current_price
            };
        });
        const products_keys_array = Array.from(this._product_array.keys());
        const products_array = products_keys_array.map(item => {
            const current = this._product_array.get(item);
            return {
                id: item,
                product_id: current.product_id, 
                count: current.count
            };
        });
        const order_object = {
            name: this._name,
            surname: this._surname,
            delivery: this._delivery,
            delivery_address: this._delivery_address,
            isstarted: false,
            iscooked: false,
            isfinished: false,
            order_datetime: new Date(),
            dishes: dishes_array,
            products: products_array,
            outlet_id: this._outlet
        };
        this._ordered = true;
        this.socket = io('http://localhost:3000');
        this.socket.emit('new_order_inserted', order_object);
        this.socket.on('new_order_state', (order_status) => {
            this._isstarted = order_status.isstarted;
            this._iscooked = order_status.iscooked;
            this._isfinished = order_status.isfinished;
        });
        /*await instance.post('/save_order_to_store', {order_id: Date.now().toString(), order_data: order_object}).then((response) => {
            runInAction(() => {
                this.current_order_id = response.data.order_id;
            });
        });
        console.log('id', this.current_order_id);
        await instance.get(`/get_order_from_store?order_id=${this.current_order_id}`).then((response) => {
            console.log('get', response.data);
        });*/
    }
}

export const shopping_cart_store = new ShoppingCartState();