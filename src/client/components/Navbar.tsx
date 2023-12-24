import { Link } from "react-router-dom";
import { buttonVariants } from "@/client/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

const Navbar = () => {
	return (
		<div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<div className="ml-4 flex lg:ml-0">
								<Link to="/">
									<img
										src={"/src/client/assets/logo.png"}
										alt="logo"
										className="h-12"
									/>
								</Link>
							</div>
							<div className="ml-auto flex items-center ">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ">
									<Dialog>
										<DialogTrigger>Rules</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle className="text-center">
													How to Play LolDoku
												</DialogTitle>
												<DialogDescription className="text-gray-600 text-sm md:text-base lg:text-lg font-normal leading-relaxed mt-4 mb-6">
													<p className="mt-4 mb-4">
														🟢 The goal of the game is to fill in all 9 boxes
														with the correct League of Legends champion!
													</p>
													<p className="mb-4">
														❤️ You have to do so with only 9 guesses so choose
														wisely!
													</p>
													<p className="mb-4">
														👀 Once you select a champion, you can't switch your
														answer or reuse that champion.
													</p>
													<p className="mb-4">
														😎 Your uniqueness score is all of your answer's
														percentages added up. The percentages show you how
														many players put the same correct answer as you. The
														lower the score, the better!
													</p>
													<p className="mb-4">
														🌔 New puzzles at midnight EST every day!
													</p>
													<p className="mb-4">
														⭐ If you enjoyed, give our{" "}
														<a
															href="https://github.com/s-hc/LOLDoku"
															className="text-blue-600 hover:text-blue-800"
															target="_blank"
														>
															GitHub Project
														</a>{" "}
														a star!
													</p>
													<p className="mb-4">
														🦟 If you run into any bugs or have feedback:{" "}
														<a
															href="mailto:spartanhackers0+loldoku@gmail.com"
															className="text-blue-600 hover:text-blue-800"
														>
															spartanhackers0+loldoku@gmail.com
														</a>
													</p>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
									<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
									<Link
										to="https://github.com/s-hc/LOLDoku"
										className={buttonVariants({ variant: "link" })}
										target="_blank"
									>
										Github
									</Link>
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
