const db = require("../models");
const fetch = require("node-fetch");
const apikey = process.env.API_KEY;

// Defining methods for the booksController
module.exports = {
  getGoogleBooks: function (req, res) {
      console.log("req: ", req)
      console.log("req.params.bookTitle: ", req.params.bookTitle)
      fetch("https://www.googleapis.com/books/v1/volumes?q=title:"
      + req.params.bookTitle + "&printType=books&key=" + apikey +
      "&fields=items(selfLink,id,volumeInfo(title,authors,description,imageLinks(thumbnail)))")
      .then(response => {
        return response.json()
      }).then(data => {
        res.json(data)
      }).catch(err => {
        res.json(err)
      });
  },
  getOneGoogleBook: function (req, res) {
    console.log("req: ", req)
    console.log("req.params.bookid: ", req.params.bookID)
    fetch("https://www.googleapis.com/books/v1/volumes?q=id:"
    + req.params.bookID + "&printType=books&key=" + apikey +
    "&fields=items(selfLink,id,volumeInfo(title,authors,description,imageLinks(thumbnail)))")
    .then(response => {
      return response.json()
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    });
  },
  findAll: function (req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
