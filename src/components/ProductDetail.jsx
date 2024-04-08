import React from "react";
import { addCart, CartItems } from "../actions";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail({ item }) {
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  function handleClick(item) {
    if (!item.qty) {
      const newItem = { ...item, qty: 1 }; // Create a new object with updated quantity
      dispatchCart(addCart(newItem));
      dispatchTotal(CartItems());
      toast.success("Item Added to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const newItem = { ...item };
      dispatchCart(addCart(newItem));
      dispatchTotal(CartItems());
      toast.success("Item Added to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className="container-sm d-flex flex-lg-row flex-column mt-4 gap-5">
      <ToastContainer />
      <img src={item.thumbnail} alt="error" id="detailAddedImage" />
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <span>{item.title}</span>
          <div className="d-flex gap-3 ">
            <span className="text-success">
              <span className="text-danger">Price:</span>Rs{item.price}
            </span>
            <span className="text-danger">
              Discount:
              <span className="text-success">
                {item.discountPercentage ? item.discountPercentage : ""}%
              </span>
            </span>
          </div>
          <span className="text-danger">
            Category:<span className="text-success">{item.category}</span>
          </span>
        </div>
        <div className="d-flex flex-column gap-3">
          <span className="text-danger">
            Stocks:
            <span className="text-success">{item.stock ? item.stock : ""}</span>
          </span>
          <span>{item.description}</span>
        </div>
        <div className="align-self-end">
          <button
            type="button"
            className="bg-slate-200 btn btn-primary"
            style={{
              width: "9rem",
            }}
            onClick={() => handleClick(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
