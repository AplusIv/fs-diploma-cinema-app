import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true, // !!!
});

const BASEURL = 'http://localhost:8000';

// export default apiClient;

export { apiClient as default, BASEURL };