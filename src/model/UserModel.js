import { makeAutoObservable, runInAction } from 'mobx';
import Swal from 'sweetalert2';

class UserModel {
    isAuth = Boolean(localStorage.getItem('token'));

    token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null;

    email = '';

    pending = false;

    constructor(ApiServices) {
        makeAutoObservable(this);
        this.services = ApiServices;
    }

    setAuthStatus(value, token) {
        if (value) localStorage.setItem('token', token);
        else {
            this.token = null;
            localStorage.removeItem('token');
        }
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
                    runInAction(() => {
                        this.pending = false;
                    });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'successfull registration',
                        showConfirmButton: false,
                        toast: true,
                        timer: 2500,
                        timerProgressBar: true
                    });
                    return resolve(response);
                })
                .catch((error) => {
                    runInAction(() => {
                        this.pending = false;
                    });
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
                    if (response.status === 200) {
                        runInAction(() => {
                            this.setAuthStatus(true, response.data.jwtToken);
                            this.pending = false;
                        });
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'successfull login',
                            showConfirmButton: false,
                            toast: true,
                            timer: 2500,
                            timerProgressBar: true
                        });
                    }
                    return resolve(response);
                })
                .catch((error) => {
                    runInAction(() => {
                        this.setAuthStatus(false);
                        this.pending = false;
                    });
                    return reject(error);
                });
        });
    }
}
export default UserModel;
