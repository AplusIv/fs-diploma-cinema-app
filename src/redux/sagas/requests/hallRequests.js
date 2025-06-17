import axios from "axios";
import apiClient, { getCookie } from "../../../services/api";

// Функционал: Получение всех залов гостем сайта (неавторизованный пользователь)
export const getGuestHallsFromDB = async () => {
  console.log('Get Guest Halls request');
  const response = await apiClient.get('/api/guest/halls');
  return response;
}

// Функционал: Получение всех залов
export const getHallsFromDB = async () => {
  console.log('Get Halls request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();


  const response = await apiClient.get('/api/halls', {
    headers: {
      Authorization: 'Bearer ' + apiToken,
    }
  });
  return response;
}

// Функционал: Добавление нового зала
export const addHallToDB = async (data) => {
  console.log('Hall adding request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  const response = await apiClient.post('api/halls', data, {
    headers: {
      Authorization: 'Bearer ' + apiToken,
    }
  });
  return response;
}

// Функционал: Изменение существующего зала/нескольких залов в массиве
// {updatedHalls, 'api/halls'}
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

// Функционал: Удаление выбранного зала
export const deleteHallFromDB = async (id) => {
  console.log('Hall delete request');

  // получение актуальных на момент запроса кук, поиск apiToken
  const { apiToken } = getCookie();

  const response = await apiClient.delete('api/halls/' + id, {
    headers: {
      Authorization: 'Bearer ' + apiToken,
    }
  });
  const { status } = response;
  return status;
}