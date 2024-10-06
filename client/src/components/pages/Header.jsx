import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = ({token}) => {
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }
const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/'
}
  return (
    <>
      <Navbar bg="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {token? (<>
              <LinkContainer to={`/book/userreviews/${userId}`}>
                <Nav.Link className="text-white">My Reviews</Nav.Link>
              </LinkContainer>
              
              </>):(<>
              
              </>)}
            </Nav>
          </Navbar.Collapse>
          {!token? (<>
          <LinkContainer to='/user/login' className='m-3'>
          <Button variant="outline-light">Login</Button>
          </LinkContainer>
          <LinkContainer to='/user/register'>
          <Button variant="outline-light">Register</Button>
          </LinkContainer>

          </>): (<>
            <LinkContainer to='/user/register'>
          <Button variant="outline-light"
          onClick={handleLogout}>Logout</Button>
          </LinkContainer>
          </>)}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
