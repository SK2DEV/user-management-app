
import api  from './axios-service';

export const loginService = async (data) => {
    const response = await api.post(`/login`, data)
    return response.data
  };