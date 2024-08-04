import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://netflix-jxi6.onrender.com",
				// Set to true if using a valid SSL certificate
				headers: {
					Host: 'netflix-jxi6.onrender.com' // Ensure the Host header is correct
				}
			},
		},
	},
});
