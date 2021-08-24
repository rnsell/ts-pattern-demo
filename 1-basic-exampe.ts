import { toPairs } from "lodash";

const equalityCheck = (someValue: any) => (value) => value === someValue;

const pattern1 = {
  prop1: equalityCheck(2),
};

const pattern2 = {
  prop2: equalityCheck(4),
};

const action1 = [pattern1, () => console.log("hello world")];
const action2 = [pattern2, (value) => console.log(value)];
const returnTrue = () => true;
const match = (actions: any[]) => (input: any) => {
  const inputKeysAndValues = toPairs(input);

  actions.map((actionPair) => {
    const [pattern, strategy] = actionPair;
    // For every key look up the predicate
    inputKeysAndValues.reduce((agg, keyValuePair) => {
      if (!agg) {
        return false;
      }

      const [key, value] = keyValuePair;
      const predicate = pattern?.[key] ?? returnTrue;

      return predicate(value) && agg;
    }, true);
  });
};
