"use client";
import Polls from "@/@components/Polls";
import Selection from "@/@components/Selection";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<
    "candidateSelection" | "voterSelection" | "polling" | "results"
  >("candidateSelection");
  const [candidates, setCandidates] = useState<string[]>([]);
  const [voters, setVoters] = useState<string[]>([]);
  const [polls, setPolls] = useState<{ string: string[] }>();

  return (
    <main className="p-4">
      <h1 className="text-xl mb-2">ranked choice voting</h1>
      <h2 className="text-lg mb-4">{state}</h2>
      <div>
        {state === "candidateSelection" && (
          <Selection
            options={candidates}
            setOptions={setCandidates}
            updateState={() => setState("voterSelection")}
          />
        )}
        {state === "voterSelection" && (
          <Selection
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
        {/* TODO */}
        {state === "results" && <div>finished</div>}
      </div>
    </main>
  );
}
