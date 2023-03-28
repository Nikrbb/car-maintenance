import axios from 'axios';

export default axios.create({
    baseURL: `https://service-api-stas.azurewebsites.net/Base/`
});
