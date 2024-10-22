import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Api from '../../Api';

const UserReviews = ({ token }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;  // Set 4 items per page


  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${Api}/book/userreviews/${userId}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${Api}/book/deletereview/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
          }
    })
    setReviews(reviews.filter(review => review._id !== id))
    toast.success('Review deleted successfully')
    } catch (error) {
      console.error(error);
  }
}
  // Calculate the reviews for the current page
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <>
      <Container style={{ width: '75%' }}>
        <h1>My Book Reviews</h1>
        <Row className="g-3">
          {currentReviews.map((review) => (
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
                      <Button variant="danger" onClick={() => handleDelete(review._id)}>Delete</Button>
                    
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Component */}
        <Pagination className="mt-4">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </Container>
    </>
  );
};

export default UserReviews;
