export const getAuthUrl = () => {
	return (
		import.meta.env.VITE_BACKEND_AUTH || "http://localhost:3000/auth/google"
	);
};


