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
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE"], 
	credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


app.get("/",(req,res)=>{
	res.send("kya aapke tooth paste mein namak hai ? ")
  })
app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
