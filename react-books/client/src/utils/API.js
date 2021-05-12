import axios from "axios";

const key = process.env.KEY;
const q = query;
// partial response used for performance

export default {
  searchBooks: function() {
    return axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=" + q + "&printType=books&key=" + key + 
      "&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks(thumbnail)))");
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
