export const BASE_URL = "https://uptown-server.onrender.com/api";
// export const BASE_URL = "http://localhost:4000/api";

export const urlProduct = `${BASE_URL}/products`;
export const urlSubscribe = `${BASE_URL}/subscribe`;
export const urlChatbot = `${BASE_URL}/chatbot`;
export const urlOrder = `${BASE_URL}/order`;
export const urlBooking = `${BASE_URL}/booking`;
export const urlUser = `${BASE_URL}/user`;
export const urlMeasuring = `${BASE_URL}/measuring`;

export const fetchAllProducts = async () => {
  const res = await fetch(urlProduct);
  const data = await res.json();

  return data;
};
