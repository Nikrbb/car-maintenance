import { makeAutoObservable, runInAction } from 'mobx';

class PartsCards {
    choosenItems = [];

    cardsList = [];

    mileage = null;

    pending = false;

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    addItem(element, amount) {
        if (this.choosenItems.find((el) => el.code === element.code)) {
            const modifyElements = this.choosenItems.map((item) => {
                if (item.code === element.code) {
                    return {
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        partCount: +item.partCount + +amount
                    };
                }
                return {
                    id: item.id,
                    name: item.name,
                    code: item.code,
                    partCount: +item.partCount
                };
            });
            this.choosenItems = modifyElements;
        } else {
            this.choosenItems.push({
                id: element.id,
                name: element.name,
                code: element.code,
                partCount: +amount
            });
        }
    }

    removeItem(itemId) {
        const filteredItems = this.choosenItems.filter(
            (el) => el.id !== itemId
        );
        this.choosenItems = filteredItems;
    }

    setMileage(km) {
        this.mileage = +km;
    }

    addCard(card) {
        return new Promise((resolve, reject) => {
            this.services
                .post('postNewCard', {}, card)
                .then((response) => {
                    runInAction(() => {
                        this.cardsList.push(response.data.card);
                    });
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }

    deleteCard(id) {
        return new Promise((resolve, reject) => {
            this.services
                .delete('removeCard', {}, { id })
                .then((response) => resolve(response))
                .then(() => this.requestCards(false))
                .catch((error) => reject(error));
        });
    }

    requestCards(reload) {
        this.pending = reload;

        return new Promise((resolve, reject) => {
            this.services
                .get('getAllCards', {})
                .then((response) => {
                    runInAction(() => {
                        this.cardsList = response.data?.card;
                        this.pending = false;
                    });
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });
    }

    clearData() {
        this.choosenItems = [];
        this.mileage = 0;
    }
}

export default PartsCards;
