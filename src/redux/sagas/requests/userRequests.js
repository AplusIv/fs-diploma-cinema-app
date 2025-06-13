import apiClient from "../../../services/api";

// Получение куки для заполнения заголовка Authorization
  function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }

// Функционал: Получение аутентифицированного пользователя
export const CheckAuth = async () => {
  console.log('Get user');

  const cookie = getCookie();
  
  const { apiToken } = cookie;
  
  // const apiClient = axios.create({
  //   baseURL: 'http://localhost:8000',
  //   withCredentials: true,
  //   withXSRFToken: true, // !!!
  //   headers: {
  //     Authorization: 'Bearer ' + apiToken,
  //     }
  // });

  const response = await apiClient.get('/api/user', {
    headers: {
      Authorization: 'Bearer ' + apiToken,
      }
  });
  return response;
}