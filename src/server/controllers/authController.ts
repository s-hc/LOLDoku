import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const googleClient = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
);
// console.dir(googleClient);

export const googleAuth = (_req, res) => {
	const url = googleClient.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/userinfo.profile"],
	});
	res.redirect(url);
};

export const googleAuthCallback = async (req, res) => {
	try {
		const code = req.query.code;
		const { tokens } = await googleClient.getToken(code);
		googleClient.setCredentials(tokens);
		// save tokens and user info to database
		console.log("These are the tokens: \n", tokens);
		res.redirect("/success");
	} catch (err) {
		console.log("Error in googleAuthCallback: ", err);
		res.status(500).send("Error in googleAuthCallback");
	}
};
