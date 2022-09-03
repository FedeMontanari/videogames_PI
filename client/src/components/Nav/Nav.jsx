import React from "react";

export default function Nav() {
  return (
    <>
      <label for="search">Search a game: </label>
      <input type="search" id="search" name="search" />
      <input type="submit" value="Search" />

      <label for="order-by-name">Select an order: </label>
      <select name="oder" id="order-by-name">
        <option value="">Choose an option</option>
        <option value=""> --------- </option>
        <option value="asc-by-name">Ascending by name</option>
        <option value="desc-by-name">Descending by name</option>
        <option value=""> --------- </option>
        <option value="asc-by-rating">Ascending by rating</option>
        <option value="desc-by-rating">Descending by rating</option>
      </select>
    </>
  );
}
