import axios from "axios";

// Tạo instance của axios
const axiosInstance = axios.create({
  baseURL: "http://103.27.62.63:5001/api/", // Domain API mới
  timeout: 300000, // Thời gian chờ request
});

// Interceptor thêm token vào header của request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý lỗi 401 (token hết hạn)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn -> Chuyển hướng đến trang login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
