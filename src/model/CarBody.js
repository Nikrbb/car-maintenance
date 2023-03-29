import { makeAutoObservable } from 'mobx';

class CarBody {
    currentBodyId = '';

    list = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    setBody(value) {
        this.currentBodyId = value;
    }

    getBodies(params) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getModelBodies', params)
                .then((responce) => {
                    this.list = responce.data.model;
                    return resolve(responce);
                })
                .catch((error) => reject(error));
        });
    }
}

export default CarBody;
