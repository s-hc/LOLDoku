export const getLogoutUrl = () => {
	return import.meta.env.VITE_BACKEND_LOGOUT || "http://localhost:3000/auth/logout"
};

