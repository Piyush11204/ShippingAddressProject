import { Book } from "../models/Book.model.js";
import { User } from "../models/User.model.js";

// Get all books
export async function getAllBooks(req, res) {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// Create a new book
export async function createBook(req, res) {
	const { title, author, genre, publishedYear, copiesAvailable } = req.body;

	const book = new Book({
		title,
		author,
		genre,
		publishedYear,
		copiesAvailable,
	});

	try {
		const newBook = await book.save();
		res.status(201).json(newBook);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

// Search for books by title
export async function searchBooks(req, res) {
	const { title } = req.params;
	try {
		const books = await Book.find({ title: new RegExp(title, "i") });
		res.json(books);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// Update a book by ID
export async function updateBook(req, res) {
	const { id } = req.params;
	try {
		const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedBook);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

// Delete a book by ID
export async function deleteBook(req, res) {
	const { id } = req.params;
	try {
		await findByIdAndDelete(id);
		res.json({ message: "Book deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// BUY
export async function buyBook(req, res) {
    const { bookId, userId } = req.body;

    try {
        // Find the book
        const book = await Book.findById(bookId);

        if (!book || book.copiesAvailable <= 0) {
            return res.status(404).json({ message: "Book not available or out of stock" });
        }

        // Decrease the number of available copies
        book.copiesAvailable -= 1;
        await book.save();

        // Add the book to the user's purchased list
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.purchasedBooks.push({ bookId });
        await user.save();

        res.json({ message: "Book purchased successfully", book, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//who purchased which book
export async function getUsersWhoPurchasedBook(req, res) {
    const { bookId } = req.params;

    try {
        // Find users who have purchased this book
        const users = await User.find({ "purchasedBooks.bookId": bookId })
            .populate("purchasedBooks.bookId", "title author"); // Populate book details

        if (users.length === 0) {
            return res.status(404).json({ message: "No users have purchased this book" });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//all books purchased
export async function allBooksPurchased(req, res) {
    try {
        // Fetch all books
        const books = await Book.find();

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        // For each book, find users who have purchased it
        const result = await Promise.all(
            books.map(async (book) => {
                const users = await User.find({ "purchasedBooks.bookId": book._id })
                    .select("name email") // Fetch only user name and email
                    .lean(); // To return plain objects for easy manipulation

                return {
                    book: {
                        title: book.title,
                        author: book.author,
                        genre: book.genre,
                        publishedYear: book.publishedYear,
                    },
                    purchasedBy: users.length > 0 ? users : "No users have purchased this book",
                };
            })
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}