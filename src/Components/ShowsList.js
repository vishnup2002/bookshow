import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addMovies } from "../Actions/shows";
import Loader from "./Loader";
import jQuery from "jquery";

class ShowsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.movies,
      loading: true,
    };
  }

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c738b04556msh0a70587d7451789p1c492ejsn4f5566bc997d",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };

    if (jQuery.isEmptyObject(this.props.movies)) {
      fetch(
        "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.props.dispatch(addMovies(response.results));
          this.setState({
            movies: response.results,
            loading: false,
          });
        })
        .catch((err) => console.error(err));
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    const { movies, loading } = this.state;
    return (
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="d-flex flex-wrap justify-content-evenly">
            {movies &&
              movies.map((movie, i) => {
                return (
                  <div
                    className="card m-3 bg-dark"
                    style={{ width: "18rem" }}
                    key={i}
                  >
                    <div className="card-img-container card-img-top">
                      <img
                        src={movie.backdropURLs.original}
                        className="card-img-top"
                        alt="..."
                      />
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">
                        {movie.overview.substring(0, 100) + "..."}
                      </p>
                      {/* <a href={"/show/?i=" + i} className="btn btn-primary">
                    Show more..
                  </a> */}

                      <Link
                        to={{
                          pathname: "/show/" + i,
                          state: { movie },
                        }}
                        className="btn btn-success bg-dark"
                      >
                        Show more
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}
export default connect(mapStateToProps)(ShowsList);
