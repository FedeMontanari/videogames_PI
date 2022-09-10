import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createGame,
  getAllGames,
  getAllGenres,
  getAllPlatforms,
} from "../../redux/actions";
import "./CreateGame.css";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "You must set a name for your videogame!";
  }

  if (!input.description) {
    errors.description = "You must set a description for your videogame!";
  }

  if (!input.released) {
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
    released: "",
    rating: 0,
    genre: [],
    platform: [],
    image: ''
  });

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const [localGenres, setLocalGenres] = useState([]);
  const [localPlatforms, setLocalPlatforms] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllGames());
      dispatch(getAllPlatforms());
      dispatch(getAllGenres());
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setLocalGenres(genres);
  }, [dispatch, genres]);

  useEffect(() => {
    setLocalPlatforms(platforms);
  }, [dispatch, platforms]);

  const handleInputChange = (e) => {
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

  const handleGenreChange = (e) => {
    if (e.target.value === input.genre) {
      return;
    }
    let arr = [...input.genre, e.target.value];
    setInput({
      ...input,
      genre: arr,
    });
    setLocalGenres(localGenres.filter((g) => g.name !== e.target.value));
  };

  const handlePlatformChange = (e) => {
    if (e.target.value === input.platform) {
      return;
    }
    let arr = [...input.platform, e.target.value];
    setInput({
      ...input,
      platform: arr,
    });
    setLocalPlatforms(localPlatforms.filter((p) => p !== e.target.value));
  };

  const handleGenreRemove = (e) => {
    let arr = input.genre.filter((g) => g !== e.target.id);
    setLocalGenres([...localGenres, { name: e.target.id }]);
    setInput({
      ...input,
      genre: arr,
    });
  };

  const handlePlatformRemove = (e) => {
    let arr = input.platform.filter((p) => p !== e.target.id);
    setLocalPlatforms([...localPlatforms, e.target.id]);
    setInput({
      ...input,
      platform: arr,
    });
  };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(e)
  //   dispatch(createGame())
  //   alert(createGame())
  // }

  return (
    <>
      <Link to="/home">Home</Link>
      <h2>Create a new Game!</h2>
      <form action="http://localhost:3001/videogames" method="POST">
        <div className="name">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleInputChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        {input.name ? (
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              cols={40}
              value={input.description}
              onChange={handleInputChange}
            />
            {errors.description && <p>{errors.description}</p>}
          </div>
        ) : (
          <></>
        )}
        {input.description ? (
          <div className="released">
            <label htmlFor="released">Release Date</label>
            <input
              type="date"
              name="released"
              id="released"
              onChange={handleInputChange}
              value={input.released}
            />
            {errors.released && <p>{errors.released}</p>}
          </div>
        ) : (
          <></>
        )}
        {input.released ? (
          <>
            <div className="rating">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                name="rating"
                id="rating"
                max={5}
                min={0}
                value={input.rating}
                onChange={handleInputChange}
              />
            </div>
            <div className="genrePlatform">
              <label htmlFor="genres">Genres</label>
              <select
                name="genres"
                id="genres"
                className="genre"
                onChange={handleGenreChange}
              >
                <option value={input.genre}>Choose genres</option>
                {localGenres.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
              <label htmlFor="platforms">Platforms</label>
              <select
                name="platforms"
                id="platforms"
                className="platform"
                onChange={handlePlatformChange}
              >
                <option value={input.platform}>Choose platforms</option>
                {localPlatforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="genres">
              {input.genre ? (
                input.genre.map((g) => (
                  <>
                    <p key={g}>{g}</p>
                    <input
                      type="button"
                      value="X"
                      id={g}
                      onClick={handleGenreRemove}
                    />
                  </>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="platforms">
              {input.platform ? (
                input.platform.map((p) => (
                  <>
                    <p key={p}>{p}</p>
                    <input
                      type="button"
                      value="X"
                      id={p}
                      onClick={handlePlatformRemove}
                    />
                  </>
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
