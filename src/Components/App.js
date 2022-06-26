import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./loader.css";
import Desc from "./Desc";
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
          <Route path="/show/:id" element={<Desc />} />
        </Routes>

        {/* <Loader /> */}
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
