export default function getErrorMessage(err) {
  switch (err.name) {
    case "ValidationError":
      const firstMessage = Object.values(err.errors)[0].message;
      return firstMessage;

    default:
      return err.message || "Something went wrong";
  }
}
