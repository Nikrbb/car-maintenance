import ApiClient from '../libs/http-client';

const ApiServices = {
    endpoints(route, params) {
        const url = {
            getCarModels: '/ModelNames',
            getModelBodies: `/AllInfoModels?ModelName=${params.name}`,
            getEngines: `/Engine?ModelId=${params.id}`,
            getEquipments: `/Complectation?ModelId=${params.id}&EngineName=${params.name}`,
            getPartsGroups: `/Group?ComplectationId=${params.id}`
        };

        return url[route];
    },

    get(url, data) {
        return ApiClient.get(this.endpoints(url, data));
    },
    post(url, params, data, config = {}) {
        return ApiClient.post(this.endpoints(url, params), data, config);
    }
};

export default ApiServices;
