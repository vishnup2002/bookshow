import { connect } from "react-redux";
import { BrowserRouter, Route, Router, Routes, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";

function App(props) {
  // console.log(props);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
