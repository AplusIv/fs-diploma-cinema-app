import apiClient from "../../../services/api";

// Функционал: Получение всех билетов
export const getOrdersFromDB = async () => {
  console.log('Get tickets request');
  const response = await apiClient.get('/api/orders');
  return response;
}

// Функционал: Создание нового заказа с выбранными билетами
export const postNewOrderWithTickets = async (dataArray) => {
  console.log('array post request');
  try {
    const response = await apiClient.post('api/guest/orders', dataArray);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Изменение статуса заказа и билетов при оплате
export const updateOrderAndTicketStatus = async (data) => {
  console.log('order put request');
  try {
    const response = await apiClient.put(`api/guest/orders/${data.id}`, data)
    return response;
  } catch (error) {
    console.log(error);
  }
}