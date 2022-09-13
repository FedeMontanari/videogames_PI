import {
  GET_ALL_GAMES,
  GET_GAME_BY_ID,
  GET_ALL_GENRES,
  CREATE_GAME,
  DELETE_GAME,
  SET_CURRENT_PAGE,
  SET_LOADING,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  FILTER_BY_GENRE,
  SEARCH_GAME,
  GET_ALL_PLATFORMS,
  SWITCH_DATA,
  CREATED_GAME,
  SET_DB_GAME,
  SET_ACTUAL_GAMES,
} from "../actions";

const initialState = {
  games: [],
  dbGames: [],
  apiGames: [],
  game: {},
  genres: [],
  currentPage: 1,
  loading: false,
  orderByName: "",
  orderByRating: "",
  genreFilter: "",
  filteredGames: [],
  findGames: "",
  platforms: [],
  data: "api",
  created: false,
  actualGames: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
        apiGames: action.payload.filter((g) => g.created === false),
        dbGames: action.payload.filter((g) => g.created === true)
      };

    case GET_GAME_BY_ID:
      return {
        ...state,
        game: action.payload,
      };

    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case CREATE_GAME:
      return {
        ...state,
        dbGames: [...state.dbGames, action.payload]
      };

    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload),
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ORDER_BY_NAME:
      return {
        ...state,
        orderByName: action.payload,
      };

    case ORDER_BY_RATING:
      return {
        ...state,
        orderByRating: action.payload,
      };

    case FILTER_BY_GENRE:
      return {
        ...state,
        filteredGames: state.actualGames.filter((g) => g.genres.find((e) => e.name === action.payload)),
      };

    case SEARCH_GAME:
      return {
        ...state,
        findGames: action.payload,
      };

    case GET_ALL_PLATFORMS:
      const allPlatforms = state.apiGames.map((c) =>
        c.platforms.map((p) => p.platform)
      );
      const platforms = [...new Set(allPlatforms.flat())];
      return {
        ...state,
        platforms: platforms,
      };

    case SWITCH_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case CREATED_GAME:
      return {
        ...state,
        created: action.payload,
      };

    case SET_DB_GAME:
      return {
        ...state,
        game: action.payload,
      };

    case SET_ACTUAL_GAMES:
      return {
        ...state,
        actualGames: action.payload,
      }

    default:
      return state;
  }
};

export default rootReducer;
