import React, { useState } from "react";
import {Button, Form } from "react-bootstrap";
import axios from "axios";
import Api from "../../Api";
const Search = ({setSearchResults}) => {
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false); 

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true); // Set searching state
        try {
          const response = await axios.get(`${Api}/book/all`);
         
            response.data.filter((title) => {
                console.log('title : ' + title.title)
                if (title.title.toLowerCase().includes(search.toLowerCase())) {
                    setSearchResults((prevResults) => [...prevResults, title]);
                    }
            })
       
        } catch (error) {
          console.error(error);
        }
        setIsSearching(false); // Set searching state back to false
      };
  return (
    <div>
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

 
    </div>
  )
}

export default Search