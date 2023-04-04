import { makeAutoObservable, runInAction } from 'mobx';
import UserModel from './UserModel';
import CarModel from './CarModel';
import CarEngine from './CarEngine';
import CarConfiguration from './CarConfiguration';
import CarBody from './CarBody';
import PartsGroup from './PartsGroup';
import PartsList from './PartsList';
import PartsCards from './PartsCards';
import ApiServices from '../services/api.service';

export default class Model {
    pending = false;

    constructor() {
        makeAutoObservable(this);

        this.models = new CarModel(ApiServices);
        this.bodies = new CarBody(ApiServices);
        this.engines = new CarEngine(ApiServices);
        this.configurations = new CarConfiguration(ApiServices);
        this.groups = new PartsGroup(ApiServices);
        this.parts = new PartsList(ApiServices);
        this.cards = new PartsCards(ApiServices);
        this.user = new UserModel(ApiServices);

        this.selectedParts = new Map();
    }

    getModels = async () => {
        this.pending = true;
        await this.models.getModels();
        runInAction(() => {
            this.pending = false;
        });
    };

    setModel = async (model) => {
        this.pending = true;
        this.models.setModel(model);

        await this.bodies.getBodies({ name: this.models.choosenModel });
        runInAction(() => {
            this.pending = false;
        });
    };

    setBody = async (body) => {
        this.pending = true;
        this.bodies.setBody(body);
        await this.engines.getEngines({ id: this.bodies.currentBody.id });
        runInAction(() => {
            this.pending = false;
        });
    };

    setEngineName = async (name) => {
        this.pending = true;
        this.engines.setEngine(name);

        await this.configurations.getConfigs({
            id: this.bodies.currentBody.id,
            name: this.engines.choosenEngine
        });
        runInAction(() => {
            this.pending = false;
        });
    };

    setConfigId = async (id) => {
        this.pending = true;
        this.configurations.setConfig(id);

        await this.groups.getGroups({ id });
        runInAction(() => {
            this.pending = false;
        });
    };

    setPartsGroup = async (id) => {
        this.pending = true;
        this.groups.setGroupId(id);

        await this.parts.getList({ id, name: '' });
        runInAction(() => {
            this.pending = false;
        });
    };

    requestData = async () => {
        this.pending = true;
        await this.cards.requestCards();
        runInAction(() => {
            this.pending = false;
        });
    };

    // makeCard() {
    //     this.cards.addCard({
    //         model: this.models.choosenModel,
    //         engine: this.engines.choosenEngine,
    //         mileage: '4000km',
    //         parts: this.cards.itemsList
    //     });
    // }
}
