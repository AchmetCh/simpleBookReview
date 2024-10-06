import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import GetBookById from "./components/book/GetBookById";
import Header from "./components/pages/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UpdateProfile from "./components/auth/UpdateProfile";
import UserReviews from "./components/book/UserReviews";
import NewBookReviewForm from "./components/book/NewBookReviewForm";
import EditUserReview from "./components/book/EditUserReviw";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <Header token={token} />
      {token ? (
        <>
          <Routes>
            <Route path="/book/userreviews/:userId" element={<UserReviews />} />
            <Route
              path="/user/update-profile/:userId"
              element={<UpdateProfile />}
            />
            <Route path="/book/newbook" element={<NewBookReviewForm />} />
            <Route
              path="/book/editreview/:reviewId" element={<EditUserReview />}
            />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
          </Routes>
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/bookbyid/:id" element={<GetBookById />} />
      </Routes>
    </>
  );
}

export default App;
