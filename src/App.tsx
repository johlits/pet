import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {
  MDBContainer,
  MDBFooter,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavbarToggler,
} from "mdbreact";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import logo from "./petpaw.png";

import PetContainer from "./components/PetContainer";
import About from "./components/About";

interface AppProps {}

type AppState = { collapse: any };

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.navbarToggle = this.navbarToggle.bind(this);
  }

  navbarToggle() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
              <Navbar.Brand>
                <MDBNavLink exact to="/">
                  <img src={logo} alt="Logo" />
                </MDBNavLink>
              </Navbar.Brand>
              <MDBNavbarNav right>
                <MDBNavbarToggler onClick={this.navbarToggle} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavItem>
                    <MDBNavLink exact to="/">
                      Home
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink exact to="/about">
                      About
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBCollapse>
              </MDBNavbarNav>
            </Navbar>
          </header>
          <main role="main" className="flex-shrink-0">
            <Route exact path="/" component={PetContainer} />
            <Route path="/about" component={About} />
            <Route path="/pet/:pet_id" component={PetContainer} />
          </main>
          <footer className="footer mt-auto py-3 text-white fixed-bottom">
            <MDBFooter color="blue" className="font-small">
              <div className="footer-copyright text-center py-1">
                <MDBContainer fluid>
                  &copy; {new Date().getFullYear()}
                </MDBContainer>
              </div>
            </MDBFooter>
          </footer>
        </Router>
      </div>
    );
  }
}

export default App;
