import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  getAllGenres,
  orderByName,
  orderByRating,
  searchGame,
  setCurrentPage,
} from "../../redux/actions";

export default function Nav() {
  const genres = useSelector((state) => state.genres);

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

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <>
      <label htmlFor="search">Search a game: </label>
      <input
        type="search"
        id="search"
        name="search"
        onChange={handleSearchChange}
      />

      <label htmlFor="order-by-name">Select an order: </label>
      <select name="order" id="order-by-name" onChange={handleOrderChange}>
        <option value="">Choose an option</option>
        <option value=""> --------- </option>
        <option value="asc-by-name">Ascending by name</option>
        <option value="desc-by-name">Descending by name</option>
        <option value=""> --------- </option>
        <option value="asc-by-rating">Ascending by rating</option>
        <option value="desc-by-rating">Descending by rating</option>
        <option value=""> --------- </option>
        <option value="default">Default</option>
      </select>

      <label htmlFor="db-api">Select: </label>
      <input type="checkbox" name="api" id="api" defaultChecked />
      <label htmlFor="api">API</label>
      <input type="checkbox" name="db" id="db" />
      <label htmlFor="db">Database</label>

      <label htmlFor="order-by-genre">Select a genre: </label>
      <select name="genre" id="order-by-genre" onChange={handleGenreChange}>
        <option value="">Choose an option</option>
        {genres.map((g) => {
          return (
            <option value={g.name} key={g.name}>
              {g.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
