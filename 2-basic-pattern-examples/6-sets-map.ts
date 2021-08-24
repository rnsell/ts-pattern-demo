import { match, __ } from "ts-pattern";

type SetInput = Set<string | number>;

const setInput: SetInput = new Set([1, 2, 3]);

const setOutput = match<SetInput>(setInput)
  .with(new Set([1, "hello"]), (set) => `Set contains 1 and 'hello'`)
  .with(new Set([1, 2]), (set) => `Set contains 1 and 2`)
  .with(new Set([__.string]), (set) => `Set contains only strings`)
  .with(new Set([__.number]), (set) => `Set contains only numbers`)
  .otherwise(() => "");

console.log(setOutput);

///************************** */
type Input = Map<string, string | number>;

const input: Input = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

const output = match<Input>(input)
  .with(new Map([["b", 2]]), (map) => `map.get('b') is 2`)
  .with(new Map([["a", __.string]]), (map) => `map.get('a') is a string`)
  .with(
    new Map([
      ["a", __.number],
      ["c", __.number],
    ]),
    (map) => `map.get('a') and map.get('c') are number`
  )
  .otherwise(() => "");

console.log(output);
