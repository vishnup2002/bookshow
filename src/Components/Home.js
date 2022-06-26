import React, { Component } from "react";
import DemoCarousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ShowsList from "./ShowsList";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="cards-container">
        <DemoCarousel />
        <div id="trending-shows">
          <h1 className="p-5 cards-container-heading">Trending Shows</h1>
          <ShowsList />
        </div>
      </div>
    );
  }
}

export default connect(() => {
  return {};
})(Home);
// ReactDOM.render(<DemoCarousel />, document.querySelector(".demo-carousel"));
