export const checkStatusCode = (
  res: Response,
  messageOnError: string,
  statusToCheck = 200
) => {
  if (res.status !== statusToCheck) {
    throw new Error(messageOnError);
  }
};
