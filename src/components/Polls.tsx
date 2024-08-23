"use client";
import type { Poll, Polls as PollsArray } from "@/types";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface Props {
  candidates: string[];
  voters: string[];
  polls?: PollsArray;
  setPolls: Dispatch<SetStateAction<PollsArray>>;
  updateState: () => void;
}

const Polls = ({ candidates, voters, polls, setPolls, updateState }: Props) => {
  const [allPossibleVoters, setAllPossibleVotters] = useState([...voters]);
  const [sortedCandidates, setSortedCandidates] = useState([...candidates]);
  const [currentVoter, setCurrentVoter] = useState("");
  const [currentVoterPoll, setCurrentVoterPoll] = useState<Poll>({
    [currentVoter]: [""],
  });

  // updates currentVoter and updates to next step if no more voters
  useEffect(() => {
    if (allPossibleVoters.length === 0) {
      updateState();
      return;
    }
    setSortedCandidates([...candidates]);
    setCurrentVoter(allPossibleVoters[0]);
  }, [allPossibleVoters, candidates, updateState]);

  // updates currentVoterPoll
  useEffect(() => {
    setCurrentVoterPoll({ [currentVoter]: sortedCandidates });
  }, [currentVoter, sortedCandidates]);

  const onNext = () => {
    setPolls((currentPolls) => [...currentPolls, currentVoterPoll]);
    setAllPossibleVotters((currentAllPossibleVoters) =>
      currentAllPossibleVoters.filter((value) => value != currentVoter)
    );
  };

  const onMove = (direction: "up" | "down", index: number) => {
    let indexToMoveTo = index;
    if (direction === "up") indexToMoveTo -= 1;
    if (direction === "down") indexToMoveTo += 1;

    setSortedCandidates((currentSortedCandidates) => {
      const newlySortedCandidates = [...currentSortedCandidates];
      // swap element places
      newlySortedCandidates[indexToMoveTo] = newlySortedCandidates.splice(
        index,
        1,
        newlySortedCandidates[indexToMoveTo]
      )[0];
      return [...newlySortedCandidates];
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2>
        current voter: <span className="font-bold">{currentVoter}</span>
      </h2>
      <div className="flex flex-col gap-4">
        <h2>candidates</h2>
        <div className="flex flex-col gap-8">
          {sortedCandidates.map((value, index) => (
            <div
              key={value}
              className="flex justify-between gap-8 p-4 border-white border-2"
            >
              <span>
                {index + 1}. {value}
              </span>
              <div className="flex gap-4">
                <button
                  onClick={index === 0 ? undefined : () => onMove("up", index)}
                  className={`w-24 p-1 border-white border-2 ${
                    index === 0 ? "opacity-50" : ""
                  }`}
                  disabled={index === 0}
                >
                  up
                </button>
                <button
                  onClick={
                    index === sortedCandidates.length - 1
                      ? undefined
                      : () => onMove("down", index)
                  }
                  className={`w-24 p-1 border-white border-2 ${
                    index === sortedCandidates.length - 1 ? "opacity-50" : ""
                  }`}
                  disabled={index === sortedCandidates.length - 1}
                >
                  down
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <button onClick={onNext} className="p-2 border-white border-2">
        submit
      </button>
    </div>
  );
};

export default Polls;
