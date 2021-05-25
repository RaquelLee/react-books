import React, { useState } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import SaveBtn from "../components/SaveBtn";

function Search() {
  const [books, setBooks] = useState([])
  const [bookTitle, setBookTitle] = useState('')

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBookTitle({ ...bookTitle, [name]: value })
  };

  function handleBookSearch(e) {
    e.preventDefault();
    if (bookTitle) {
      API.getGoogleBooks(
        bookTitle.title)
        .then(res =>
          setBooks(res.data.items)
        ).catch(err => console.log(err));
    }
  };

  function setBookState(e) {
    const id = e.target.id;
    API.getOneGoogleBook(id)
      .then(res => {
        API.saveBook({
          link: res.data.items[0].selfLink,
          authors: res.data.items[0].volumeInfo.authors,
          description: res.data.items[0].volumeInfo.description,
          image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
          title: res.data.items[0].volumeInfo.title
        }).catch(err => console.log(err));
      })
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
                  {book.selfLink ? (
                    <Link to={book.selfLink}>

                      View {book.volumeInfo.title} by
                      {book.volumeInfo.authors}
                    </Link>
                  ) : <p>no link</p>}

                  {book.volumeInfo.imageLinks.thumbnail ? (
                    <img src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}></img>
                  ) : <p>no image</p>}
                  {book.volumeInfo.description ? (
                    <p>
                      {book.volumeInfo.description}
                    </p>
                  ) : <p>no description</p>}
                  {book.id ? (
                    <SaveBtn
                      id={book.id}
                      onClick={setBookState}
                    />
                  ) : <p>no id</p>}
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
