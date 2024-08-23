export type State =
  | "candidateSelection"
  | "voterSelection"
  | "polling"
  | "results";

/**
 * key: represents voter name
 * value: represents their options in sorted order
 */
export type Poll = { [voter: string]: string[] };

export type Polls = Poll[];
