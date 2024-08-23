"use client";
import Polls from "@/components/Polls";
import Results from "@/components/Results";
import Selection from "@/components/Selection";
import type { Polls as PollsArray, State } from "@/types";
import { useState } from "react";

function HEADER_TEXT(state: State): string {
  switch (state) {
    case "candidateSelection":
      return "Add all the candidates";
    case "voterSelection":
      return "Add all the voters";
    case "polling":
      return "Time to vote!";
    case "results":
      return "The results are:";
    default:
      return "";
  }
}

export default function Home() {
  const [state, setState] = useState<State>("candidateSelection");
  const [candidates, setCandidates] = useState<string[]>([]);
  const [voters, setVoters] = useState<string[]>([]);
  const [polls, setPolls] = useState<PollsArray>([]);

  return (
    <main className="p-12">
      <div className="p-4 border-white border-2 w-fit">
        <h1 className="text-xl mb-2">ranked choice voting</h1>
        <h2 className="text-lg mb-4">{HEADER_TEXT(state)}</h2>
        <div>
          {state === "candidateSelection" && (
            <Selection
              state={state}
              options={candidates}
              setOptions={setCandidates}
              updateState={() => setState("voterSelection")}
            />
          )}
          {state === "voterSelection" && (
            <Selection
              state={state}
              options={voters}
              setOptions={setVoters}
              updateState={() => setState("polling")}
            />
          )}
          {state === "polling" && (
            <Polls
              candidates={candidates}
              voters={voters}
              polls={polls}
              setPolls={setPolls}
              updateState={() => setState("results")}
            />
          )}
          {state === "results" && (
            <Results candidates={candidates} polls={polls} />
          )}
        </div>
      </div>
    </main>
  );
}
