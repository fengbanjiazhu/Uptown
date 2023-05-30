import React from "react";

const cartData = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  delItem: (id) => {},
  clearCart: () => {},
});

export default cartData;
