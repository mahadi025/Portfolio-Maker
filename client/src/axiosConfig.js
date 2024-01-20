import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.MODE === 'development'
        ? 'https://localhost:5001/api/'
        : '/api',
});

export default instance;
