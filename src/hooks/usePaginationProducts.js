import { useEffect } from 'react';
import axios from 'axios';

export const usePaginationProducts = (url, onSuccess, options = {}) => {
   useEffect(() => {
      if (!url || typeof onSuccess !== 'function') return; // Kiểm tra URL và callback

      const AxiosData = async () => {
         try {
            const response = await axios.get(url, options);
            onSuccess(response.data); // Gọi callback để xử lý dữ liệu
         } catch (error) {
            console.error('Fetch error:', error.message);
         }
      };

      AxiosData();
   }, [url]); // Mỗi khi URL thay đổi thì gọi lại API
};