// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, "src/piano_helper.ts"),
			name: "piano_helper",
			// the proper extensions will be added
			fileName: "piano_helper",
		},
		test: {
			include: ["**/*.{integration,spec}.?(c|m)[jt]s?(x)"],
		},
	},
});
