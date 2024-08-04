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
const allowedOrigins = [
	"http://localhost:5173",
	"https://your-production-frontend-domain.com" // Add your production frontend domain here
];

app.use(cors({
	origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps, curl requests, etc.)
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"], // List all HTTP methods you want to allow
	credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.get("/",(req,res)=>{
	res.send("kya aapke tooth paste mein namak hai ? ")
  })
app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
