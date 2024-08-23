import type { State } from "@/types";
import { useState, type Dispatch, type SetStateAction } from "react";

interface Props {
  state: State;
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  updateState: () => void;
}

function TITLE(state: State): string {
  switch (state) {
    case "candidateSelection":
      return "Candidate title";
    case "voterSelection":
      return "Voter name";
    default:
      return "Value";
  }
}

const Selection = ({ state, options, setOptions, updateState }: Props) => {
  const [value, setValue] = useState("");

  const addOption = () => {
    setOptions((currOptions) => [...currOptions, value]);
    setValue("");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="value">{TITLE(state)}</label>
          <input
            type="label"
            name="value"
            id="value"
            value={value}
            minLength={1}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => (event.key === "Enter" ? addOption() : null)}
            className="text-black"
          />
        </div>
        <button onClick={addOption} className="p-2 border-2 border-white">
          add option
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <h3>options</h3>
        <div className="border-white border-solid mb-4">
          {options.length === 0 ? (
            "N/A"
          ) : (
            <ul>
              {options.map((option, index) => (
                <li key={`${option}${index}`} className="ml-6 list-disc">
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={updateState} className="p-2 border-2 border-white">
          next step
        </button>
      </div>
    </div>
  );
};

export default Selection;
