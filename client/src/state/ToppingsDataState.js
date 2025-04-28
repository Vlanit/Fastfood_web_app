import { makeAutoObservable } from "mobx";
import instance from '../../api/server_api';

class ToppingsDataState {
    error = false;
    topping_array = [];

    constructor () {
        makeAutoObservable(this);
    }

    async renewToppingList() {
        try {
            let toppings = await instance.get('/toppings');
            this.topping_array = toppings.data;
            this.error = false;
        }
        catch {
            this.error = true;
        }
    }
}

export default ToppingsDataState;