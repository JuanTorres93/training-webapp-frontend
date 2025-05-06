// regex means at least one lowercase letter, one uppercase letter, one digit, one special character,
// and at least 8 characters long
// String version of the regex for using in HTML, otherwise it will not work
export const strongPasswordRegexString =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$";
export const strongPasswordRegex = new RegExp(strongPasswordRegexString);

export const allowOnlyIntegers = (e) => {
  // Use in onKeyDown event AND include also pasteOnlyIntegers in onPaste event
  const isAllowed =
    /^[0-9]$/.test(e.key) ||
    e.key === "Backspace" ||
    e.key === "Tab" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Delete";
  if (!isAllowed) {
    e.preventDefault();
  }
};

export const pasteOnlyIntegers = (e) => {
  // Use in onPaste event AND include also allowOnlyIntegers in onKeyDown event
  const pasted = e.clipboardData.getData("text");
  if (!/^\d+$/.test(pasted)) {
    e.preventDefault();
  }
};
