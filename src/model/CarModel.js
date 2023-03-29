import { makeAutoObservable } from 'mobx';

class CarModel {
    choosenModel = '';

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
                    this.list = responce.data;
                    return resolve(responce);
                })
                .catch((error) => reject(error));
        });
    }
}

export default CarModel;
