import ApiClient from '../libs/http-client';

const ApiServices = {
    endpoints(route, params) {
        const url = {
            getCarModels: '/Base/ModelNames',
            getModelBodies: `/Base/AllInfoModels?ModelName=${params.name}`,
            getEngines: `/Base/Engine?ModelId=${params.id}`,
            getEquipments: `/Base/Complectation?ModelId=${params.id}&EngineName=${params.name}`,
            getPartsGroups: `/Base/Group?ComplectationId=${params.id}`,

            sendSignInfo: `/Register`,
            login: `/Login`
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
