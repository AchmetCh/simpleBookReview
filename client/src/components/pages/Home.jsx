import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Api from "../../Api";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get(`${Api}/book/all`).then((response) => {
      setReviews(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      
      <Container className="w-100 border border-1 border-solid border-primary">
      <h1>Book Reviews</h1>
        <Row className="gx-2 gy-2">
          {reviews.map((review) => (
            <Col
              key={review._id}
              xs={12} sm={6} md={4} lg={3}
              
            >
              <Card style={{ width: "18rem" }} className='mr-5 p-3'>
                <Card.Img variant="top" src={review.image} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    TItle: {review.title}
                  </Card.Title>
                  <Card.Text>Author: {review.author}</Card.Text>
                  <Card.Text
                    className={
                      review.rating === 5 ? "text-success" : "text-danger"
                    }
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
                  <Link to={`/book/bookbyid/${review._id}`}>
                  <Button variant="primary">Read More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
