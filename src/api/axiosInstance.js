import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: `http://localhost:3002`,
   headers: {
      'Content-Type': 'application/json',
   },
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      if (error.response?.status === 401) {
         console.warn('Unauthorized! Thực hiện refresh token...');
         try {
            // Thực hiện refresh token
            console.log('Lấy refreshToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(refreshToken);

            if (!refreshToken) {
               throw new Error('No refresh token found');
            }

            const refreshResponse = await axios.post(`http://localhost:3002/auth/refreshToken`, {
               refreshToken: refreshToken,
            });

            localStorage.setItem('accessToken', refreshResponse.data.accessToken);

            // Lưu lại access token mới vào localStorage
            const newAccessToken = localStorage.getItem('accessToken');

            error.config.headers.Authorization = `Bearer ${newAccessToken}`;

            // Gửi lại yêu cầu cũ
            return axiosInstance(error.config);
         } catch (refreshError) {
            console.error('Failed to refresh token', refreshError);

            return;
         }
      }
      // Nếu lỗi không phải là 401, trả về lỗi
      return Promise.reject(error);
   },
);
