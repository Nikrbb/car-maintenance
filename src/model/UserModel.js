import { makeAutoObservable } from 'mobx';

class UserModel {
    isAuth = false;

    email = '';

    pending = false;

    constructor(ApiServices) {
        makeAutoObservable(this);
        this.services = ApiServices;
    }

    setAuthStatus(value) {
        this.isAuth = value;
    }

    register(data) {
        this.pending = true;
        return new Promise((resolve, reject) => {
            this.services
                .post('sendSignInfo', {}, data, {
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'text/json'
                    }
                })
                .then((response) => {
                    this.pending = false;
                    return resolve(response);
                })
                .catch((error) => {
                    this.pending = false;
                    return reject(error);
                });
        });
    }

    login(data) {
        this.pending = true;
        return new Promise((resolve, reject) => {
            this.services
                .post('login', {}, data, {
                    headers: {
                        Accept: '*/*',
                        'content-type': 'application/json'
                    }
                })
                .then((response) => {
                    if (response.status === 200) this.setAuthStatus(true);
                    this.pending = false;
                    return resolve(response);
                })
                .catch((error) => {
                    this.pending = false;
                    return reject(error);
                });
        });
    }
}
export default UserModel;
