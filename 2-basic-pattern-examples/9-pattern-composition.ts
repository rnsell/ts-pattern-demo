import { match, select } from "ts-pattern";
import { Match } from "ts-pattern/lib/types/Match";

class Shef {
  name: string;
  region: string;

  constructor(someShefData: Partial<Shef>) {
    this.name = someShefData.name ?? "Default Name";
    this.region = someShefData.region ?? "CA";
  }
}

const isClass = (SomeConstructor) => (v) => v instanceof SomeConstructor;
const isShefInstance = isClass(Shef);

const defaultShef = new Shef({});

const shefInput = new Shef({ name: "Sly the Sloth" });

// **********************************
// Actional example after the setup
// **********************************
type PatternDucer = (
  match: Match<Shef, string, never, never>
) => Match<Shef, string, never, never>;

const compose = (...fns: PatternDucer[]) => (
  x: Match<Shef, string, never, never>
): Match<Shef, string, never, never> => fns.reduce((y, f) => f(y), x);

const addDefaultShefPattern = (someMatch: Match<Shef, string, never, never>) =>
  someMatch.with(defaultShef, () => {
    throw new Error(
      "Default shef detected, data was never passed into init it"
    );
  });

const addShefInstancePattern = (someMatch: Match<Shef, string, never, never>) =>
  someMatch.when(isShefInstance, () => "Its a shef instance");

// I would make sure all patterns are mutually exlusive and order doesn't matter
const composedMixIn = compose(addDefaultShefPattern, addShefInstancePattern);

const infoAboutInput = addShefInstancePattern(
  addDefaultShefPattern(match<Shef, string>(shefInput))
).otherwise(() => `Don't know what this is`);

const composedVersion = composedMixIn(match<Shef, string>(shefInput)).otherwise(
  () => `Don't know what this is`
);

// Think of some interesting examples of pattern matching on creating patterns
