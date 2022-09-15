import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createdGame, setLoading, setDbGame } from "../../redux/actions";
import vgportrait from "../../assets/vgportrait.jpg"

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
      <img src={props.game.image? props.game.image : {vgportrait}} alt="Videogame portrait" className="cardImage"/>
      <p className="pTitle">Name: </p> <p className="pContent">{props.game.name}</p>
      <p className="pTitle">Genre: </p> <p className="pContent">{props.game.genres.map((e) => `● ${e.name} `)}</p>
    </Link>
  );
};

export default GameCard;
