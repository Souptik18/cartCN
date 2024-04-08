import { configureStore } from "@reduxjs/toolkit";

import {
  ADD_PRODUCTS,
  ADD_CART,
  PRODUCT_VIEW,
  CART_ITEMS,
  UPDATE_CART,
  DELETE_CART,
} from "../actions";

const initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    case ADD_CART:
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.cart.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].qty += 1;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.cart],
        };
      }

    case PRODUCT_VIEW:
      return {
        ...state,
        itemToDisplay: action.view,
      };

    case CART_ITEMS:
      const total = state.cart.reduce((acc, item) => acc + item.qty, 0);
      return {
        ...state,
        totalCart: total,
      };

    case UPDATE_CART:
      const updatedIndex = state.cart.findIndex(
        (item) => item.id === action.updatedItem.id
      );
      if (updatedIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[updatedIndex] = action.updatedItem;
        return {
          ...state,
          cart: updatedCart,
        };
      }
      return state; // If the item to update is not found, return the current state.

    case DELETE_CART:
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.item.id
      );
      return {
        ...state,
        cart: filteredCart,
      };

    default:
      return state;
  }
}
