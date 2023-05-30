import React, { useReducer } from "react";
import cartData from "./cartData";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let index;
  let currentItem;
  let newAmount;
  let newItems;
  switch (action.type) {
    case "ADD":
      index = state.items.findIndex((el) => el.id === action.item.id);
      currentItem = state.items[index];
      newAmount = state.totalAmount + action.item.price * action.item.amount;

      if (!currentItem) {
        newItems = state.items.concat(action.item);
      } else {
        newItems = [...state.items];
        const newItem = { ...currentItem, amount: currentItem.amount + action.item.amount };
        newItems[index] = newItem;
      }

      return { items: newItems, totalAmount: newAmount };
    case "DEL":
      index = state.items.findIndex((el) => el.id === action.id);
      currentItem = state.items[index];
      newAmount = state.totalAmount - currentItem.price;

      if (currentItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const newItem = { ...currentItem, amount: currentItem.amount - 1 };
        newItems = [...state.items];
        newItems[index] = newItem;
      }

      return { items: newItems, totalAmount: newAmount };
    case "CLEAR":
      return defaultCart;
    default:
      return state;
  }
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);

  const addToCart = (item) => {
    dispatchCart({ type: "ADD", item });
  };

  const delFromCart = (id) => {
    dispatchCart({ type: "DEL", id });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCart,
    delItem: delFromCart,
    clearCart: clearCartHandler,
  };

  return <cartData.Provider value={cartContext}>{props.children}</cartData.Provider>;
}

export default CartProvider;
