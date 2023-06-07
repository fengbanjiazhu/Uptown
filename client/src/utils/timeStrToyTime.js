const timeStrTransfer = (dateString) => {
  const dateObj = new Date(dateString);
  const formattedDate = dateObj.toLocaleString();
  return formattedDate;
};

export default timeStrTransfer;
