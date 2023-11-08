import React from 'react';

const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

  return (
    // <nav>
    //   <ul className='pagination'>
    //     {pageNumbers.map(number => (
    //       <li key={number} className='page-item'>
    //         {/* <a onClick={() => paginate(number)} href='!#' className='page-link'>
    //           {number}
    //         </a> */}
    //            <button className="pagination-element" onClick={() => {if(currentPage!==0) currentPage--;}} href='!#'>
    //               Previous
    //            </button>
    //         <button className="pagination-element" onClick={() => paginate(number)} href='!#'>
    //           {number}
    //         </button>
    //         <button className="pagination-element" onClick={() => {if(currentPage!==0) currentPage--;}} href='!#'>
    //               Next
    //            </button>
    //       </li>

    //     ))}
    //   </ul>
    // </nav>
    <nav>
      <ul className='pagination'>
      <li className='page-item'>
        <button className="pagination-element" 
        onClick={() => { 
          currentPage=1;
          paginate(currentPage); }}  href='!#'>
          {"|<"}
        </button>
        </li>
        <li className='page-item'>
        <button className="pagination-element" 
        onClick={() => { if (currentPage !== 0) 
        {currentPage--;
        paginate(currentPage); }}} href='!#'>
          {"<"}
        </button>
        </li>
        <li className='page-item'>
        <button   href='!#'>
          {currentPage}
        </button>
        </li>
        <li className='page-item'>
        <button className="pagination-element" 
        onClick={() => { if (currentPage !== Math.ceil(totalCourses/coursesPerPage)) 
          {currentPage++;
          paginate(currentPage); }}}  href='!#'>
          {">"}
        </button>
        </li>
        <li className='page-item'>
        <button className="pagination-element" 
        onClick={() => {currentPage=Math.ceil(totalCourses/coursesPerPage);
                        paginate(currentPage) }} href='!#'>
          {">|"}
        </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
