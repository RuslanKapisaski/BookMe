export const getErrorMessage = (err) => {
  if (err instanceof Error) {
    return err.message;
  } else if (err.error) {
    return err.error;
  } else {
    return JSON.stringify(err);
  }
};
