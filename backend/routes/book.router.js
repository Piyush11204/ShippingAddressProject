import { Router } from "express";
import {
	getAllBooks,
	createBook,
	searchBooks,
	updateBook,
	deleteBook,
	buyBook,
	getUsersWhoPurchasedBook,
    allBooksPurchased,
} from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks); // Get all books
router.post("/", createBook); // Add a new book
router.get("/search/:title", searchBooks); // Search for a book by title
router.put("/:id", updateBook); // Update a book
router.delete("/:id", deleteBook); // Delete a book
router.post("/buy", buyBook);
router.get("/:bookId/purchases", getUsersWhoPurchasedBook);
router.get("/purchases", allBooksPurchased); // Show all books and who purchased them


export default router;
