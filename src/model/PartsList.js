import { makeAutoObservable } from 'mobx';

class PartsList {
    list = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    getList(param) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getPartsList', param)
                .then((response) => {
                    this.list = response.data.parts;
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.list = [];
    }
}

export default PartsList;
