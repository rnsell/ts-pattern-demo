import { match, not } from "ts-pattern";

const someBoolean = false;

// Boolean
match<boolean, void>(someBoolean)
  .with(true, () => {
    // do something
  })
  .otherwise(() => {
    // do something else
  });

export const textFunction = () => "text";
// Case fall through
export const sanitize = (name: string) =>
  match(name)
    .with("text", "span", "p", textFunction)
    .with("btn", "button", () => "button")
    .otherwise(() => name);

sanitize("span"); // 'text'
sanitize("p"); // 'text'
sanitize("button"); // 'button'

// Switch Equivalent
// How do I extend this if I need to add more data
const sanitizeWithSwitch = (name: string) => {
  switch (name) {
    case "text":
    case "span":
    case "p":
      return textFunction();
    case "btn":
    case "button":
      return "button";
    default:
      return name;
  }
};
