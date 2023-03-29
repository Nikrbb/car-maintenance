import { makeAutoObservable } from 'mobx';

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
                    this.list = responce.data.groups;
                    return resolve(responce);
                })
                .catch((error) => reject(error));
        });
    }
}

export default PartsGroup;