const db = require("../models");
const fetch = require("node-fetch");
const apikey = process.env.API_KEY;

// Defining methods for the booksController
module.exports = {
  getGoogleBooks: function (req, res) {
    fetch("https://www.googleapis.com/books/v1/volumes?q=title:"
      + req.title + "&printType=books&key=" + apikey +
      "&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks(thumbnail)))")
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
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
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
