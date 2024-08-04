import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

	res.cookie("jwt-netflix", token, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 1000),
		maxAge: 1000 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});

	return token;
};
