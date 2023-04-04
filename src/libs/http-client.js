import Axios from 'axios';
// import Swal from 'sweetalert2';

const options = {
    baseURL: 'https://service-api-stas.azurewebsites.net',
    headers: {
        Accept: 'text/plain'
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

// httpClient.interceptors.response.use((response) => {
//     if (response.status === '401') {
//         Swal.fire({
//             position: 'top-end',
//             icon: 'error',
//             title: 'unfortunately, you have been sing out',
//             showConfirmButton: false,
//             toast: true,
//             timer: 2500,
//             timerProgressBar: true
//         });
//     };
//     return response;
// });

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
