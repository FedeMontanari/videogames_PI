import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";

const GameCard = (props) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/videogame/${props.id}`}
      className="container"
      onClick={() => dispatch(setLoading(true))}
    >
      <img src={props.image} alt="Videogame portrait" />
      <p>Name: {props.name}</p>
      <p>Genre: {props.genre.map((e) => `${e.name} `)}</p>
    </Link>
  );
};

export default GameCard;
