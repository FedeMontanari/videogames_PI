import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  createGame,
  getAllGames,
  getAllGenres,
  getAllPlatforms,
} from "../../redux/actions";
import "./CreateGame.css";

export function validate(input) {
  let errors = {};

  let regex = /(http(s?):\/\/.*\.(?:png|jpg))/i;

  if (!input.name) {
    errors.name = "You must set a name for your videogame!";
  }

  if (!input.description) {
    errors.description = "You must set a description for your videogame!";
  }

  if (!input.image) {
    errors.image = "You must set a cover image for your videogame!";
  }

  if (!regex.test(input.image)) {
    errors.invalidImage = "You must set a valid URL for an image!";
  }

  if (!input.released) {
    errors.released = "You must set a release date for your videogame!";
  }

  if (!input.rating) {
    errors.rating = "You must set a rating for your videogame!";
  }

  if (input.genres.length <= 0) {
    errors.genres = "You must set at least 1 genre for your videogame!";
  } else if (input.genres.lenght > 0) {
    errors.genres = "";
  }

  if (input.platforms.length <= 0) {
    errors.platforms = "You must set at least 1 platform for your videogame!";
  } else if (input.platforms.length > 0) {
    errors.platforms = "";
  }

  return errors;
}

export default function Form() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    image: "",
  });

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const [localGenres, setLocalGenres] = useState([]);
  const [localPlatforms, setLocalPlatforms] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

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
    if (e.target.value === input.genres) {
      return;
    }
    let arr = [...input.genres, e.target.value];
    setInput({
      ...input,
      genres: arr,
    });
    setLocalGenres(localGenres.filter((g) => g.name !== e.target.value));
  };

  const handlePlatformChange = (e) => {
    if (e.target.value === input.platforms) {
      return;
    }
    let arr = [...input.platforms, e.target.value];
    setInput({
      ...input,
      platforms: arr,
    });
    setLocalPlatforms(localPlatforms.filter((p) => p !== e.target.value));
  };

  const handleGenreRemove = (e) => {
    let arr = input.genres.filter((g) => g !== e.target.id);
    setLocalGenres([...localGenres, { name: e.target.id }]);
    setInput({
      ...input,
      genres: arr,
    });
  };

  const handlePlatformRemove = (e) => {
    let arr = input.platforms.filter((p) => p !== e.target.id);
    setLocalPlatforms([...localPlatforms, e.target.id]);
    setInput({
      ...input,
      platforms: arr,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(input));
    setInput({
      name: "",
      description: "",
      released: "",
      rating: 0,
      genres: [],
      platforms: [],
      image: "",
    });
    alert("Juego creado con exito!");
    history.push("/home");
  };

  return (
    <div className="formWrapper">
      <div className="formHome">
      <Link to="/home" className="formLink">Home</Link>
      </div>
      <form onSubmit={handleOnSubmit} className="formCreate">
      <h2>Create a new Game!</h2>
        <div className="formName">
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
          <div className="formDescription">
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

        {input.name && input.description ? (
          <div className="formImage">
            <label htmlFor="image">Cover Image</label>
            <input
              type="url"
              name="image"
              id="image"
              onChange={handleInputChange}
              value={input.image}
            />
            {errors.image && <p>{errors.image}</p>}
            {!errors.image ? (
              errors.invalidImage && <p>{errors.invalidImage}</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}

        {input.name &&
        input.description &&
        input.image &&
        !errors.invalidImage ? (
          <div className="formReleased">
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

        {input.name &&
        input.description &&
        input.image &&
        !errors.invalidImage &&
        input.released ? (
          <div className="formRating">
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
            {errors.rating && <p>{errors.rating}</p>}
          </div>
        ) : (
          <></>
        )}

        {input.name &&
        input.description &&
        input.image &&
        !errors.invalidImage &&
        input.released &&
        input.rating ? (
          <>
            <div className="genresPlatforms">
              <div className="formGenres">
                <label htmlFor="genres">Genres</label>
                <select
                  name="genres"
                  id="genres"
                  className="genre"
                  onChange={handleGenreChange}
                >
                  <option value={input.genres}>Choose genres</option>
                  {localGenres.map((g) => (
                    <option key={g.name} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formPlatforms">
                <label htmlFor="platforms">Platforms</label>
                <select
                  name="platforms"
                  id="platforms"
                  className="platform"
                  onChange={handlePlatformChange}
                >
                  <option value={input.platforms}>Choose platforms</option>
                  {localPlatforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="genresPlatformsButtons">
              <div className="genres">
                {input.genres ? (
                  input.genres.map((g) => (
                    <div className="formIndividualGenPlat">
                      <p key={g}>{g}</p>
                      <input
                        type="button"
                        value="X"
                        id={g}
                        onClick={handleGenreRemove}
                        className="genresButton"
                      />
                    </div>
                  ))
                ) : (
                  <p>{errors.genres}</p>
                )}
              </div>

              <div className="platforms">
                {input.platforms ? (
                  input.platforms.map((p) => (
                    <div className="formIndividualGenPlat">
                      <p key={p}>{p}</p>
                      <input
                        type="button"
                        value="X"
                        id={p}
                        onClick={handlePlatformRemove}
                        className="platformsButton"
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            {input.genres.length && input.platforms.length ? (
                <input type="submit" value="Create" className="formSubmit"/>
              ) : (
                <>
                  {!input.genres.length ? (
                    errors.genres && <p>{errors.genres}</p>
                  ) : (
                    <></>
                  )}
                  {!input.platforms.length ? (
                    errors.platforms && <p>{errors.platforms}</p>
                  ) : (
                    <></>
                  )}
                </>
              )}
          </>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
