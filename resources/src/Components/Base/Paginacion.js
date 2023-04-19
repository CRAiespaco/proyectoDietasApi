import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import Tarjeta from './Tarjeta';

const Paginacion = ({ itemsPerPage, totalItems }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => setCurrentPage(page);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = totalItems.slice(firstItemIndex, lastItemIndex);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
        <div className=''>
      {currentItems.map((item, index) => (
        <Tarjeta/>
      ))}
      </div>
      <Pagination className="my-5">
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </React.Fragment>
  );
};

export default Paginacion;
