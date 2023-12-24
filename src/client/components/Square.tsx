import { Button } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/client/components/ui/dialog";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/client/components/ui/command";
import champs from "../../server/demoChampList.json";
import { useBearStore } from "../store/guesses_store";

type Props = {
	champion: string,
};

const Square = ({ champion }: Props) => {
	const decrease = useBearStore((state) => state.decrease);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="size-full"></Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Make Your Guess</DialogTitle>
					<DialogDescription>
						{`you should guess ${champion}`}
					</DialogDescription>
				</DialogHeader>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{champs.champions.map((ele, _) => (
								<CommandItem>
									<DialogClose className="size-full" onClick={() => decrease()}>
										{ele}
									</DialogClose>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
};

export default Square;
