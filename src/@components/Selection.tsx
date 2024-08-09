import { useState, type Dispatch, type SetStateAction } from "react";

interface Props {
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  updateState: () => void;
}

const Selection = ({ options, setOptions, updateState }: Props) => {
  const [value, setValue] = useState("");

  const addOption = () => {
    setOptions((currOptions) => [...currOptions, value]);
    setValue("");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="value">Value</label>
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
      <button onClick={addOption} className="border-4 border-white">
        add option
      </button>
      <h2>options</h2>
      <div className="border-white border-solid">
        {options.length === 0 ? (
          "N/A"
        ) : (
          <ul>
            {options.map((option, index) => (
              <li key={`${option}${index}`}>{option}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={updateState} className="border-4 border-white">
        next step
      </button>
    </div>
  );
};

export default Selection;
