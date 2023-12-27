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

		const userInfoResponse = await googleClient.request({
			url: "https://www.googleapis.com/oauth2/v1/userinfo",
		});

		// console.log("This is the user info: \n", userInfoResponse.data);
		// console.log("These are the tokens: \n", tokens);

		const userInfo = userInfoResponse.data;
		req.session.user = userInfo;

		res.redirect("/auth/success");
	} catch (err) {
		console.log("Error in googleAuthCallback: ", err);
		res.status(500).send("Error in googleAuthCallback");
	}
};

export const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log("Error in logout: ", err);
			res.status(500).send("Error in logout");
		}
		res.redirect("/");
	});
};
