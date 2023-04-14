import Axios from 'axios';
import Swal from 'sweetalert2';

const options = {
    baseURL: 'https://service-api-stas.azurewebsites.net',
    headers: {
        Accept: '*/*',
        'content-type': 'application/json'
    }
};

const httpClient = Axios.create(options);

httpClient.interceptors.request.use((config) => {
    const conf = config;
    if (localStorage.getItem('token')) {
        conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return conf;
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { data, status } = error.response;

        let message = '';

        if (status === 401) {
            message = 'Unauthorized';
        }

        if (status === 400) {
            if (data.errors) {
                Object.keys(data.errors).forEach((itemMessage, index) => {
                    if (!index) message = `*${data.errors[itemMessage][0]}`;
                    else if (index) {
                        message += `<br>*${data.errors[itemMessage][0]}`;
                    }
                });
            } else {
                message = data.message;
            }
        }

        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            toast: true,
            timer: 2500,
            timerProgressBar: true
        });
    }
);

const ApiClient = {
    get(url, conf = {}) {
        return httpClient.get(url, conf);
    },

    put(url, data = {}, conf = {}) {
        return httpClient.put(url, data, conf);
    },

    post(url, data = {}, conf = {}) {
        return httpClient.post(url, data, conf);
    },

    delete(url, conf = {}) {
        return httpClient.delete(url, conf);
    }
};

export default ApiClient;
