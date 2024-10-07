import React, { useRef, useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Search from "./Search";
import "./style.css";
import Api from "../../Api";

const Header = ({ token }) => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate()
  const searchListRef = useRef(null);
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchListRef.current && !searchListRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [searchListRef]);

  searchResults.map((m) => console.log(m));
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      autoClose: 2000,
      onClose: () => (window.location.href = "/"),
    });
  };

  return (
    <Navbar bg="dark" expand="md" sticky="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <React.Fragment>
                <LinkContainer to={`/book/userreviews/${userId}`}>
                  <Nav.Link>My Reviews</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/book/newbook`}>
                  <Nav.Link>New Book Review</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
            <div className="searchBar">
              <Search setSearchResults={setSearchResults} />

              <div
                className="searchList"
                ref={searchListRef}
                style={{ display: searchResults.length < 1 ? "none" : "block" }}
              >
                {searchResults.map((result, index) => {
                  return (
                    <div key={index} 
                    className="searchListItems"
                    onClick={() => navigate(`/book/bookbyid/${result._id}`)}>
                      {result.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </Nav>

          {!token ? (
            <React.Fragment>
              <LinkContainer to="/user/login">
                <Button variant="outline-light" className="m-1">
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer to="/user/register">
                <Button variant="outline-light" className="m-1">
                  Register
                </Button>
              </LinkContainer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LinkContainer to={`/user/update-profile/${userId}`}>
                <Button variant="outline-danger" className="m-1">
                  Update Profile
                </Button>
              </LinkContainer>
              <Button
                variant="outline-light"
                className="m-1"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
  );
};

export default Header;
