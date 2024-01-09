import { Icons } from "@/client/assets/icons";
import { Button, buttonVariants } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { getEnv } from "../lib/utils";

/**
 * Authentication component
 * Renders a component for user authentication options for Google, Apple, and Github
 * Currently, only Google authentication is functional
 * @returns {JSX.Element} The rendered authentication options component
 */
export default function Authentication(): JSX.Element {
	// const handleGoogleAuth = () => {
	// 	const backendUrl = `${global.import.meta.env.VITE_BACKEND_URL}/auth/google`;
	// 	console.log("this is the backend url", backendUrl);
	// 	window.location.href = backendUrl;
	// };

    const handleAuth = (authenticationMethod: string) => {
        const backendUrl = getEnv('VITE_BACKEND_URL');
		const authenticationAddress = `${backendUrl}/auth/${authenticationMethod}`;
		
		console.log(`In handleAuth Function in authentication`);
		console.log('Connecting to ' + authenticationAddress);

        window.location.href = authenticationAddress
    }


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
                            <Button variant="default" onClick={()=> {handleAuth("google")}}>
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
