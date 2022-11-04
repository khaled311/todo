/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			backgroundImage: {
				"hero-pattern": "linear-gradient(to right, #E53E3E, #D69E2E)",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
