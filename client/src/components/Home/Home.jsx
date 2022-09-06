import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, setCurrentPage, setLoading } from "../../redux/actions";
import { Pagination } from "../Pagination/Pagination";
import GameCard from "../GameCard/GameCard";
import Nav from "../Nav/Nav";
import "./Home.css";

const Home = ({ homeRef }) => {

  const games = useSelector((state) => state.games);
  const filteredGames = useSelector((state) => state.filteredGames)
  const searchGames = useSelector((state) => state.findGames)
  const currentPage = useSelector((state) => state.currentPage);
  const loading = useSelector((state) => state.loading)
  const [gamesPerPage] = useState(15);

  const byName = useSelector((state) => state.orderByName);
  const byRating = useSelector((state) => state.orderByRating);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(getAllGames());
  }, [dispatch]);
  
  if(games.length){
    dispatch(setLoading(false))
  }

  /////////Pagination logic

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  let currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (e) => {
    dispatch(setCurrentPage(Number(e.target.id)));
  };

  

  ////////////////////////////////////////////////////////////////////////////////


  /////////Filtering logic

  if(byName.startsWith('asc')){
    games.sort((a, b) => {
      let ga = a.name.toLowerCase();
      let gb = b.name.toLowerCase();
      if(ga < gb){
        return -1;
      }
      if(ga > gb){
        return 1;
      }
      return 0
    })
  }else if(byName.startsWith('desc')){
    games.sort((a, b) => {
      let ga = a.name.toLowerCase();
      let gb = b.name.toLowerCase();
      if (ga > gb){
        return -1;
      }
      if(ga < gb){
        return 1
      }
      return 0
    })
  }

  if(byRating.startsWith('asc')){
    games.sort((a, b) => {
      return a.rating - b.rating;
    })
  }else if(byRating.startsWith('desc')){
    games.sort((a, b) => {
      return b.rating - a.rating;
    })
  }
  
  if(!byRating && !byName){
    games.sort((a, b) => {
      return b.order - a.order;
    })
  }

  if(filteredGames.length){
    currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame)
  }

  if(searchGames.length){
    currentGames = games.filter((e) => e.name.toLowerCase().includes(searchGames.toLowerCase())).slice(indexOfFirstGame, indexOfLastGame)
  }

  ////////////////////////////////////////////////////////////

  return (
    <div ref={homeRef}>
      <h1>Home</h1>
      <Nav />
      <div className="cardContainer">
        {
          loading ? (
            <h3>Loading...</h3>
          ) : (
            currentGames.map((g) => (
              <GameCard
                key={g.id}
                name={g.name}
                id={g.id}
                image={g.image}
                genre={g.genre}
              />
            ))
          )
        }
      </div>
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={games.length}
        paginate={paginate}
        // onClick={() => handleScroll(homeRef)}
      />
    </div>
  );
};

export default Home;
