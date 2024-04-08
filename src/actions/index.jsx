// actions.js

export const ADD_PRODUCTS = "Add_products";
export const ADD_CART = "Add_cart";
export const PRODUCT_VIEW = "Product_view";
export const CART_ITEMS = "Cart_items";
export const UPDATE_CART = "update_cart";
export const DELETE_CART = "delete_cart";

// Define action creators

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function addCart(cart) {
  return {
    type: ADD_CART,
    cart,
  };
}

export function ProductToview(item) {
  return {
    type: PRODUCT_VIEW,
    view: item,
  };
}

export function CartItems() {
  return {
    type: CART_ITEMS,
  };
}

export function updateCart(item) {
  return {
    type: UPDATE_CART,
    updatedItem: item,
  };
}

export function deleteCart(item) {
  return {
    type: DELETE_CART,
    item,
  };
}
