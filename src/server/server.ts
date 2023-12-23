console.log("--> HELLO FROM SERVER.TS <--");
import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();

// PARSE ALL REQUESTS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/", (_req: Request, res: Response) => {
	return res.status(200).sendFile(path.resolve("/index.html"));
});

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

// START SERVER
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
