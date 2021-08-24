enum KeyState {
  ADD_TAG_TO_LIST = "ADD_TAG_TO_LIST",
  ADD_DROPDOWN_TO_LIST = "ADD_DROPDOWN_TO_LIST",
  DELETE_LAST_TAG = "DELETE_LAST_TAG",
}

const findKeyState = (
  key: string,
  searchText: string,
  availableTags: string[]
): KeyState => {
  if (key === "Enter" && searchText !== "") {
    if (!availableTags.length) {
      return KeyState.ADD_TAG_TO_LIST;
    } else {
      return KeyState.ADD_DROPDOWN_TO_LIST;
    }
  }

  if (key === "Backspace" && searchText === "") {
    return KeyState.DELETE_LAST_TAG;
  }
};

const handleKeyPressWithSwitch = (
  key: string,
  searchText: string,
  availableTags: string[]
) => {
  const keyPressState = findKeyState(key, searchText, availableTags);

  switch (keyPressState) {
    case KeyState.ADD_TAG_TO_LIST: {
      // Add current text to the list of tags
      // Reset the search
    }
    case KeyState.ADD_DROPDOWN_TO_LIST: {
      // Get the first tag
      // Add the tag to
      // Reset the search
    }
    case KeyState.DELETE_LAST_TAG: {
      // delete the tag
    }
    default: {
      // noop
    }
  }
};
