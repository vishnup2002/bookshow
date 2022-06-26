import React, { Component } from "react";
import { auth } from "../Services/firebase";

import defaultUserIcon from "../Static/defaultUserIcon.jpg";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { delUser, setUser } from "../Actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  signIn = () => {
    const provider = new GoogleAuthProvider();
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoggingIn: true,
      };
    });
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        //signout successful
        this.setState({
          isLoggedIn: false,
          user: {
            name: null,
            photourl: null,
          },
        });
        this.props.dispatch(delUser());
      })
      .catch((error) => {
        //error
        console.log(error);
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: null,
        photourl: null,
      },
      isLoggedIn: false,
      isLoggingIn: false,
    };
  }

  componentDidMount() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        this.props.dispatch(setUser(user));

        this.setState({
          ...this.state,
          user: {
            name: user.displayName,
            photourl: user.photoURL,
          },
          isLoggedIn: true,
          isLoggingIn: false,
        });
      } else {
        // No user is signed in.

        getRedirectResult(auth)
          .then((result) => {
            if (result) {
              const user = result.user;

              if (user) {
                this.props.dispatch(setUser(user));
                this.setState({
                  ...this.state,
                  user: {
                    name: user.displayName,
                    photourl: user.photoURL,
                  },
                  isLoggedIn: true,
                  isLoggingIn: false,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              B0okSh0W
            </Link>

            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                style={{ "--bs-scroll-height": "100px" }}
              >
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Current
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li>
                      <span className="dropdown-item">Current</span>
                    </li>
                    <li>
                      <span className="dropdown-item">Upcoming</span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span className="dropdown-item">Past</span>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex w-100 me-5">
                <input
                  className="form-control me-2 w-80 bg-dark border-top-0 border-start-0 border-end-0 border-primary text-muted"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div className="position-relative">
              <div className="py-2" type="button">
                <span
                  className="navbar-toggler-icon navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarScroll"
                  aria-controls="navbarScroll"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                ></span>
                <li className="nav-item dropdown d-inline">
                  <ul className="d-inline">
                    <li
                      className="nav-link dropdown-toggle d-inline"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="navbar-brand">
                        <img
                          src={
                            this.state.user.photourl
                              ? this.state.user.photourl
                              : defaultUserIcon
                          }
                          alt=""
                          width="50"
                          height="40"
                          className={
                            "rounded-circle " +
                            (this.state.isLoggingIn ? "logging-in" : "")
                          }
                        />
                      </span>
                    </li>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li>
                        {this.state.isLoggedIn ? (
                          <button
                            onClick={this.logOut}
                            className="dropdown-item"
                          >
                            SignOut
                          </button>
                        ) : (
                          <button
                            onClick={this.signIn}
                            className="dropdown-item"
                          >
                            SignIn / SignUp
                          </button>
                        )}
                      </li>
                    </ul>
                  </ul>
                </li>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Navbar);
