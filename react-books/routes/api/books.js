const router = require("express").Router();
const booksController = require("../../controllers/booksController");

router.route("/googleBooks/:bookTitle")
  .get(booksController.getGoogleBooks)

  router.route("/googleBooks/:bookID")
  .get(booksController.getOneGoogleBook)

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
.post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .delete(booksController.remove);

module.exports = router;
