import api from './axios-service';


export const getUsers = async (page = 1, perPage = 6) => {
    const response = await api.get(`/users?page=${page}&per_page=${perPage}`);
  return response.data;
};
export const getAllUsers = async () => {
    let allUsers = [];
    let page = 1;
    let totalPages = 1;
  
    do {
      const response = await api.get(`/users?page=${page}`);
      const { data, total_pages } = response.data;
      allUsers = [...allUsers, ...data];
      totalPages = total_pages;
      page++;
    } while (page <= totalPages);
  
    return allUsers;
  };

export const createUser = async (userData) => {
  const response = await api.post(`/users`, userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
