export function filterStr(array, paramKey, filterArea) {
  let temp;
  if (paramKey === "all") {
    temp = array;
  } else {
    temp = array.filter((item) => item[filterArea] === paramKey);
  }

  return temp;
}

export function filterArr(array, paramKey, filterArea) {
  let temp;
  if (paramKey === "all") {
    temp = array;
  } else {
    temp = array.filter((item) => item[filterArea].includes(paramKey));
  }

  return temp;
}
