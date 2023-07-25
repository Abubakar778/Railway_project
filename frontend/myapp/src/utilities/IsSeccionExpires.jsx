const loginTime = new Date().getTime();
export const isSesstionExpires = (time) => {
  // Ensure time is converted to a number (if it's a string)
  const expirationTimeInMilliseconds = Number(time) * 60 * 1000;

  const expirationTimestamp = loginTime + expirationTimeInMilliseconds;

  // const currentTime = new Date().getTime();
  return expirationTimestamp > new Date().getTime() ? false : true;

  // If the time is not a valid number, consider the session as expired
};
