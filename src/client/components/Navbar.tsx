import { Link } from "react-router-dom";
import { buttonVariants } from "@/client/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

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
							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									<Link
										to="/rules"
										className={buttonVariants({ variant: "ghost" })}
									>
										Rules
									</Link>
									<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
									<Link
										to="https://github.com/s-hc/LOLDoku"
										className={buttonVariants({ variant: "link" })}
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
