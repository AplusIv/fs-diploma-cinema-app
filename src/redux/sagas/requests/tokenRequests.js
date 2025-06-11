import apiClient from "../../../services/api";

// Функционал: Создание токена для аутентификации
export const creatToken = async (data) => {
  console.log('creat token');
  const response = await apiClient.post('api/createToken', data);
  return response;
}