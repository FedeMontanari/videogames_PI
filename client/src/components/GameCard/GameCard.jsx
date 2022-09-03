import React, { useState } from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";

const GameCard = (props) => {

  const [loading, setLoading] = useState(false);

  if(!props.name){
    setLoading(true)
  }

  if (props.loading) {
    return <h2>Loading...</h2>;
  }
//   console.log(games)
  return (
    <Link
      to={`http://localhost:3001/videogame/${props.id}`}
      className="container"
    >
      <img src={props.image} alt="Videogame portrait" />
      <p>Name: {props.name}</p>
      <p>Genre: {props.genre.map((e) => `${e.name} `)}</p>
    </Link>
//     <>
//       {games.map((g) => (
//         <Link
//           to={`http://localhost:3001/videogame/${g.id}`}
//           className="container"
//         >
//           <img src={g.image} alt="Game portrait" />
//           <p>Name: {g.name}</p>
//           <p>Genre: {g.genre}</p>
//         </Link>
//       ))}
//     </>
  );
};

export default GameCard;
