const getUTCDateString = (dateString = '') => {
  let date;

  if (dateString) {
    // Parse the input date string
    date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string provided');
    }
  } else {
    // Use current date if no date string is provided
    date = new Date();
  }

  // Get UTC year, month, and day
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');

  // Format the string
  return `${year}-${month}-${day}`;
};

export { getUTCDateString };
