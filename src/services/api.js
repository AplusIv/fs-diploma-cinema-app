import axios from 'axios';

// Получение куки для заполнения заголовка Authorization
function getCookie() {
  return document.cookie.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=')
    acc[name] = value
    return acc
  }, {})
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true, // !!!
  // headers: {
  //   Authorization: 'Bearer ' + getCookie().apiToken,
  //   }
});

// // localhost domain
// const apiClient = axios.create({
//     baseURL: 'http://localhost:8000',
//     withCredentials: true,
//     withXSRFToken: true, // !!!
// });

const BASEURL = 'http://localhost:8000';

const frontendBase = '/fs-diploma-cinema-app'

export { apiClient as default, BASEURL, frontendBase, getCookie };