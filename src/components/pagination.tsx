'use client';

import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={onPageChange}
      previousLabel={
        <>
          <PiArrowLeft className='text-sm' />
          Previous
        </>
      }
      nextLabel={
        <>
          Next
          <PiArrowRight className='text-sm' />
        </>
      }
      containerClassName='flex gap-2 w-full overflow-x-auto items-center'
      previousClassName='flex mr-auto'
      nextClassName='flex ml-auto'
      nextLinkClassName='flex text-sm items-center gap-2 font-medium text-light-gray'
      previousLinkClassName='flex text-sm items-center gap-2 font-medium text-light-gray'
      disabledLinkClassName='text-light-gray/50'
      pageClassName='flex'
      pageLinkClassName='h-12 min-w-[3rem] grid text-light-gray place-items-center px-2 rounded-lg'
      activeLinkClassName='bg-[#f1f1f1] text-primary-green'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
