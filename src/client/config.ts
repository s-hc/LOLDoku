export const getBackendUrl = () => {
	return (
		import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/auth/google"
	);
};

// export const getUserUrl = () => {
// 	return import.meta.env.VITE_BACKEND_GETUSER || "http://localhost:3000/auth/get-user"
// };
//
// export const getLogoutUrl = () => {
// 	return import.meta.env.VITE_BACKEND_LOGOUT || "http://localhost:3000/auth/logout"
// };
