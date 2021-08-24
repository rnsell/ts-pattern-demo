import { match, not } from "ts-pattern";

const pressedEnterAndHasTypedSomething = {
  key: "Enter",
  searchText: not(""),
};

const handleKeyPressWithPatternMatching = (
  key: string,
  searchText: string,
  availableTags: string[]
) => {
  const matchInput = {
    key,
    searchText,
    tagsInDropDown: availableTags.length ?? 0,
  };

  return match<any, void>(matchInput)
    .with({ key: "Enter", searchText: not(""), tagsInDropDown: 0 }, () => {
      // Add current text to the list of tags
      // Reset the search
    })
    .with(
      { ...pressedEnterAndHasTypedSomething, tagsInDropDown: not(0) },
      () => {
        // Get the first tag
        // Add the tag to
        // Reset the search
      }
    )
    .with({ key: "Backspace", searchText: "" }, () => {
      // delete the tag
    })
    .otherwise(() => {});
};
