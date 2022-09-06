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
  SEARCH_GAME
} from "../actions";

const initialState = {
  games: [],
  game: {},
  genres: [],
  currentPage: 1,
  loading: false,
  orderByName: '',
  orderByRating: '',
  genreFilter: '',
  filteredGames: [],
  findGames: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
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
        games: [...state.games, action.payload],
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
        }

    case ORDER_BY_NAME:
      return {
        ...state,
        orderByName: action.payload,
      }

    case ORDER_BY_RATING:
      return {
        ...state,
        orderByRating: action.payload,
      }

    case FILTER_BY_GENRE:
      return {
        ...state,
        filteredGames: state.games.filter((g) => g.genre.find((e) => e.name === action.payload)),
      }

    case SEARCH_GAME:
      return {
        ...state,
        findGames: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
