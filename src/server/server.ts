/**
 * Entry point for the Express server.
 */

import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import MongoStore from "connect-mongo";
import championRoutes from "./routes/championRoutes.js";
import authRouter from "./routes/authRoutes.js";


// CONNECT TO MONGODB
mongoose
.connect(process.env.MONGO_URI, {
  dbName: "loldoku",
} as ConnectOptions)
.then(() => console.log("Connected to Mongo DB."))
.catch((err) => console.log(err));

// EXPRESS CONFIGURATION, CORS, AND PARSE MIDDLEWAR
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies to be sent
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: "process.env.SESSION_SECRET", // used to sign session ID cookie
		resave: false,  // session will not be resaved if not modified
		saveUninitialized: false, // session will not be saved to store if not modified
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // session data stored in MongoDB
		cookie: { secure: 'auto' }, // cookie will be marked as secure (sent over HTTPS) if request is also secure, otherwise it will not be marked as secure (sent over HTTP
	})
);

// ROUTERS
app.use("/api", championRoutes);
app.use("/auth", authRouter);


// UNKNOWN ROUTE HANDLER
// !Todo: Create custom 404 page and serve
app.use((_req: Request, res: Response) =>
	res.status(404).send("404: Page not found UNKNOWN ROUTE HANDLER")
);

// GLOBAL ERROR HANDLER
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

// SERVER START
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
