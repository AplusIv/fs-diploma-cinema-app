import axios from "axios";
import apiClient, { getCookie } from "../../../services/api";

// Функционал: Получение всех сеансов гостем сайта (неавторизованный пользователь)
export const getGuestSessionsFromDB = async () => {
  console.log('Get Guest Sessions request');
  const response = await apiClient.get('/api/guest/sessions');
  return response;
}

// Функционал: Получение всех сеансов
export const getSessionsFromDB = async () => {
  console.log('Get Sessions request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  const response = await apiClient.get('/api/sessions', {
    headers: {
      Authorization: 'Bearer ' + apiToken,
    }
  });
  return response;
}

// Функционал: Добавление новых сеансов/нескольких сеансов в массиве
// {sessionsToAddInDB, 'api/sessions'}
export const addDataToDB = async (dataArray, url) => {
  console.log('array post request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  try {
    const promises = dataArray.map(async data => {
      return await apiClient.post(url, data, {
        headers: {
          Authorization: 'Bearer ' + apiToken,
        }
      });
    });
    const responses = await axios.all(promises);
    return responses;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Изменение существующего сеанса/нескольких сеансов в массиве
// {sessionsToChangeInDB, 'api/sessions'}
export const changeDataInDB = async (dataArray, url) => {
  console.log('array put requests');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  try {
    const promises = dataArray.map(async data => {
      return await apiClient.put(`${url}/${data.id}`, data, {
        headers: {
          Authorization: 'Bearer ' + apiToken,
        }
      });
    });
    const responses = await axios.all(promises);
    return responses;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Удаление выбранного сеанса / массива сеансов
// {sessionsToDeleteInDB, 'api/sessions'}
export const deleteDataInDB = async (dataArray, url) => {
  console.log('array delete request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  // dataArray содержит только id удаляемых элементов
  try {
    const promises = dataArray.map(async id => {
      return await apiClient.delete(`${url}/${id}`, {
        headers: {
          Authorization: 'Bearer ' + apiToken,
        }
      });
    });
    const responses = await axios.all(promises);
    return responses;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Открытие/закрытие продаж билетов на сеансы
export const toggleSessionsSalesActive = async (url) => {
  console.log('is_sales_active put request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  try {
    const response = await apiClient.put(url, null, {
      headers: {
        Authorization: 'Bearer ' + apiToken,
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

// КЛИЕНТСКАЯ ЧАСТЬ
// Функционал: получение сеансов на конкретную дату
export const getSessionsByDate = async (date) => {
  console.log('Sessions by date get request');
  try {
    const response = await apiClient.get('api/guest/sessions/date/' + date);
    return response;
  } catch (error) {
    console.log(error);
  }
}