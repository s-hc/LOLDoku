import { Button } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/client/components/ui/dialog";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/client/components/ui/command";

import champs from "../../server/demoChampList.json";

type Props = {
	champion: string,
};

const Square = ({ champion }: Props) => {
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
									<DialogClose
										className="size-full"
										onClick={() => console.log(ele)}
									>
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
