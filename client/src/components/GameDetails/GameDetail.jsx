import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getGameById, setLoading } from "../../redux/actions";
import "./GameDetail.css";

export class GameDetail extends Component {
  componentDidMount() {
    if (!this.props.created) {
      this.props.getGameById(this.props.match.params.gameId);
    }
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
        <div className="detailWrapper">
          <div className="detailHome">
            <Link to="/home" className="detailLink">
              Home
            </Link>
          </div>
          <div className="detailContainer">
            <img
              src={this.props.game.image}
              alt="Game portrait"
              className="detailImage"
            />
            <h2 className="detailTitle">{this.props.game.name}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: this.props.game.description }}
              className="detailDesc"
            />
            <div className="detailInfo">
              <div className="detailRateRelease">
                <h4>Rating: </h4>
                <p>{this.props.game.rating} / 5</p>
                <h4>Release date: </h4>
                <p>{this.props.game.released}</p>
              </div>
              <div className="detailPlat">
                <h4>Platforms: </h4>
                {this.props.game.platforms?.map((p) => (
                  <p key={p.id}>{p.name}</p>
                ))}
              </div>
              <div className="detailGen">
                <h4>Genres: </h4>
                {this.props.game.genres?.map((g) => (
                  <p key={g.id}>{g.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    game: state.game,
    loading: state.loading,
    created: state.created,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getGameById: (id) => dispatch(getGameById(id)),
    setLoading: (bool) => dispatch(setLoading(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
