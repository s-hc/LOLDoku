/**
 * Entry point for the Express server.
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import championRoutes from "./routes/championRoutes.js";

console.log("--> HELLO FROM SERVER.TS <--");

const app = express();

/**
 * Connect to MongoDB
 */
const MONGO_URI = "add_uri_here";
	
mongoose
	.connect(MONGO_URI, {
		dbName: "loldoku",
	} as ConnectOptions)
	.then(() => console.log("Connected to Mongo DB."))
	.catch((err) => console.log(err));

/**
 * - Middleware to parse incoming requests with JSON payloads and URL encoded payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Route middleware to handle API routes for champions
 */
app.use("/api", championRoutes);

/**
 * Unknown route handler
 * !Todo: Create custom 404 page and serve
 */
app.use((_req: Request, res: Response) =>
	res.status(404).send("404: Page not found UNKNOWN ROUTE HANDLER")
);

/**
 * Global error handler
 * @param {object} err - Error object
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} _next - Express next middleware function
 */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	const defaultErr = {
		log: "Express error handler caught unknown middleware error",
		status: 500,
		message: { err: "An error occurred" },
	};
	const errorObj = { ...defaultErr, ...err };
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// Start the server on specified port
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
