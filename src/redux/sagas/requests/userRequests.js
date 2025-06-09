import apiClient from "../../../services/api";

// Функционал: Получение аутентифицированного пользователя
export const CheckAuth = async () => {
  console.log('Get user');
  const response = await apiClient.get('/api/user');
  return response;
}