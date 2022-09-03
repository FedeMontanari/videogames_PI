// const axios = require('axios')
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const GET_GAME_BY_ID = "GET_GAME_BY_ID"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const CREATE_GAME = "CREATE_GAME"
export const DELETE_GAME = "DELETE_GAME"


export const getAllGames = () => dispatch => {
    return fetch('http://localhost:3001/videogames')
    .then(res => res.json())
    .then(data => dispatch({
        type: GET_ALL_GAMES,
        payload: data
    }))
}

export const getAllGenres = () => dispatch => {
    return fetch('http://localhost:3001/genres')
    .then(res => res.json())
    .then(data => dispatch({
        type: GET_ALL_GENRES,
        payload: data
    }))
}

export const getGameById = (id) => dispatch => {
    return fetch(`http://localhost:3001/videogame/${id}`)
    .then(res => res.json())
    .then(data => dispatch({
        type: GET_GAME_BY_ID,
        payload: data
    }))
}

export const deleteGame = (id) => {
    return {
        type: DELETE_GAME,
        payload: id
    }
} 

export const createGame = (newGame) => {
    return {
        type: CREATE_GAME,
        payload: newGame
    }
}