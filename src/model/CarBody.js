import { makeAutoObservable, runInAction } from 'mobx';

class CarBody {
    currentBody = null;

    list = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    setBody(value) {
        this.currentBody = value;
    }

    getBodies(params) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getModelBodies', params)
                .then((responce) => {
                    runInAction(() => {
                        this.list = responce.data.model;
                    });
                    return resolve(responce);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.currentBody = null;
        this.list = [];
    }
}

export default CarBody;
