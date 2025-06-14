import axios from "axios";
import apiClient from "../../../services/api";

// Функционал: Получение всех фильмов гостем сайта (неавторизованный пользователь)
export const getGuestMoviesFromDB = async () => {
  console.log('Get Guest Movies request');
  const response = await apiClient.get('/api/guest/movies');
  return response;
}

// Функционал: Получение всех фильмов
export const getMoviesFromDB = async () => {
  console.log('Get Movies request');
  const response = await apiClient.get('/api/movies');
  return response;
}

// Функционал: Добавление новых фильмов/нескольких фильмов в массиве
// {moviesToAddInDB, 'api/movies'}
export const addDataToDB = async (dataArray, url) => {
  console.log('array post request');
  try {
    const promises = dataArray.map(async data => {
      const formData = new FormData();
      const entries = Object.entries(data);

      entries.forEach(entry => {
        formData.append(entry[0], entry[1]);
      });

      return await apiClient.post(url, formData);
    });
    const responses = await axios.all(promises);
    return responses;   
  } catch (error) {
    console.log(error);    
  }
}

// Функционал: Изменение существующего фильма/нескольких фильмов в массиве
// {moviesToChangeInDB, 'api/movies'}
export const changeDataInDB = async (dataArray, url) => {
  console.log('array put requests');
  try {
    const promises = dataArray.map(async data => {
      const formData = new FormData();
      const entries = Object.entries(data);

      entries.forEach(entry => {
        formData.append(entry[0], entry[1]);
      });  

      // добавить вручную PUT
      formData.append('_method', 'PUT'); // методы PUT PATCH не распознают формдату на бэкенде

      return await apiClient.post(`${url}/${data.id}`, formData);
    });
    const responses = await axios.all(promises);
    // const consoles = axios.spread(response => console.log(response));
    return responses;   
  } catch (error) {
    console.log(error);    
  }
}


// БЕЗ ПОСТЕРА
/* // Функционал: Добавление новых фильмов/нескольких фильмов в массиве
// {moviesToAddInDB, 'api/movies'}
export const addDataToDB = async (dataArray, url) => {
  console.log('array post request');
  try {
    const promises = dataArray.map(async data => {
      return await apiClient.post(url, data);
    });
    const responses = await axios.all(promises);
    return responses;   
  } catch (error) {
    console.log(error);    
  }
} */

// БЕЗ ПОСТЕРА
/* // Функционал: Изменение существующего фильма/нескольких фильмов в массиве
// {moviesToChangeInDB, 'api/movies'}
export const changeDataInDB = async (dataArray, url) => {
  console.log('array put requests');
  try {
    const promises = dataArray.map(async data => {
      return await apiClient.put(`${url}/${data.id}`, data);
    });
    const responses = await axios.all(promises);
    // const consoles = axios.spread(response => console.log(response));
    return responses;   
  } catch (error) {
    console.log(error);    
  }
} */

// Функционал: Удаление выбранного элемента
// {moviesToDeleteInDB, 'api/movies'}
export const deleteDataInDB = async (dataArray, url) => {
  console.log('array delete request');

  // dataArray содержит только id удаляемых элементов
  try {
    const promises = dataArray.map(async id => {
      return await apiClient.delete(`${url}/${id}`);
    });
    const responses = await axios.all(promises);
    return responses;   
  } catch (error) {
    console.log(error);    
  }
}
