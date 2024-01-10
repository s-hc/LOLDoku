import { Icons } from "@/client/assets/icons";
import { Button, buttonVariants } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { getBackendUrl } from "@/client/config";

/**
 * Authentication component
 * Renders a component for user authentication options for Google, Apple, and Github
 * Currently, only Google authentication is functional
 * @returns {JSX.Element} The rendered authentication options component
 */
export default function Authentication() {
	const handleGoogleAuth = () => {
		const backendUrl = getBackendUrl();
		window.location.href = backendUrl;
	};

	/**
   * Uncomment the below functions to enable other authentication in future
   * 
	// const handleGithubAuth = () => {
	// 	window.location.href = "http://localhost:3000/auth/github";
	// };

	// const handleAppleAuth = () => {
	// 	window.location.href = "http://localhost:3000/auth/apple";
	// };
  */

	return (
		<>
			<Dialog>
				<DialogTrigger className={buttonVariants({ variant: "secondary" })}>
					Login
				</DialogTrigger>
				<DialogContent className="text-center space-y-3 ">
					<DialogTitle>Sign In</DialogTitle>
					<DialogDescription>
						Sign in for access to more features!
					</DialogDescription>
					<DialogDescription>
						<span className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
							<span className="relative inset-0 flex items-center w-full border-t" />
							<Button variant="default" onClick={handleGoogleAuth}>
								<Icons.google className="mr-2 h-4 w-4" />
								Google
							</Button>
							<Button
								variant="destructive"
								onClick={() => console.log("Apple...coming soon")}
							>
								<Icons.apple className="mr-2 h-4 w-4" />
								Apple ... Coming Soon
							</Button>
							<Button
								variant="destructive"
								onClick={() => console.log("GitHub...coming soon")}
							>
								<Icons.gitHub className="mr-2 h-4 w-4" />
								GitHub ... Coming Soon
							</Button>
						</span>
					</DialogDescription>
				</DialogContent>
			</Dialog>
		</>
	);
}
