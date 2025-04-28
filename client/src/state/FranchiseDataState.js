import { makeAutoObservable, runInAction, toJS } from "mobx";
import instance from '../api/server_api';

class FranchiseDataState {

    error = false;
    _towns = [];
    _outlets = [];
    _logo = null;
    _about_us = {};
    _about_production = {};
    _contact_info = {};
    _fact_info = {};


    constructor () {
        makeAutoObservable(this);
    }

    async renewAllData() {
        try {
            let outlets = (await instance.get('/outlets')).data;
            let towns = (await instance.get('/towns')).data;
            let about = (await instance.get('/about')).data;
            runInAction(() => {
                this._outlets = outlets;
                this._towns = towns;
                this._logo = about.logo;
                this._about_us = about.about_us;
                this._about_production = about.about_production;
                this._contact_info = about.contact_info;
                this._fact_info = about.fact_info;
                this.error = false;
            });
        }
        catch {
            runInAction(() => {
                this.error = true;
            });
        }
    }

    set outlets(value) {
        this._outlets = value;
    }

    get outlets() {
        return toJS(this._outlets);
    }

    set towns(value) {
        this._towns = value;
    }

    get towns() {
        return toJS(this._towns);
    }

    get logo() {
        return this._logo;
    }

    get about_us() {
        return toJS(this._about_us);
    }
    
    get about_production() {
        return toJS(this._about_production);
    }
    
    get contact_info() {
        return toJS(this._contact_info);
    }

    get fact_info() {
        return toJS(this._fact_info);
    }
};

export const franchise_data_store = new FranchiseDataState();