import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllGames,
  getAllGenres,
  getAllPlatforms,
} from "../../redux/actions";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "You must set a name for your videogame!";
  }

  if (!input.description) {
    errors.description = "You must set a description for your videogame!";
  }

  if (input.released < 0) {
    errors.released = "You must set a release date for your videogame!";
  }

  if (input.rating < 0) {
    errors.rating = "You must set a rating for your videogame!";
  }

  if (input.genre.length < 0) {
    errors.genre = "You must set at least 1 genre for your videogame!";
  }

  if (input.platform.length < 0) {
    errors.platform = "You must set at least 1 platform for your videogame!";
  }

  return errors;
}

export default function Form() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: 0,
    rating: 0,
    genre: [],
    platform: [],
  });

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAllGames());
    dispatch(getAllPlatforms());
    dispatch(getAllGenres());
  }, [dispatch]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <>
      <Link to="/home">Home</Link>
      <h2>Create a new Game!</h2>
      <form action="">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            cols={40}
            value={input.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="released">Release Date</label>
          <input type="date" name="released" id="released" />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input type="number" name="rating" id="rating" max={5} min={0} />
        </div>
        <label htmlFor="genre">Genres</label>
        <select name="genre" id="genre">
          {genres.map((g) => (
            <option key={g.id} value={g.name}>{g.name}</option>
          ))}
        </select>
        <label htmlFor="platform">Platforms</label>
        <select name="platform" id="platform">
          {platforms.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
