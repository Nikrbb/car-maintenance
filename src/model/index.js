import { makeAutoObservable } from 'mobx';
import UserModel from './UserModel';
import CarModel from './CarModel';
import CarEngine from './CarEngine';
import CarConfiguration from './CarConfiguration';
import CarBody from './CarBody';
import PartsGroup from './PartsGroup';
import PartsList from './PartsList';
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
        this.list = new PartsList(ApiServices);
        this.user = new UserModel(ApiServices);

        this.selectedParts = new Map();
    }

    getModels = async () => {
        this.pending = true;
        await this.models.getModels();

        this.pending = false;
    };

    setModel = async (model) => {
        this.pending = true;
        this.models.setModel(model);

        await this.bodies.getBodies({ name: this.models.choosenModel });
        this.pending = false;
    };

    setBodyId = async (id) => {
        this.pending = true;
        this.bodies.setBody(id);

        await this.engines.getEngines({ id: this.bodies.currentBodyId });
        this.pending = false;
    };

    setEngineName = async (name) => {
        this.pending = true;
        this.engines.setEngine(name);

        await this.configurations.getConfigs({
            id: this.bodies.currentBodyId,
            name: this.engines.choosenEngine
        });
        this.pending = false;
    };

    setConfigId = async (id) => {
        this.pending = true;
        this.configurations.setConfig(id);

        await this.groups.getGroups({ id });
        this.pending = false;
    };

    setPartsGroup = async (id) => {
        this.groups.setGroupId(id);
    };
}
