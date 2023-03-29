import { makeAutoObservable } from 'mobx';

class UserModel {
    email = '';

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }
}
export default UserModel;
