// import React, { useState } from "react";
// import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Api from "../../Api";

// const Header = ({ token }) => {
//   const [search, setSearch] = useState("");
//   let userId = null;
//   if (token) {
//     const decoded = jwtDecode(token);
//     userId = decoded.userId;
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`${Api}/book/search/${search}`);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Navbar bg="dark" expand="md" sticky="top" variant="dark">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           Home
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {token ? (
//               <>
//                 <LinkContainer to={`/book/userreviews/${userId}`}>
//                   <Nav.Link>My Reviews</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to={`/book/newbook`}>
//                   <Nav.Link>New Book Review</Nav.Link>
//                 </LinkContainer>
//                 <Form className="d-flex" onSubmit={handleSearch}>
//                   <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     value={search}
//                     className="me-2"
//                     aria-label="Search"
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                   <Button variant="outline-success"
//                   type="submit">Search</Button>
//                 </Form>
//               </>
//             ) : null}
//           </Nav>
//           {!token ? (
//             <>
//               <LinkContainer to="/user/login">
//                 <Button variant="outline-light" className="m-1">
//                   Login
//                 </Button>
//               </LinkContainer>
//               <LinkContainer to="/user/register">
//                 <Button variant="outline-light" className="m-1">
//                   Register
//                 </Button>
//               </LinkContainer>
//             </>
//           ) : (
//             <React.Fragment>
//               <LinkContainer to={`/user/update-profile/${userId}`}>
//                 <Button variant="outline-danger" className="m-1">
//                   Update Profile
//                 </Button>
//               </LinkContainer>
//               <Button
//                 variant="outline-light"
//                 className="m-1"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </Button>
//             </React.Fragment>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Api from "../../Api";

const Header = ({ token }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // State to indicate searching

  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true); // Set searching state
    try {
      const response = await axios.get(`${Api}/book/search/${search}`);
      setSearchResults(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
    setIsSearching(false); // Set searching state back to false
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
            {/* Search Form */}
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                value={search}
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Nav>

          {/* Display Search Results */}
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((result) => (
                <li key={result._id}>
                  <Link to={`/book/bookbyid/${result._id}`}>
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Loading indicator during search */}
          {isSearching && <p>Searching...</p>}

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
    </Navbar>
  );
};

export default Header;
