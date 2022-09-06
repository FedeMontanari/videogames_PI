import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";

const GameCard = (props) => {

  return (
    <Link
      to={`/videogame/${props.id}`}
      className="container"
    >
      <img src={props.image} alt="Videogame portrait" />
      <p>Name: {props.name}</p>
      <p>Genre: {props.genre.map((e) => `${e.name} `)}</p>
    </Link>
  );
};

export default GameCard;
