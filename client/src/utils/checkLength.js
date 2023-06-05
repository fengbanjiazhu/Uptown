const checkLength = (data) => {
  const input = data.trim();
  if (input.length < 1) {
    return undefined;
  } else {
    return input;
  }
};
export default checkLength;
