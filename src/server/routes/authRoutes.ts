import express from "express";
import {
	googleAuth,
	googleAuthCallback,
} from "../controllers/authController.js";

const authRouter = express.Router();

// GOOGLE OAUTH
authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleAuthCallback);

// authRouter.get("/success", (__dirname, res) => res.send(userProfile));

// GITHUB OAUTH
// authRouter.get("/github", githubAuth);
// authRouter.get("/github/callback", githubAuthCallback);

export default authRouter;
