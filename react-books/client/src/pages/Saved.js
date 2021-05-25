import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// gets books from db
function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => setBooks(res.data)
      ).catch(err => console.log(err));
  };

  function deleteBook(e) {
    const id = e.target.id;
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6 sm-12">
          <h1>Your Saved Books</h1>
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
                  onClick={deleteBook}
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
//backend console logs show up in terminal
export default Books;
