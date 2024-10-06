import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Container, Button,   } from "react-bootstrap";
import Api from '../../Api'

const GetBookById = () => {
    const [book, setBook] = useState({})
    const { id } = useParams()
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${Api}/book/bookbyid/${id}`)
                setBook(response.data)
                } catch (error) {
                    console.error(error)
                    }
        }
        fetchBook()
    }, [])
  return (
    <>
 
    <Container className="w-50">
    <h1>Review Details</h1>
    <Link to='/'>
      <Button className="mb-3">Back</Button>
    </Link>
        <h2>Title: {book.title}</h2>
        <h4>Author: {book.author}</h4>
        <p>Rating: {book.rating}</p>
        <p>Review: {book.reviewText}</p>

    </Container>
   
    </>
  )
}

export default GetBookById
