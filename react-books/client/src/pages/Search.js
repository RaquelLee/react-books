import React, { useState } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Search() {
  const [books, setBooks] = useState([])
  const [bookTitle, setBookTitle] = useState('')
  const [savedBook, setSavedBook] = useState({})

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBookTitle({ ...bookTitle, [name]: value })
  };

  function handleBookSearch(e) {
    e.preventDefault();
    if (bookTitle) {
      API.getGoogleBooks(
        bookTitle.title)
        .then(res => setBooks(res.data))
        .catch(err => console.log(err));
    }
  };

  function setBookState(e) {
    const { id, value } = e.target;
    setSavedBook({ ...savedBook, [id]: value })
      .then(API.getOneGoogleBook(savedBook.id)
        .then(res => setSavedBook(res.data))
        .then(handleSave())
      )
  };

  function handleSave() {
    API.saveBook({
      title: savedBook.title,
      authors: [savedBook.authors],
      description: savedBook.description,
      image: savedBook.image,
      link: savedBook.link
    }).then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <h1>Google Books Search</h1>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
            />
            <FormBtn
              onClick={handleBookSearch}
            > Search Titles
              </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <h1>Matching books</h1>
          {books.length ? (
            <List>
              {books.map(book => (
                <ListItem key={book.id}>
                  <Link to={book.link}>
                    <strong>
                      View {book.title} by
                      {book.authors}
                    </strong>
                  </Link>
                  <img src={book.image}
                    alt={book.title}></img>
                  <button
                    id={book.id}
                    onClick={setBookState}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
