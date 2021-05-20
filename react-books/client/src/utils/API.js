import axios from "axios";
// partial response used for performance

export default {
  getGoogleBooks: function (title) {
    return axios.get("/api/books/googleBooks", title)
  },
  // getOneGoogleBook: function(id) {
  //   return axios.get(
  //     "https://www.googleapis.com/books/v1/volumes?q=id:" + id + "&printType=books&key=" + key + 
  //     "&fields=items(selfLink,id,volumeInfo(title,authors,description,imageLinks(thumbnail)))");
  // },
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
