import { makeAutoObservable } from 'mobx';

class EditCard {
    cardData = [];

    constructor(ApiServices) {
        this.services = ApiServices;
        makeAutoObservable(this);
    }

    setCardData(card) {
        this.cardData = JSON.parse(JSON.stringify(card));
    }

    changePartsAmount(amount, code) {
        const idx = this.cardData.parts.findIndex((part) => part.code === code);
        this.cardData.parts[idx].partCount = +amount;
    }

    deletePart(code) {
        const filteredParts = this.cardData.parts.filter(
            (el) => el.code !== code
        );
        this.cardData.parts = filteredParts;
    }

    changeMileage(mileage) {
        this.cardData.mileage = mileage;
    }
}

export default EditCard;
