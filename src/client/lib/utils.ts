import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchUserData() {
	try {
		const response = await fetch("http://localhost:3000/auth/get-user", {
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

export async function logOut() {
	try {
		const response = await fetch("http://localhost:3000/auth/logout", {
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
