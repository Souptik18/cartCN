import customFetch from "../apiCall";
import { useDispatch, useSelector } from "react-redux";
import { ProductToview, addCart, CartItems, addProducts } from "../actions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function ProductItem({ item }) {
  if (!item || !item.id) {
    return null;
  }

  const [addedItem, setAddedItem] = useState(true);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }

  function handleCart(item) {
    if (addedItem) {
      const newItem = { ...item, qty: 1 };
      dispatch(addCart(newItem));
      dispatch(CartItems());
      setAddedItem(false);
      toast.success("Item added to cart", {
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
      navigate("/cart");
    }
  }

  function handleEdit(item) {
    const updatedProducts = products.map((prod) => {
      if (prod.id === item.id) {
        return { ...prod, edit: false };
      }
      return prod;
    });
    dispatch(addProducts(updatedProducts));
  }

  function handleDeleteProduct(item) {
    const url = `https://my-json-server.typicode.com/Souptik18/cartCN/products/${item.id}`;
    customFetch(url, { method: "DELETE" }).then(() => {
      const updatedProducts = products.filter((prod) => prod.id !== item.id);
      dispatch(addProducts(updatedProducts));
      toast.warning("Item deleted", {
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
    });
  }

  function handleCancel(item) {
    const updatedItem = { ...item, edit: true };
    const updatedProducts = products.map((prod) =>
      prod.id === item.id ? updatedItem : prod
    );
    dispatch(addProducts(updatedProducts));
  }

  function handleSave(item) {
    const url = `https://my-json-server.typicode.com/Souptik18/cartCN/products/${item.id}`;
    customFetch(url, {
      body: {
        ...item,
        title,
        price,
        description,
        edit: true,
      },
      method: "PUT",
    }).then((data) => {
      const updatedProducts = products.map((prod) =>
        prod.id === item.id ? data : prod
      );
      dispatch(addProducts(updatedProducts));
      toast.success("Edit successful", {
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
    });
  }

  return (
    <div className="flex bg-blue-200 container-sm px-1 py-5 mt-4 rounded-xl flex-column flex-lg-row gap-3">
      <div className="d-flex container-sm gap-5">
        <img
          src={item.thumbnail}
          alt=""
          width={"200rem"}
          onClick={() => handleClick(item)}
        />
        <div className="d-flex flex-column gap-2">
          {item.edit ? (
            <span>{item.title}</span>
          ) : (
            <input
              type="text"
              value={title}
              className="w-50"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {item.edit ? (
            <span>Price {item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className=" p-2">
        {item.edit ? (
          <span className="">{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{ width: "20rem", height: "5rem" }}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-1">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "#F58055",
            }}
            onClick={() => handleCart(item)}
          >
            {addedItem ? "Add to Cart" : "Go to Cart "}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Cancel
          </button>
        )}
        {item.edit ? (
          <>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
                alt="Edit"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              />
            </span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/8556/8556073.png"
                alt="Delete"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteProduct(item)}
              />
            </span>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
