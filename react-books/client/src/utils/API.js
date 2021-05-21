import axios from "axios";
// partial response used for performance

export default {
  getGoogleBooks: function (title) {
    console.log(title)
    return axios.get("/api/books/googleBooks/" + title)
  },
  getOneGoogleBook: function (id) {
    console.log(id)
    return axios.get("/api/books/googleBooks/" + id)
  },
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
