import { makeAutoObservable, runInAction } from 'mobx';
import Swal from 'sweetalert2';

class Cards {
    choosenItems = [];

    cardsList = [];

    initialList = [];

    mileage = null;

    minMaxValue = [];

    searchedMinMix = [];

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

    setSearchedRange(range) {
        this.searchedMinMix = range;
    }

    filterByMileage(range) {
        const filteredList = this.initialList.filter(
            (item) => item.mileage >= range[0] && item.mileage <= range[1]
        );
        this.cardsList = filteredList;
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

    editCard(cardData) {
        return new Promise((resolve, reject) => {
            this.services
                .put('updateCard', {}, cardData)
                .then((response) => {
                    const idx = this.cardsList.findIndex(
                        (el) => el.id === response.data.card.id
                    );
                    runInAction(() => {
                        this.cardsList[idx] = response.data.card;
                    });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'card edited successfully',
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    return resolve(response);
                })
                // .then(() => this.requestCards(false))
                .catch((error) => reject(error));
        });
    }

    deleteCard(id) {
        return new Promise((resolve, reject) => {
            this.services
                .delete('removeCard', {}, { id })
                .then((response) => resolve(response))
                .then(() => this.requestCards(false))
                .then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'deleted successfully',
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500,
                        timerProgressBar: true
                    });
                })
                .catch((error) => reject(error));
        });
    }

    search(string) {
        this.pending = true;
        return new Promise((resolve, reject) => {
            this.services
                .get('searchCards', { name: string })
                .then((response) => {
                    runInAction(() => {
                        this.cardsList = response.data?.card;
                        this.initialList = response.data?.card;
                        this.pending = false;
                    });
                    return resolve(response);
                })
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
                        this.initialList = response.data?.card;
                        this.pending = false;

                        const range = response.data.card.reduce((acc, curr) => {
                            acc[0] =
                                acc[0] === undefined || curr.mileage < acc[0]
                                    ? curr.mileage
                                    : acc[0];
                            acc[1] =
                                acc[1] === undefined || curr.mileage > acc[1]
                                    ? curr.mileage
                                    : acc[1];
                            return acc;
                        }, []);

                        this.minMaxValue = range;
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

export default Cards;
