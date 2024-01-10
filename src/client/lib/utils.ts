import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { getUserUrl, getLogoutUrl } from "@/client/config";
import { getUserUrl } from "@/client/lib/importMetaFunctions/getUserUrl";
import { getLogoutUrl } from "@/client/lib/importMetaFunctions/getLogoutUrl";

/**
 * Combines class names using clsx and tailwind-merge.
 * This utility function takes multiple class values and merges them into a single string.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined.
 * @returns {string} The combined class names.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Fetches user data from the authentication server.
 * Sends a request to the server to retrieve the current user's data.
 *
 * @async
 * @returns {Promise<Object|null>} The user data object or null in case of an error.
 */
export async function fetchUserData() {
	const userUrl = getUserUrl();
	try {
		// const response = await fetch("http://localhost:3000/auth/get-user", {
		const response = await fetch(`${userUrl}`, {
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error("Failed to fetch user data");
		}
		return await response.json();
	} catch (err) {
		console.log("Error in fetchUserData: ", err);
		return null;
	}
}

/**
 * Logs out the current user.
 * Sends a request to the server to log out the current user.
 *
 * @async
 * @returns {Promise<Object|null>} The response object or null in case of an error.
 */
export async function logOut() {
	const logoutUrl = getLogoutUrl();
	try {
		const response = await fetch(`${logoutUrl}`, {
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error("Failed to log out");
		}
		return await response.json();
	} catch (err) {
		console.log("Error in logOut: ", err);
		return null;
	}
}
