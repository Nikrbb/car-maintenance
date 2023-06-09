import { makeAutoObservable, runInAction } from 'mobx';

class PartsList {
    list = null;

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    getList(param) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getPartsList', param)
                .then((response) => {
                    runInAction(() => {
                        this.list = response.data.parts;
                    });
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
