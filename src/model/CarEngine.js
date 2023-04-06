import { makeAutoObservable, runInAction } from 'mobx';

class CarEngine {
    choosenEngine = '';

    list = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    setEngine(value) {
        this.choosenEngine = value;
    }

    getEngines(params) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getEngines', params)
                .then((response) => {
                    runInAction(() => {
                        this.list = response.data.engine;
                    });
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.choosenEngine = [];
        this.list = [];
    }
}

export default CarEngine;
