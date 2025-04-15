import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children }) {
   const location = useLocation();
   const accessToken = localStorage.getItem('accessToken');

   if (!accessToken) {
      return <Navigate to="/login" replace />;
   }

   try {
      const decoded = jwtDecode(accessToken);

      // Nếu đang ở trang admin nhưng không phải superadmin
      if (location.pathname.startsWith('/admin') && decoded.username !== 'superadmin') {
         alert('Bạn không có quyền truy cập trang này!');
         return <Navigate to="/" replace />;
      }

      return children;
   } catch (error) {
      console.error('Token không hợp lệ', error);
      return <Navigate to="/login" replace />;
   }
}

export default ProtectedRoute;
