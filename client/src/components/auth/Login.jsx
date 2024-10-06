import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const response = await axios.post(`${Api}/user/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfull", {
        position: "top-right",
        autoClose: 2000,
        onClose: () =>  window.location.href = '/'
      });
      
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
    }
  };
  return (
    <>
      <div>
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <Card className="p-4" style={{ width: "400px" }}>
            <h2>Login</h2>

            <Form onSubmit={handlSubmit} className="mx-auto mx-3">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mx-auto w-100 m-3"
              >
                Login
              </Button>
            </Form>
          </Card>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
