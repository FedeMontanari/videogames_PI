import React from "react";
import './Pagination.css'

export const Pagination = ({ gamesPerPage, totalGames, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className='paginate'>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="" onClick={(e) => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
