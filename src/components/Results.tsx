import type { Polls } from "@/types";

interface Props {
  candidates: string[];
  polls: Polls;
}

const Results = ({ candidates, polls }: Props) => {
  const candidatesObj: { [voter: string]: number } = {};

  for (let i = 0; i < candidates.length; i++) {
    candidatesObj[candidates[i]] = 0;
  }

  for (let i = 0; i < polls.length; i++) {
    const voterPoll = polls[i];

    Object.keys(voterPoll).forEach((key) => {
      const pollValues = [...voterPoll[key]];
      pollValues.reverse().forEach((value, index) => {
        const humanIndex = index + 1;
        const valueToSum = humanIndex / candidates.length;
        candidatesObj[value] += valueToSum;
      });
    });
  }

  const results = Object.keys(candidatesObj).sort((a, b) =>
    candidatesObj[a] > candidatesObj[b] ? -1 : 1
  );

  return (
    <div>
      <div>
        <ul>
          {results.map((title, index) => (
            <li key={title}>
              {index + 1}. {title}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <hr />
      <br />
      <h2>details</h2>
      <ul className="flex flex-col gap-8">
        {polls.map((poll) =>
          Object.keys(poll).map((key) => (
            <li key={key}>
              {key}:{" "}
              <div className="flex flex-col">
                {poll[key].map((value, index) => (
                  <p key={value}>
                    {index + 1}. {value}
                  </p>
                ))}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Results;
