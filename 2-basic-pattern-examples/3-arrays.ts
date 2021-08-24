import { match, __, not, select, when } from "ts-pattern";

type Input = { title: string; content: string }[];

let input: Input = [
  { title: "Hello world!", content: "I‘m a very interesting content" },
  { title: "Bonjour!", content: "I‘m a very interesting content too" },
];

// Slight nuance between tuples and arrays
// To match on a list of values, your pattern can be an array with a single sub-pattern in it.
// This sub-pattern will be tested against all elements in your input array, and they must all match for your list pattern to match
const output = match(input)
  .with(
    [{ title: __.string, content: __.string }],
    (posts) => "a list of posts!"
  )
  .otherwise(() => "something else");

console.log(output);

// vs using an array of two inputs
type State =
  | { status: "idle" }
  | { status: "loading"; startTime: number }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

type Event =
  | { type: "fetch" }
  | { type: "success"; data: string }
  | { type: "error"; error: Error }
  | { type: "cancel" };

const reducer = (state: State, event: Event): State =>
  match<[State, Event], State>([state, event])
    .with([{ status: "loading" }, { type: "success" }], ([, event]) => ({
      status: "success",
      data: event.data,
    }))
    .with(
      [{ status: "loading" }, { type: "error", error: select() }],
      (error) => ({
        status: "error",
        error,
      })
    )
    .with([{ status: not("loading") }, { type: "fetch" }], () => ({
      status: "loading",
      startTime: Date.now(),
    }))
    .with(
      [
        { status: "loading", startTime: when((t) => t + 2000 < Date.now()) },
        { type: "cancel" },
      ],
      () => ({
        status: "idle",
      })
    )
    .otherwise(() => state);
// .exhaustive();
