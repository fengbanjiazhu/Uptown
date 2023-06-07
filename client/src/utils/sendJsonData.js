const sendJsonData = async (url, inputData) => {
  const jsonData = JSON.stringify(inputData);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (error) {
    return error;
    console.log(error.message);
  }
};

export default sendJsonData;
