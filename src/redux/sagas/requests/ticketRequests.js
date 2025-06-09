import apiClient from "../../../services/api";

// Функционал: Получение всех билетов
export const getTicketsFromDB = async () => {
  console.log('Get tickets request');
  const response = await apiClient.get('/api/guest/tickets');
  return response;
}

// Функционал: получение билетов по id заказа
export const getDataById = async (url, id) => {
  console.log('Get collection by other primary key ID get request');
  try {
    const response = await apiClient.get(`${url}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}