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

// GOOGLE OAUTH
authRouter.get("/google", googleAuth);

authRouter.get("/google/callback", googleAuthCallback);

authRouter.get("/success", (_req: Request, res: Response) => {
	res.redirect("http://localhost:5173/");
});

authRouter.get("/logout", logout);

authRouter.get("/get-user", (req, res) => {
	if (req.session.user) {
		res.json(req.session.user);
	} else {
		res.status(401).json({ message: "Not authenticated" });
	}
});

export default authRouter;
