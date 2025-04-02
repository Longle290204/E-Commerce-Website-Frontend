import React from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationPage({ currentPage, totalPages, onPageChange }) {
   return (
      <Stack spacing={2}>
         <Pagination
            count={totalPages}
            size="large"
            page={currentPage}
            onChange={(e, page) => onPageChange(page)}
            sx={{ '& .MuiPaginationItem-root': { color: '#000', fontSize: '15px' } }}
         />
      </Stack>
   );
}

export default PaginationPage;
