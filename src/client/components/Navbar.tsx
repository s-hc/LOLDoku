import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { ModeToggle } from "./ModeToggle";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Authentication from "./Authentication";
import { Icons } from "../assets/icons";
import { useEffect, useState } from "react";
import { fetchUserData, logOut } from "../lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export interface User {
	name: string;
	picture: string;
}

/**
 * Represents the navigation bar of the application.
 * This component includes links, authentication options, and a mode toggle.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Navbar = () => {
	const [user, setUser] = useState<User | null>(null);

	/**
	 * Fetches user data on component mount and sets it to state.
	 * Uses the `fetchUserData` utility function to get the current user's information.
	 */
	useEffect(() => {
		if (!user) {
			fetchUserData().then((data) => {
				if (data) setUser(data);
			});
		}
	}, [user, setUser]);

	/**
	 * Handles user logout.
	 * Calls the `logOut` utility function and resets the user state.
	 */
	const userLogOut = async () => {
		await logOut();
		console.log("logging out");
		setUser(null);
		window.location.reload();
	};

	return (
		<div className="sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<div className="ml-4 flex lg:ml-0">
								<Link to="/">
									<img
										src={"/LOLDoku/LOLDoku.png"}
										alt="logo"
										className="h-12"
									/>
								</Link>
							</div>
							<div className="ml-auto flex items-center">
								<div className="flex flex-1 items-center justify-end space-x-6 ">
									<Dialog>
										<DialogTrigger
											className={buttonVariants({ variant: "outline" })}
										>
											<Icons.question className="mr-2 h-4 w-4" />
											Rules
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle className="text-center">
													How to Play LolDoku
												</DialogTitle>
												<DialogDescription className="text-gray-500 text-sm md:text-base lg:text-lg font-normal leading-relaxed mt-4 mb-6">
													<br />
													<span className="mt-4 mb-4">
														🟢 The goal of the game is to fill in all 9 boxes
														with the correct League of Legends champion!
													</span>
													<br />
													<br />
													<span className="mb-4">
														❤️ You have to do so with only 9 guesses so choose
														wisely!
													</span>{" "}
													<br />
													<br />
													<span className="mb-4">
														👀 Once you select a champion, you can't switch your
														answer or reuse that champion.
													</span>{" "}
													<br />
													<br />
													<span className="mb-4">
														😎 Your uniqueness score is all of your answer's
														percentages added up. The percentages show you how
														many players put the same correct answer as you. The
														lower the score, the better!
													</span>{" "}
													<br />
													<br />
													<span className="mb-4">
														🌔 New puzzles at midnight EST every day!
													</span>{" "}
													<br />
													<br />
													<span className="mb-4">
														⭐ If you enjoyed, give our{" "}
														<a
															href="https://github.com/s-hc/LOLDoku"
															className="text-blue-600 hover:text-blue-800"
															target="_blank"
														>
															GitHub Project
														</a>{" "}
														a star!
													</span>{" "}
													<br />
													<br />
													<span className="mb-4">
														🦟 If you run into any bugs or have feedback:{" "}
														<a
															href="mailto:spartanhackers0+loldoku@gmail.com"
															className="text-blue-600 hover:text-blue-800"
														>
															spartanhackers0+loldoku@gmail.com
														</a>
													</span>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
									<ModeToggle />
									<span className="h-6 w-px bg-gray-200" aria-hidden="true" />

									{/* User Login */}
									<div>
										{user ? (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="outline"
														className="w-full space-x-3"
													>
														<img
															src={user.picture}
															alt="Profile"
															className="h-6 w-6 rounded-full"
														/>
														<span>{user.name}</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuSeparator />
													<DropdownMenuGroup>
														<DropdownMenuItem>
															<Button variant="outline" onClick={userLogOut}>
																Log Out
															</Button>
														</DropdownMenuItem>
													</DropdownMenuGroup>
													<DropdownMenuSeparator />
												</DropdownMenuContent>
											</DropdownMenu>
										) : (
											<Authentication />
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};

export default Navbar;
