import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

/**
 * Google OAuth2.0 client configuration with environment variables
 * @types {OAuth2Client}
 */
const googleClient = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
);

/**
 * Initiates Google OAuth2 auth process
 * Redirects user to Google OAuth2 consent screen
 */
export const googleAuth = (_req, res) => {
	const url = googleClient.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/userinfo.profile"],
	});
	res.redirect(url);
};

/**
 * Handles the Google OAuth2 callback. Exchanges the code for tokens, retrieves
 * user information, and sets the user session.
 *
 * @async
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 */
export const googleAuthCallback = async (req, res) => {
	try {
		const code = req.query.code;
		const { tokens } = await googleClient.getToken(code);
		googleClient.setCredentials(tokens);

		const userInfoResponse = await googleClient.request({
			url: "https://www.googleapis.com/oauth2/v1/userinfo",
		});

		// console.log("-----This is the user info:----- \n", userInfoResponse.data);
		// console.log("-----These are the tokens:----- \n", tokens);
		const userInfo = userInfoResponse.data;
		req.session.user = userInfo;

		res.redirect("/auth/success");
	} catch (err) {
		console.log("Error in googleAuthCallback: ", err);
		res.status(500).send("Error in googleAuthCallback");
	}
};

/**
 * Logs out the current user by destroying their session.
 *
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 */
export const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log("Error in logout: ", err);
			res.status(500).send("Error in logout");
		}
		res.redirect("/");
	});
};
