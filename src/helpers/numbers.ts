export const customNumberGenerator = () => {
  const randomDecimal = Math.random();
  return Math.floor(randomDecimal * (100 - 10 + 1)) + 10;
};

export const getRandomDate = () => {
  // Get the current date
  let currentDate = new Date();

  // Set the range for the past year
  let pastYear = currentDate.getFullYear() - 1;
  let pastDate = new Date(
    pastYear,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Calculate a random number of milliseconds within the past year
  let randomMilliseconds = Math.floor(
    Math.random() *
      ((currentDate as unknown as number) - (pastDate as unknown as number))
  );

  // Set the random date
  let randomDate = new Date(pastDate.getTime() + randomMilliseconds);

  return randomDate;
};

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

return`${day}.${month}.${year}`;
};
