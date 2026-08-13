import axiosInstance from './index';

export const apiUser = {
  // Lấy danh sách tất cả người dùng
  getAllUsers: () => {
    return axiosInstance.get('/users');
  },
  
  // Lấy chi tiết một người dùng theo id
  getUserById: (id) => {
    return axiosInstance.get(`/users/${id}`);
  },

  // Tạo người dùng mới
  createUser: (data) => {
    return axiosInstance.post('/users', data);
  },

  // Cập nhật người dùng
  updateUser: (id, data) => {
    return axiosInstance.put(`/users/${id}`, data);
  },

  // Xóa người dùng
  deleteUser: (id) => {
    return axiosInstance.delete(`/users/${id}`);
  }
};
