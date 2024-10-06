import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import Api from '../../Api'

const UserReviews = ({token}) => {
  const [reviews, setReviews] = useState([])
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }
  console.log(userId)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${Api}/book/userreviews/${userId}`,
          {
            headers: {
              'Authorization': localStorage.getItem('token')
              }
              }
        )
        setReviews(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchReviews()
  }, [])
  return (
    <>
        <Container style={{ width: '75%' }}>
        <h1>My Book Reviews</h1>
        <Row className="g-3"> 
          {reviews.map((review) => (
            <Col key={review._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100">
                <Card.Img variant="top" src={review.image} />
                <Card.Body className="d-flex flex-column h-100">
                  <Card.Title className="fw-bold">Title: {review.title}</Card.Title>
                  <Card.Text>Author: {review.author}</Card.Text>
                  <Card.Text className={review.rating === 5 ? "text-success" : "text-danger"}>
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
                  <div className="mt-auto">
                  <Link to={`/book/editreview/${review._id}`}>
                      <Button variant="success" className="m-2">Edit</Button>
                    </Link>
                    <Link to={`/book/bookbyid/${review._id}`}>
                    {console.log(review._id)}
                      <Button variant="danger">Delete</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserReviews