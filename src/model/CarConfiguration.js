import { makeAutoObservable } from 'mobx';

class CarConfiguration {
    choosenComplectation = null;

    list = [];

    constructor(AppServises) {
        this.services = AppServises;
        makeAutoObservable(this);
    }

    setConfig(value) {
        this.choosenComplectation = value;
    }

    getConfigs(params) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getEquipments', params)
                .then((response) => {
                    this.list = response.data.complectation;
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }
}

export default CarConfiguration;
