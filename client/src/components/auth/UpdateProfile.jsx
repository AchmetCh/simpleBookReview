import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Api from "../../Api";

const UpdateProfile = ({ token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }
  const handUpdateProfile = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return; 
    }
    try {
      const response = await axios.put(
        `${Api}/update-profile/${userId}`,
        data,
        {
          headers: {
            "Authorization": token,
          },
        }
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
  return (
<>
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "80vh" }}
  >
    <Card className="p-4" style={{ width: "400px" }}>
      <h2 className="text-center mb-4">Update Profile</h2>
      <Form onSubmit={handUpdateProfile} className="mx-auto mx-3">
        <Form.Group controlId="formBasicUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mx-auto w-100 m-3">
          Register
        </Button>
      </Form>
    </Card>
  </Container>
  <ToastContainer />
</>
)
};

export default UpdateProfile;
