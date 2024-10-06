import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../Api";

const NewBookReviewForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    reviewText: "",
    rating: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Api}/book/newbook`, book, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem('token'),
        },
      });
      toast.success("Review submitted successfully", {
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting review", {
        autoClose: 2000,
      })
    }
  };

  return (
    <>
      <Container  className="d-flex justify-content-center align-items-center">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>New Book Review</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.title}
                      onChange={(e) =>
                        setBook({ ...book, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.author}
                      onChange={(e) =>
                        setBook({ ...book, author: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.reviewText}
                      onChange={(e) =>
                        setBook({ ...book, reviewText: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                    type="number"
                    min={1}
                    max={5}
                    value={book.rating}
                    onChange={(e) =>
                      setBook({ ...book, rating: e.target.value })}
                      />
                  </Form.Group>
                  <Button
                     variant="primary"
                     type="submit"
                     className="mx-auto w-100 m-3"
                  >Submit Review</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </>
  );
};

export default NewBookReviewForm;
