import axios from "axios";
import apiClient from "../../../services/api";

// Функционал: Получение всех мест гостем сайта (неавторизованный пользователь)
export const getGuestPlacesFromDB = async () => {
  console.log('Get Guest Places request');
  const response = await apiClient.get('/api/guest/places');
  return response;
}

// Функционал: Получение всех мест
export const getPlacesFromDB = async () => {
  console.log('Get Places request');
  const response = await apiClient.get('/api/places');
  return response;
}

// Функционал заполнение новыми местами измененный зал/залы
export const addPlacesToHall = async (dataArray) => {
  try {
    console.log('post request new places');
    const promises = dataArray.map(async data => {
      return await apiClient.post(`api/halls/${data.id}/places`, data);
    });
    const responses = await axios.all(promises);
    return responses;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Изменение типов мест для зала/залов
export const updateDataInDB = async (dataArray) => {
  console.log('array put requests');
  try {
    const promises = dataArray.map(async ({ hall_id, places }) => {
      return await apiClient.put(`api/halls/${hall_id}/places`, places);
    });
    const responses = await axios.all(promises);
    return responses;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: удаление всех мест для конкретного зала/залов
export const deletePlacesFromHall = async (dataArray) => {
  console.log('array delete requests');
  try {
    const promises = dataArray.map(async data => {
      return await apiClient.delete(`api/halls/${data.id}/places`);
    });
    const responses = await axios.all(promises);
    return responses;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: обновление всех мест в выбранном зале
// const updateHallPlaces = async (data, id) => {
//   // e.preventDefault();

//   console.log('array put request');

//   try {
//     const response = await apiClient.put(`api/halls/${id}/places`, data)
//     // response.json().then(data => console.log(data));
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
