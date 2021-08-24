import { match, __ } from "ts-pattern";

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

const infoAboutInput = match<Shef, string>(shefInput)
  .with(defaultShef, () => {
    throw new Error(
      "Default shef detected, data was never passed into init it"
    );
  })
  .when(isShefInstance, () => "Its a shef instance")
  .otherwise(() => `Don't know what this is`);

console.log(infoAboutInput);

// Nullable Example
// In a world where everything is maybe
// Pick the level you can advance to and throw errors or handle the state that would break your app

class NullableShef {
  name: string | null;
  region: string | null;
  foodSpecialty: string | null;

  constructor(someShefData: Partial<NullableShef>) {
    this.name = someShefData.name || null;
    this.region = someShefData.region || null;
    this.foodSpecialty = someShefData.foodSpecialty || null;
  }
}

const nullableShef = new NullableShef({
  name: "Sly the sloth",
  region: "CA",
  foodSpecialty: "Hibiscus Tea",
});
// const nullableShef = new NullableShef({ name: "Sly the sloth", region: "CA" });
// const nullableShef = new NullableShef({ name: null, region: "CA" });

const infoAboutNullableShef = match<NullableShef, string>(nullableShef)
  .with(
    {
      name: __.string,
      region: __.string,
      foodSpecialty: __.string,
    },
    (someInput) => {
      const { name, region, foodSpecialty } = someInput;
      return `Shef ${name} is from ${region} and their favorite cusine is ${foodSpecialty}`;
    }
  )
  .with(
    {
      name: __.string,
      region: __.string,
    },
    (someInput) => {
      const { name, region } = someInput;
      return `Shef ${name} is from ${region}`;
    }
  )
  .with(
    {
      name: null,
    },
    (someInput) => {
      throw new Error("Name needs defined");
    }
  )
  .otherwise(() => `Can't operate on this shef`);

console.log(infoAboutNullableShef);

// Pattern matching vs if statement
// Pattern matcing is easier to read, extend
const someOtherShef = new NullableShef({});

const isShefSly = match<NullableShef, void>(someOtherShef)
  .with(
    {
      name: "Sly",
      region: "CA",
      foodSpecialty: "Hibiscus Tea",
    },
    () => console.log("Shef sly")
  )
  .otherwise(() => console.log("Not Shef sly"));

// vs
if (
  someOtherShef?.name === "Sly" &&
  someOtherShef?.region === "CA" &&
  someOtherShef?.foodSpecialty === "Hibiscus Tea"
) {
  console.log("Shef sly");
} else {
  console.log("Not Shef sly");
}
