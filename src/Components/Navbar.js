import React, { Component } from "react";
import { auth } from "../Services/firebase";
// import { signIn } from "../Services/firebase";
import defaultUserIcon from "../Static/defaultUserIcon.jpg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setUser } from "../Actions/user";
import { connect } from "react-redux";

class Navbar extends Component {
  signIn = () => {
    const provider = new GoogleAuthProvider();

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
    };
  }

  componentDidMount() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        this.setState({
          ...this.state,
          user: {
            name: user.displayName,
            photourl: user.photoURL,
          },
          isLoggedIn: true,
        });
      } else {
        // No user is signed in.
        getRedirectResult(auth)
          .then((result) => {
            const user = result.user;
            if (user) {
              this.setState({
                ...this.state,
                user: {
                  name: user.displayName,
                  photourl: user.photoURL,
                },
                isLoggedIn: true,
              });
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              B0okSh0W
            </a>

            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                style={{ "--bs-scroll-height": "100px" }}
              >
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Current
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Current
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Upcoming
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Past
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex w-100 me-5">
                <input
                  className="form-control me-2 w-80"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
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
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <a className="navbar-brand" href="#">
                        <img
                          src={
                            this.state.user.photourl
                              ? this.state.user.photourl
                              : defaultUserIcon
                          }
                          alt=""
                          width="50"
                          height="40"
                          className="rounded-circle"
                        />
                      </a>
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
                            href="#"
                          >
                            SignOut
                          </button>
                        ) : (
                          <button
                            onClick={this.signIn}
                            className="dropdown-item"
                            href="#"
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
