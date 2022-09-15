import React from "react";
import "./Pagination.css";

export const Pagination = ({ gamesPerPage, totalGames, paginate }) => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginate">
      {pageNumbers.map((number) => (
        <button
          className="paginateButton"
          key={number}
          id={number}
          onClick={(e) => {
            paginate(e);
            handleScroll();
          }}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};
