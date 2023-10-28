const currentProtocol = window.location.href;

export const urlProduct = `http://localhost:4000/api/products`;

export const fetchAllProducts = async () => {
  const res = await fetch(urlProduct);
  const data = await res.json();

  return data;
};
