import { makeAutoObservable, runInAction } from 'mobx';

class PartsGroup {
    choosenGroup = null;

    list = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    setGroupId(value) {
        this.choosenGroup = value;
    }

    getGroups(param) {
        return new Promise((resolve, reject) => {
            this.services
                .get('getPartsGroups', param)
                .then((responce) => {
                    runInAction(() => {
                        this.list = responce.data.groups;
                    });
                    return resolve(responce);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.choosenGroup = [];
        this.list = [];
    }
}

export default PartsGroup;
