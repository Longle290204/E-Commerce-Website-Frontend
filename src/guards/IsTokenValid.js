import { jwtDecode } from 'jwt-decode';

function isTokenValid(token) {
   try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(currentTime);
      return decoded.exp > currentTime; // Kiểm tra thời gian hết hạn
   } catch (error) {
      return false;
   }
}

export default isTokenValid;
