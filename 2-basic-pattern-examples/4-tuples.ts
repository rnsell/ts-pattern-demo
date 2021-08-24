import { match, __ } from "ts-pattern";

type InputTuple =
  | [number, "+", number]
  | [number, "-", number]
  | [number, "*", number]
  | ["-", number];

const tupleInput: InputTuple = [3, "*", 4];

const tupleOutPut = match<InputTuple>(tupleInput)
  .with([__, "+", __], ([x, , y]) => x + y)
  .with([__, "-", __], ([x, , y]) => x - y)
  .with([__, "*", __], ([x, , y]) => x * y)
  .with(["-", __], ([, x]) => -x)
  .otherwise(() => NaN);

console.log(tupleOutPut);
