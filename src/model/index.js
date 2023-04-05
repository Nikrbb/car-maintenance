import { makeAutoObservable, runInAction } from 'mobx';
import UserModel from './UserModel';
import CarModel from './CarModel';
import CarEngine from './CarEngine';
import CarConfiguration from './CarConfiguration';
import CarBody from './CarBody';
import PartsGroup from './PartsGroup';
import PartsList from './PartsList';
import Cards from './Cards';
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
        this.cards = new Cards(ApiServices);
        this.user = new UserModel(ApiServices);
    }

    getModels = async () => {
        this.pending = true;

        this.clearModelsData();

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

        this.engines.clearData();
        this.configurations.clearData();
        this.groups.clearData();
        this.parts.clearData();
        this.cards.clearData();
    };

    setBody = async (body) => {
        this.pending = true;

        this.bodies.setBody(body);

        await this.engines.getEngines({ id: this.bodies.currentBody.id });
        runInAction(() => {
            this.pending = false;
        });

        this.configurations.clearData();
        this.groups.clearData();
        this.parts.clearData();
        this.cards.clearData();
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

        this.groups.clearData();
        this.parts.clearData();
        this.cards.clearData();
    };

    setConfigId = async (id) => {
        this.pending = true;

        this.configurations.setConfig(id);

        await this.groups.getGroups({ id });
        runInAction(() => {
            this.pending = false;
        });

        this.parts.clearData();
        this.cards.clearData();
    };

    setPartsGroup = async (id) => {
        this.pending = true;

        this.groups.setGroupId(id);

        await this.parts.getList({ id, name: '' });
        runInAction(() => {
            this.pending = false;
        });
    };

    clearModelsData = () => {
        this.models.clearData();
        this.bodies.clearData();
        this.engines.clearData();
        this.configurations.clearData();
        this.groups.clearData();
        this.parts.clearData();
        this.cards.clearData();
    };
}
