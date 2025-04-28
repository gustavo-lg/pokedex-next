'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

export default function PokemonPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      page={currentPage}
      count={totalPages}
      color="primary"
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        '& .MuiPaginationItem-root': {
          color: '#333',
        },
        '& .Mui-selected': {
          fontWeight: 'bold',
        },
      }}
    />
  );
}