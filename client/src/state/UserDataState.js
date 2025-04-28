import { makeAutoObservable, runInAction, toJS } from "mobx";
import instance from "../api/server_api";
import { io } from 'socket.io-client';

class UserDataState {
    error = false;
    authorised = false;

    _user_id = -1;
    _name = '';
    _surname = '';
    _town='';
    _address='';

    _outlet=-1;
    _orders=[];

    _coins = 0;
    _cashier = false;
    _admin = false;

    constructor () {
        makeAutoObservable(this);
    }

    set orders(value) {
        this._orders = value;
    }

    get orders() {
        return toJS(this._orders);
    }

    get cashier() {
        return this._cashier;
    }

    get admin() {
        return this._admin;
    }

    getDataFromSessionStorage() {
        const storage_data = JSON.parse(sessionStorage.getItem("UserDataState"));
        if (storage_data) {
            this.authorised = storage_data.authorised;
            this._user_id = Number(storage_data.user_id);
            this._name = storage_data.name;
            this._surname = storage_data.surname;
            this._town= storage_data.town;
            this._address= storage_data.address;
            this._outlet= Number(storage_data.outlet);
            this._orders= storage_data.orders;
            this._coins = Number(storage_data.coins);
            this._cashier = storage_data.cashier;
            this._admin = storage_data.admin;
        }

        console.log(storage_data);

        if (this._cashier) {
            this.socket = io('http://localhost:3000');
            this.socket.on('new_order', (order_data) => {
                runInAction(() => {
                    this._orders.push(order_data);
                });
                console.log(order_data);
            })
            this.socket.emit('join_room', this._outlet);
        }
    }

    setDataToSessionStorage() {
        const json_data = {
            authorised: this.authorised,
            user_id: this._user_id,
            name: this._name,
            surname: this._surname,
            town: this._town,
            address: this._address,
            outlet: this._outlet,
            orders: this._orders,
            coins: this._coins,
            cashier: this._cashier,
            admin: this._admin
        };
        sessionStorage.setItem("UserDataState",JSON.stringify(json_data));
    }

    async tryToLogin(form_data) {
        try {
            let data = (await instance.get(`/login?login=${form_data.get('login')}&password=${form_data.get('password')}`)).data;
            runInAction(() => {
                if (data.error) {
                    this.error = data.error;
                }
                else {
                    this._name = data.user_data.name;
                    this._surname = data.user_data.surname;
                    if (data.cashier) {
                        this._cashier = data.cashier;
                        this._outlet = data.user_data.outlet_id;
                        this.socket = io('http://localhost:3000');
                        this.socket.on('new_order', (order_data) => {
                            runInAction(() => {
                                this._orders.push(order_data);
                            });
                        })
                        this.socket.emit('join_room', this._outlet);
                    }
                    else {
                        this._town = data.user_data.town;
                        this._address = data.user_data.address;
                    }
                    this.authorised = true;
                }
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    async renewOrdersList() {
        try {
            const outlet_data = new FormData();
            outlet_data.append("outlet", this._outlet);
            let data = (await instance.get('/active_orders_by_outlet', outlet_data)).data;

            runInAction(() => {
                this._orders = data.orders;
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    changeOrderStatus(id) {
        if (this._cashier) {
            if (!this._orders[id].isstarted) {
                this._orders[id].isstarted = true;
            }
            else if (!this._orders[id].iscooked) {
                this._orders[id].iscooked = true;
            } 
            else if (!this._orders[id].isfinished) {
                this._orders[id].isfinished = true;
            }
            const order_status = {
                isstarted: this._orders[id].isstarted,
                iscooked: this._orders[id].iscooked,
                isfinished: this._orders[id].isfinished,
                client: this._orders[id].client
            }
            this.socket.emit('order_status_changed', order_status);
        }
    }
}

export const user_data_store = new UserDataState();