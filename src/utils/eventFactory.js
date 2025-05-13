import { strongPasswordRegex } from "./inputUtils";

export const handlePasswordChangeFactory = (
  setPassword,
  setPasswordIsValid
) => {
  // NOTE: combine with the regex in inputUtils.js in
  // the title and pattern props of the input in html
  return (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordIsValid(strongPasswordRegex.test(value));
  };
};
