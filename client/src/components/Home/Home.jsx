import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import { Pagination } from "../Pagination/Pagination";
import GameCard from "../GameCard/GameCard";
import Nav from "../Nav/Nav";
import "./Home.css";

const Home = () => {
  const games = useSelector((state) => state.games);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber) 
    console.log()
};

  return (
    <div>
      <h1>Home</h1>
      <Nav />
      <div className="cardContainer">
        {
        // games.length ? 
        (
          currentGames.map((g) => (
            <GameCard name={g.name} id={g.id} image={g.image} genre={g.genre}/>
          ))
        ) 
        // : (
        //   <p>Loading...</p>
        // )
        }

        {/* <GameCard games={currentGames} loading={loading} /> */}
      </div>
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={games.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
