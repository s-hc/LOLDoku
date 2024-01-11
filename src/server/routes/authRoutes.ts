import express, { Request, Response } from "express";
import {
	googleAuth,
	googleAuthCallback,
	logout,
} from "../controllers/authController.js";
import "express-session";

declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

const authRouter = express.Router();

/**
 * Routes for handling authentication with Google OAuth2.0
 * @module authRouter
 */

/**
 * Initiates Google OAuth process
 */
authRouter.get("/google", googleAuth);

/**
 * Handles callback from Google OAuth process
 */
authRouter.get("/google/callback", googleAuthCallback);

/**
 * Redirects to specified URL upon successful authentication
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 */
authRouter.get("/success", (_req: Request, res: Response) => {
  const frontendUrl = process.env.FRONTEND_URL
	res.redirect(frontendUrl || 'http://localhost:5173');
});

/**
 * Logs out current user
 */
authRouter.get("/logout", logout);

/**
 * Retrieves current user's session data if authenticated
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
authRouter.get("/get-user", (req, res) => {
	if (req.session.user) {
		res.json(req.session.user);
	} else {
		res.status(401).json({ message: "Not authenticated" });
	}
});

export default authRouter;
