import React from 'react';

function Pagination({ totalTodos, todosPerPage, setCurrentPage, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pages.push(i);
  }

  return (
    <div
      className="container"
      style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}
    >
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage ? 'btn btn-primary' : 'btn btn-secondary'
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
