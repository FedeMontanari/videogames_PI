import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getGameById, setLoading } from "../../redux/actions";

export class GameDetail extends Component {
  async componentDidMount() {
    this.props.getGameById(this.props.match.params.gameId);
  }

  componentDidUpdate() {
    if (this.props.game !== undefined) {
      this.props.setLoading(false);
    }
  }

  render() {
    if (this.props.loading && !this.props.game.name) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          <Link to="/home">Home</Link>
          <img src={this.props.game.image} alt="" />
          <h2>{this.props.game.name}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: this.props.game.description }}
          />
          <h4>Rating: </h4>
          <p>{this.props.game.rating} / 5</p>
          <h4>Release date: </h4>
          <p>{this.props.game.released}</p>
          <h4>Platforms: </h4>
          {this.props.game.platforms.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
          <h4>Genres: </h4>
          {this.props.game.genres.map((g) => (
            <p key={g.id}>{g.name}</p>
          ))}
        </>
      );
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    game: state.game,
    loading: state.loading,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getGameById: (id) => dispatch(getGameById(id)),
    setLoading: (bool) => dispatch(setLoading(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
