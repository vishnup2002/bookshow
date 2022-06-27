import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class DemoCarousel extends Component {
  render() {
    const { movies } = this.props;
    return (
      <Carousel
        autoPlay="true"
        // dynamicHeight="true"
        interval={5000}
        infiniteLoop={true}
        showThumbs={false}
      >
        {movies &&
          movies.map((movie, i) => (
            <div key={i}>
              <img src={movie.backdropURLs[1280]} alt="movie-img" />
              <p className="legend">{movie.title}</p>
            </div>
          ))}
      </Carousel>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

export default connect(mapStateToProps)(DemoCarousel);
