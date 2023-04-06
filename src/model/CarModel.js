import { makeAutoObservable, runInAction } from 'mobx';

class CarModel {
    choosenModel = null;

    list = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    setModel(value) {
        this.choosenModel = value;
    }

    getModels() {
        return new Promise((resolve, reject) => {
            this.services
                .get('getCarModels', {})
                .then((responce) => {
                    runInAction(() => {
                        this.list = responce.data;
                    });
                    return resolve(responce);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.choosenModel = null;
        this.list = [];
    }
}

export default CarModel;
