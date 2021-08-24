const handleKeyPressWithIfs = (key, searchText, availableTags) => {
  if (key === "Enter" && searchText !== "") {
    if (!availableTags.length) {
      // Add current text to the list of tags
      // Reset the search
    } else {
      // Get the first tag
      // Add the tag to
      // Reset the search
    }
  }

  if ((key = "Backspace" && searchText === "")) {
    // delete the tag
  }
};

// ---------------------
const handleKeyPressWithIfsCleaner = (key, searchText, availableTags) => {
  const pressedEnterKey = key === "Enter";
  const pressedBackSpaceKey = key === "Backspace";
  const hasTypedSomeText = searchText !== "";
  const atleastOneTagDisplayedInDropdown = !availableTags.length;

  if (pressedEnterKey && hasTypedSomeText) {
    if (atleastOneTagDisplayedInDropdown) {
      // Add current text to the list of tags
      // Reset the search
    } else {
      // Get the first tag
      // Add the tag to
      // Reset the search
    }
  }

  if (pressedBackSpaceKey && !hasTypedSomeText) {
    // delete the tag
  }
};
