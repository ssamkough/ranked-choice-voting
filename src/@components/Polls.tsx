import type { Dispatch, SetStateAction } from "react";

interface Props {
  candidates: string[];
  voters: string[];
  polls?: { string: string[] };
  setPolls?: Dispatch<SetStateAction<{ string: string[] } | undefined>>;
  updateState: () => void;
}

const Polls = ({ candidates, voters, polls, setPolls, updateState }: Props) => {
  return "polls";
};

export default Polls;
