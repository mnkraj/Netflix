import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
// const allowedOrigins = [
// 	"https://cgpa-leaderboad.vercel.app",
// 	"https://nitjsr.vercel.app",
// 	"https://cgpanitjsr.vercel.app",
// 	"https://cgpa-leaderboard.vercel.app",
// 	"http://localhost:5173"
// ];

app.use(
	cors({
		origin: [
			"https://main--padhlo.netlify.app",
			"http://localhost:3001",
			"https://frontend-padhlo.onrender.com",
			"https://padhlo.netlify.app",
			"https://frontend-padhlo.vercel.app",
			"http://localhost:5173"
		],
		credentials: true,
	})
);
app.options('*', cors()); // Enable pre-flight across-the-board
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


app.get("/", (req, res) => {
	res.send("kya aapke tooth paste mein namak hai ? ")
})
app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
