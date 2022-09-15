import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterByGenre,
  getAllGenres,
  orderByName,
  orderByRating,
  searchGame,
  setCurrentPage,
  switchData,
} from "../../redux/actions";
import './Nav.css'

export default function Nav() {
  const genres = useSelector((state) => state.genres);
  // const actualGames = useSelector((state) => state.actualGames)
  // const genreFilter = useSelector((state) => state.genreFilter)
  // const byName = useSelector((state) => state.orderByName)
  // const byRating = useSelector((state) => state.orderByRating)

  const dispatch = useDispatch();

  const handleOrderChange = (e) => {
    dispatch(setCurrentPage(1));
    if (e.target.value.endsWith("name")) {
      dispatch(orderByName(e.target.value));
      dispatch(orderByRating(""));
    } else if (e.target.value.endsWith("rating")) {
      dispatch(orderByRating(e.target.value));
      dispatch(orderByName(""));
    } else if (e.target.value === "default") {
      dispatch(orderByRating(""));
      dispatch(orderByName(""));
    }
  };

  const handleGenreChange = (e) => {
    dispatch(setCurrentPage(1));
    dispatch(filterByGenre(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(searchGame(e.target.value));
  };

  const handleDataSelector = (e) => {
    dispatch(switchData(e.target.value))
  }

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(filterByGenre(genreFilter));
  //   // dispatch(orderByName(byName));
  //   // dispatch(orderByRating(byRating));
  // }, [currentGames])

  return (
    <div className="navBar">
    <h1 className="title">Home</h1>
      
    <div className="searchFilter">
      <div className="searchBox">
      <label htmlFor="search">Search a game: </label>
      <input
        type="search"
        id="search"
        name="search"
        onChange={handleSearchChange}
        />
      </div>
      <div className="selectCreate">
      <Link to='/videogames/create' className="createButton">
        <input type="button" value="Create a game" />
      </Link>
      <div className="apiSelector">
        <select name="data" id="data" onChange={handleDataSelector}>
          <option disabled selected={true}>Select an origin</option>
          <option value="both">Both</option>
          <option value="api">Api</option>
          <option value="db">Database</option>
        </select>
      </div>
      </div>
      </div>
      <div className="orderBy">
      <div className="byName">
      <label htmlFor="order-by-name">Order by: </label>
      <select name="order" id="order-by-name" onChange={handleOrderChange}>
        <option disabled selected={true}>Select</option>
        <optgroup label="Name">
          <option value="asc-by-name">Ascending</option>
          <option value="desc-by-name">Descending</option>
        </optgroup>
        <optgroup label="Rating">
          <option value="asc-by-rating">Ascending</option>
          <option value="desc-by-rating">Descending</option>
        </optgroup>
        <option value="default">Default</option>
      </select>
      </div>
      <div className="byGenre">
      <label htmlFor="order-by-genre">Order by: </label>
      <select name="genre" id="order-by-genre" onChange={handleGenreChange}>
        <option disabled selected={true}>Select</option>
        {genres.map((g) => {
          return (
            <option value={g.name} key={g.name}>
              {g.name}
            </option>
          );
        })}
      </select>
      </div>
      </div>
      
    </div>
  );
}
