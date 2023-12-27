/**
 * Entry point for the Express server.
 */

import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
// import passport from "passport";
import dotenv from "dotenv";
import championRoutes from "./routes/championRoutes.js";
import authRouter from "./routes/authRoutes.js";

console.log("--> HELLO FROM SERVER.TS <--");

const app = express();
dotenv.config();

/** Passport Configuration for when other OAUTH providers are added
 * 
// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user: any, done) => {
	done(null, user);
});

passport.deserializeUser((user: any, done) => {
	done(null, user);
});
 *
 */

/**
 * - Middleware to parse incoming requests with JSON, URL encoded, and cookie payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: "SECRET",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

/**
 * Routers to handle requests to the API
 */
app.use("/api", championRoutes);
app.use("/auth", authRouter);

/**
 * Route handlers
 */
app.get("/success", (_req: Request, res: Response) => {
	res.redirect("http://localhost:5173/");
});

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
