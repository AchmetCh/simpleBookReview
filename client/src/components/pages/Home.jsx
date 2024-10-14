// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Card, Button, Row, Col, Pagination } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import Api from "../../Api";

// const Home = () => {
//   const [reviews, setReviews] = useState([]);
//   useEffect(() => {
//     axios.get(`${Api}/book/all`).then((response) => {
//       setReviews(response.data);
//       console.log(response.data);
//     });
//   }, []);

//   return (
//     <>
//        <Container style={{ width: '75%' }}>
//         <h1>Book Reviews</h1>
//         <Row className="g-3">
//           {reviews.map((review) => (
//             <Col key={review._id} xs={12} sm={6} md={4} lg={3}>
//               <Card className="h-100">
//                 <Card.Img variant="top" src={review.image} />
//                 <Card.Body className="d-flex flex-column h-100">
//                   <Card.Title className="fw-bold">Title: {review.title}</Card.Title>
//                   <Card.Text>Author: {review.author}</Card.Text>
//                   <Card.Text
//                     className={review.rating === 5 ? "text-success" : "text-danger"}
//                   >
//                     Rating: {review.rating}
//                   </Card.Text>
//                   <Card.Text
//                     style={{
//                       textOverflow: "ellipsis",
//                       overflow: "hidden",
//                       whiteSpace: "nowrap",
//                       maxWidth: "150px",
//                     }}
//                   >
//                     Review: {review.reviewText}
//                   </Card.Text>
//                   <div className="mt-auto">
//                     <Link to={`/book/bookbyid/${review._id}`}>
//                       <Button variant="primary">Read More</Button>
//                     </Link>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Api from "../../Api";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    axios.get(`${Api}/book/all`).then((response) => {
      setReviews(response.data);
      console.log(response.data);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container style={{ width: '75%' }}>
        <h1>Book Reviews</h1>
        <Row className="g-3">
          {currentItems.map((review) => (
            <Col key={review._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100">
                <Card.Img variant="top" src={review.image} />
                <Card.Body className="d-flex flex-column h-100">
                  <Card.Title className="fw-bold">Title: {review.title}</Card.Title>
                  <Card.Text>Author: {review.author}</Card.Text>
                  <Card.Text
                    className={review.rating === 5 ? "text-success" : "text-danger"}
                  >
                    Rating: {review.rating}
                  </Card.Text>
                  <Card.Text
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    Review: {review.reviewText}
                  </Card.Text>
                  <div className="mt-auto">
                    <Link to={`/book/bookbyid/${review._id}`}>
                      <Button variant="primary">Read More</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination>
          {[...Array(Math.ceil(reviews.length / itemsPerPage))].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
};

export default Home;