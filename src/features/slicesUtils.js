export const initialErrorState = {
  hasError: false,
  message: '',
};

export const createNewError = (message) => {
  return {
    hasError: true,
    message,
  };
}