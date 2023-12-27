import { Icons } from "@/client/assets/icons";
import { Button } from "@/client/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
	const navigate = useNavigate();

	const handleGoogleAuth = () => {
		navigate("/auth/google");
	};

	const handleGithubAuth = () => {
		navigate("/auth/github");
	};

	const handleAppleAuth = () => {
		navigate("/auth/apple");
	};

	return (
		<>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
					<p className="text-sm text-muted-foreground">
						Sign in to access more features!
					</p>
				</div>
				<div className="relative">
					<span className="absolute inset-0 flex items-center w-full border-t" />
				</div>
				<Button variant="secondary" onClick={handleGoogleAuth}>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button variant="secondary" onClick={handleAppleAuth}>
					<Icons.apple className="mr-2 h-4 w-4" />
					Apple
				</Button>
				<Button variant="secondary" onClick={handleGithubAuth}>
					<Icons.gitHub className="mr-2 h-4 w-4" />
					GitHub
				</Button>
			</div>
		</>
	);
}
