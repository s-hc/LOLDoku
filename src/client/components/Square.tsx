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
import { useGuessesStore } from "../store/guesses_store";
import { useGridStore } from "../store/grid_store";

type Props = {
	champion: string | undefined,
	answer: string,
	squareNum: number,
};

const Square = ({ champion, answer, squareNum }: Props) => {
	const decrease = useGuessesStore((state) => state.decrease);
	const makeGuess = useGridStore((state) => state.makeGuess);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size={"lg"} className="size-full">
					{champion ?? ""}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Make Your Guess</DialogTitle>
					<DialogDescription>{`you should guess ${answer}`}</DialogDescription>
				</DialogHeader>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{champs.champions.map((ele, ind) => (
								<CommandItem key={`champNo${ind}`}>
									<DialogClose
										className="size-full"
										onClick={() => {
											makeGuess(ele, squareNum);
											decrease();
										}}
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
