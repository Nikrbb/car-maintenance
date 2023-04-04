import { makeAutoObservable, runInAction } from 'mobx';

class PartsCards {
    choosenItems = [];

    cardsList = [];

    mileage = null;

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    // addToCard(item) {
    //     this.itemsList.push(item);
    // }

    addItem(element, amount) {
        if (this.choosenItems.find((el) => el.code === element.code)) {
            const modifyElements = this.choosenItems.map((item) => {
                if (item.code === element.code) {
                    return {
                        name: item.name,
                        code: item.code,
                        partCount: +item.partCount + +amount
                    };
                }
                return {
                    name: item.name,
                    code: item.code,
                    partCount: +item.partCount
                };
            });
            this.choosenItems = modifyElements;
        } else {
            this.choosenItems.push({
                name: element.name,
                code: element.code,
                partCount: +amount
            });
        }
    }

    setMileage(km) {
        this.mileage = +km;
    }

    addCard(card) {
        return new Promise((resolve, reject) => {
            this.services
                .post('postNewCard', {}, card, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then((response) => {
                    this.cardsList.push(card);
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }

    requestCards() {
        return new Promise((resolve, reject) => {
            this.services
                .get('getAllCards', {})
                .then((response) => {
                    runInAction(() => {
                        this.cardsList = response.data?.card;
                    });
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.choosenItems = [];
        this.cardsList = [];
        this.mileage = null;
    }
}

export default PartsCards;
