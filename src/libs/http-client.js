import Axios from 'axios';

const options = {
    baseURL: 'https://service-api-stas.azurewebsites.net',
    headers: {
        Accept: 'text/plain'
    }
};

const httpClient = Axios.create(options);

const ApiClient = {
    get(url, conf = {}) {
        return httpClient.get(url, conf);
    },

    put(url, data = {}, conf = {}) {
        return httpClient.put(url, data, conf);
    },

    delete(url, data = {}) {
        return httpClient.delete(url, data);
    },

    post(url, data = {}, conf = {}) {
        return httpClient.post(url, data, conf);
    }
};

export default ApiClient;
