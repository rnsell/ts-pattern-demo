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

const addTagToList = () => {
  // Add current text to the list of tags
  // Reset the search
};

const addFirstDropDownValueToList = () => {
  // Get the first tag
  // Add the tag to
  // Reset the search
};

const deleteTheTag = () => {
  // delete the tag
};

const keyPressMap = new Map<KeyState, any>([
  [KeyState.ADD_TAG_TO_LIST, addTagToList],
  [KeyState.ADD_DROPDOWN_TO_LIST, addFirstDropDownValueToList],
  [KeyState.DELETE_LAST_TAG, deleteTheTag],
]);

const doNothing = () => void 0;

const handleKeyPressWithMap = (
  key: string,
  searchText: string,
  availableTags: string[]
) => {
  const keyPressState = findKeyState(key, searchText, availableTags);
  const actionToTake = keyPressMap.get(keyPressState) ?? doNothing;

  actionToTake();
};
