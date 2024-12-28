import React, { useState } from "react";
import axios from "axios";

const FileManager = () => {
	const [filePath, setFilePath] = useState("");
	const [fileContent, setFileContent] = useState("");
	const [dirPath, setDirPath] = useState("");
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleFileOperation = async (operation) => {
		setErrorMessage(""); // Clear any previous error message

		try {
			let response;
			switch (operation) {
				case "read":
					response = await axios.get(
						`http://localhost:3000/api/files/read?path=${filePath}`
					);
					setFileContent(response.data.content);
					setMessage("File read successfully");
					break;
				case "write":
					response = await axios.post("http://localhost:3000/api/files/write", {
						path: filePath,
						content: fileContent,
					});
					setMessage(response.data.message);
					break;
				case "append":
					response = await axios.post("http://localhost:3000/api/files/append", {
						path: filePath,
						content: fileContent,
					});
					setMessage(response.data.message);
					break;
				case "delete":
					response = await axios.delete(
						`http://localhost:3000/api/files/delete?path=${filePath}`
					);
					setMessage(response.data.message);
					break;
				case "createDir":
					response = await axios.post("http://localhost:3000/api/files/createDir", {
						path: dirPath,
					});
					setMessage(response.data.message);
					break;
				case "readDir":
					response = await axios.get(
						`http://localhost:3000/api/files/readDir?path=${dirPath}`
					);
					setMessage(`Directory contents: ${response.data.files.join(", ")}`);
					break;
				case "deleteDir":
					response = await axios.delete(
						`http://localhost:3000/api/files/deleteDir?path=${dirPath}`
					);
					setMessage(response.data.message);
					break;
				default:
					setErrorMessage("Invalid operation");
			}
		} catch (error) {
			setErrorMessage(
				`Error: ${error.response?.data?.message || error.message}`
			);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">File Manager</h2>
				<div className="mb-4">
					<label htmlFor="filePath" className="block font-medium mb-2">
						File Path
					</label>
					<input
						type="text"
						id="filePath"
						className="border-gray-300 rounded-md p-2 w-full"
						value={filePath}
						onChange={(e) => setFilePath(e.target.value)}
					/>
					<div className="flex justify-between mt-2">
						<button
							onClick={() => handleFileOperation("read")}
							className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Read File
						</button>
						<button
							onClick={() => handleFileOperation("write")}
							className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Write File
						</button>
						<button
							onClick={() => handleFileOperation("append")}
							className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Append File
						</button>
						<button
							onClick={() => handleFileOperation("delete")}
							className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Delete File
						</button>
					</div>
				</div>
				<div className="mb-4">
					<label htmlFor="dirPath" className="block font-medium mb-2">
						Directory Path
					</label>
					<input
						type="text"
						id="dirPath"
						className="border-gray-300 rounded-md p-2 w-full"
						value={dirPath}
						onChange={(e) => setDirPath(e.target.value)}
					/>
					<div className="flex justify-between mt-2">
						<button
							onClick={() => handleFileOperation("createDir")}
							className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Create Directory
						</button>
						<button
							onClick={() => handleFileOperation("readDir")}
							className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Read Directory
						</button>
						<button
							onClick={() => handleFileOperation("deleteDir")}
							className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Delete Directory
						</button>
					</div>
				</div>
				<div className="mb-4">
					<label htmlFor="fileContent" className="block font-medium mb-2">
						File Content
					</label>
					<textarea
						id="fileContent"
						rows="4"
						className="border-gray-300 rounded-md p-2 w-full"
						value={fileContent}
						onChange={(e) => setFileContent(e.target.value)}
					/>
				</div>
				{message && (
					<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
						{message}
					</div>
				)}
				{errorMessage && (
					<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
};

export default FileManager;