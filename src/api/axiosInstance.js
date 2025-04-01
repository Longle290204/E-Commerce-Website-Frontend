import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
   baseURL: `http://localhost:3002`,
   headers: {
      'Content-Type': 'application/json',
   },
});

export default axiosInstance;

export const useAxiosInstance = () => {
   
   const navigate = useNavigate();

   axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
         // Khi request bi loi, kiem tra xem loi do co phai la loi 401 khong

         if (error.response?.status === 401) {
            console.warn('Unauthorized! Thực hiện refresh token...');
            try {
               // Thực hiện refresh token
               console.log('Lấy refreshToken');
               const refreshToken = localStorage.getItem('refreshToken');
               console.log(refreshToken);

               if (!refreshToken) {
                  navigate('/login');
                  throw new Error('No refresh token found');
               }

               const refreshResponse = await axios.post(`http://localhost:3002/auth/refreshToken`, {
                  refreshToken: refreshToken,
               });

               // Lưu cả access token MỚI và refresh token MỚI ngay lập tức
               localStorage.setItem('accessToken', refreshResponse.data.accessToken);
               localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

               // Lưu lại access token mới vào localStorage
               const newAccessToken = localStorage.getItem('accessToken');

               error.config.headers.Authorization = `Bearer ${newAccessToken}`;

               // Gửi lại yêu cầu cũ
               return axiosInstance(error.config);
            } catch (refreshError) {
               console.error('Failed to refresh token', refreshError);

               // Nếu refresh token hết hạn thì xóa luôn localStorage để tránh lỗi lặp vô hạn
               localStorage.removeItem('accessToken');
               localStorage.removeItem('refreshToken');

               return Promise.reject(refreshError);
            }
         }
         // Nếu lỗi không phải là 401, trả về lỗi
         return Promise.reject(error);
      },
   );
   return axiosInstance;
};
