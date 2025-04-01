import { useNavigate } from 'react-router-dom';
import isTokenValid from '../guards/IsTokenValid';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';

function useTokenValidation() {
   const navigate = useNavigate();

   const validateToken = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken || !isTokenValid(accessToken)) {
         console.error('Token không tồn tại hoặc đã hết hạn (kiểm tra local).');

         try {
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('refreshToken', refreshToken);

            const response = await axios.post(`http://localhost:3002/auth/refreshToken`, {
               refreshToken: refreshToken,
            });
            const newToken = response.data.accessToken;
            localStorage.setItem('accessToken', newToken);
            console.log('Token mới đã được cấp');
            return true;
         } catch (error) {
            console.error('Refresh accessToken không hợp lệ. Vui lòng đăng nhập lại.');
            navigate('/login'); // Điều hướng tới trang login
            return false;
         }
      }

      console.log('Token hợp lệ. Thực hiện hành động được bảo vệ.');
      return true;
   };

   return validateToken;
}

export default useTokenValidation;
