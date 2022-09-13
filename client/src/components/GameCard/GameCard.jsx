import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createdGame, setLoading, setDbGame } from "../../redux/actions";

const GameCard = (props) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/videogame/${props.game.id}`}
      className="container"
      onClick={() => {
        dispatch(setLoading(true));
        dispatch(setDbGame(props.game));
        dispatch(createdGame(props.game.created))
      }}
    >
      <img src={props.game.image} alt="Videogame portrait" />
      <p>Name: {props.game.name}</p>
      <p>Genre: {props.game.genres.map((e) => `${e.name} `)}</p>
    </Link>
  );
};

export default GameCard;
