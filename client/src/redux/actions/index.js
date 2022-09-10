const axios = require("axios");
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const CREATE_GAME = "CREATE_GAME";
export const DELETE_GAME = "DELETE_GAME";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_LOADING = "SET_LOADING";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const SEARCH_GAME = "SEARCH_GAME";
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS";

export const getAllGames = () => (dispatch) => {
  return fetch("http://localhost:3001/videogames")
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: GET_ALL_GAMES,
        payload: data,
      })
    );
};

export const getAllGenres = () => (dispatch) => {
  return fetch("http://localhost:3001/genres")
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: GET_ALL_GENRES,
        payload: data,
      })
    );
};

export const getGameById = (id) => (dispatch) => {
  return fetch(`http://localhost:3001/videogame/${id}`)
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: GET_GAME_BY_ID,
        payload: data,
      })
    );
};

export const deleteGame = (id) => {
  return {
    type: DELETE_GAME,
    payload: id,
  };
};

export const createGame = (data) => {
  fetch("http://localhost:3001/videogames", {
    method: "POST",
    body: data,
  })
};

export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
};

export const filterByGenre = (payload) => {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
};

export const searchGame = (payload) => {
  return {
    type: SEARCH_GAME,
    payload,
  };
};

export const getAllPlatforms = (payload) => {
  return {
    type: GET_ALL_PLATFORMS,
    payload,
  };
};
