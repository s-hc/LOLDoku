export const getUserUrl = () => {
	return import.meta.env.VITE_BACKEND_GETUSER || "http://localhost:3000/auth/get-user"
};

