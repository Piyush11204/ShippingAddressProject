import express from "express";
import fs from "fs";

const router = express.Router();

// Read a file
router.get("/read", (req, res) => {
	const filePath = req.query.path;
    console.log(req.query.path)
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ content: data });
	});
});

// Write to a file
router.post("/write", (req, res) => {
	const { path, content } = req.body;
	fs.writeFile(path, content, (err) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ message: "File written successfully" });
	});
});

// Append to a file
router.post("/append", (req, res) => {
	const { path, content } = req.body;
	fs.appendFile(path, content, (err) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ message: "Content appended successfully" });
	});
});

// Delete a file
router.delete("/delete", (req, res) => {
	const filePath = req.query.path;
	fs.unlink(filePath, (err) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ message: "File deleted successfully" });
	});
});

// Create a directory
router.post("/createDir", (req, res) => {
	const { path } = req.body;
	fs.mkdir(path, { recursive: true }, (err) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ message: "Directory created successfully" });
	});
});

// Read a directory
router.get("/readDir", (req, res) => {
	const dirPath = req.query.path;
	fs.readdir(dirPath, (err, files) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ files });
	});
});

// Delete a directory
router.delete("/deleteDir", (req, res) => {
	const dirPath = req.query.path;
	fs.rmdir(dirPath, { recursive: true }, (err) => {
		if (err) return res.status(500).json({ message: err.message });
		res.json({ message: "Directory deleted successfully" });
	});
});

export default router;
