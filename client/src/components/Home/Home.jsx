import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  getAllGames,
  searchGame,
  setActualGames,
  setCurrentPage,
  setLoading,
} from "../../redux/actions";
import { Pagination } from "../Pagination/Pagination";
import GameCard from "../GameCard/GameCard";
import Nav from "../Nav/Nav";
import "./Home.css";

const Home = () => {
  const games = useSelector((state) => state.games);
  const gamesApi = useSelector((state) => state.apiGames);
  const gamesDb = useSelector((state) => state.dbGames);
  const actualGames = useSelector((state) => state.actualGames);

  const selector = useSelector((state) => state.data);

  const filteredGames = useSelector((state) => state.filteredGames);
  const searchGames = useSelector((state) => state.findGames);
  const currentPage = useSelector((state) => state.currentPage);

  const loading = useSelector((state) => state.loading);

  const [gamesPerPage] = useState(15);

  const byName = useSelector((state) => state.orderByName);
  const byRating = useSelector((state) => state.orderByRating);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllGames());
    dispatch(searchGame(''))
  }, [dispatch]);

  if (games.length && loading) {
    dispatch(setLoading(false));
  }


  switch (selector) {
    case "api":
      dispatch(setActualGames(gamesApi));
      break;

    case "db":
      if (!gamesDb.length) {
        dispatch(setActualGames(gamesApi));
        break;
      } else {
        dispatch(setActualGames(gamesDb));
        break;
      }

    case "both":
      if (!gamesDb.length) {
        dispatch(setActualGames(gamesApi));
        break;
      } else {
        dispatch(setActualGames(games));
      }
    default:
      if (!gamesDb.length) {
        dispatch(setActualGames(gamesApi));
        break;
      } else {
        dispatch(setActualGames(games));
      }
      break;
  }

  ///////////////////////////Pagination logic///////////////////////////

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  let currentGames = actualGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (e) => {
    dispatch(setCurrentPage(Number(e.target.id)));
  };

  /////////////////////////////////////////////////////////////////////

  ///////////////////////////Filtering logic///////////////////////////

  const nameSort = () => {
    if (byName.startsWith("asc") && filteredGames.length) {
      filteredGames.sort((a, b) => {
        let ga = a.name.toLowerCase();
        let gb = b.name.toLowerCase();
        if (ga < gb) {
          return -1;
        }
        if (ga > gb) {
          return 1;
        }
        return 0;
      });
    }

    if (byName.startsWith("asc")) {
      actualGames.sort((a, b) => {
        let ga = a.name.toLowerCase();
        let gb = b.name.toLowerCase();
        if (ga < gb) {
          return -1;
        }
        if (ga > gb) {
          return 1;
        }
        return 0;
      });
    }

    if (byName.startsWith("desc") && filteredGames.length) {
      filteredGames.sort((a, b) => {
        let ga = a.name.toLowerCase();
        let gb = b.name.toLowerCase();
        if (ga > gb) {
          return -1;
        }
        if (ga < gb) {
          return 1;
        }
        return 0;
      });
    }

    if (byName.startsWith("desc")) {
      actualGames.sort((a, b) => {
        let ga = a.name.toLowerCase();
        let gb = b.name.toLowerCase();
        if (ga > gb) {
          return -1;
        }
        if (ga < gb) {
          return 1;
        }
        return 0;
      });
    }
  };

  nameSort();

  const rateSort = () => {
    if (byRating.startsWith("asc") && filteredGames.length) {
      filteredGames.sort((a, b) => {
        return a.rating - b.rating;
      });
    }

    if (byRating.startsWith("asc")) {
      actualGames.sort((a, b) => {
        return a.rating - b.rating;
      });
    }

    if (byRating.startsWith("desc") && filteredGames.length) {
      filteredGames.sort((a, b) => {
        return b.rating - a.rating;
      });
    }

    if (byRating.startsWith("desc")) {
      actualGames.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
  };

  rateSort();

  const defaultSort = () => {
    if (!byRating && !byName && filteredGames.length){
      filteredGames.sort((a, b) => {
        return b.order - a.order
      })
    }
    if (!byRating && !byName) {
      actualGames.sort((a, b) => {
        return b.order - a.order;
      });
    }
  }

  defaultSort()

  if (filteredGames.length) {
    currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  }

  if (searchGames.length) {
    dispatch(setCurrentPage(1));
    currentGames = actualGames
      .filter((e) => e.name.toLowerCase().includes(searchGames.toLowerCase()))
      .slice(indexOfFirstGame, indexOfLastGame);
  }

  /////////////////////////////////////////////////////////////////////

  return (
    <div className="home">
      <Nav />
      {searchGames ? (
        <></>
      ) : (
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={
            filteredGames.length ? filteredGames.length : actualGames.length
          }
          paginate={paginate}
        />
      )}
      <div className="cardContainer">
        {loading ? (
          <h3 className="loading">Loading...</h3>
        ) : (
          currentGames.map((g) => <GameCard game={g} />)
        )}
      </div>
      {searchGames ? (
        <></>
      ) : (
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={
            filteredGames.length ? filteredGames.length : actualGames.length
          }
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default Home;
