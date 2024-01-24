export const checkBirthdate = (dateString) => {
  const enteredDate = new Date(dateString);

  // Extract month and day from the entered date
  const month = enteredDate.getMonth() + 1; // Adding 1 as getMonth() returns 0-11
  const day = enteredDate.getDate();

  // Check if date is between December 1st and March 31st
  if (
    (month === 12 && day >= 1) ||
    month === 1 ||
    month === 2 ||
    (month === 3 && day <= 31)
  ) {
    return true;
  }

  return false;
};
