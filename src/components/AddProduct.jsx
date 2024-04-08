import React, { useState } from "react";
import styled from "styled-components";
import { addProducts, updateCart } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 50%;
  margin: auto;
  @media only screen and (max-width: 976px) {
    width: 90%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

export default function AddProduct({ editedItem }) {
  const [name, setName] = useState(editedItem ? editedItem.title : "");
  const [description, setDescription] = useState(
    editedItem ? editedItem.description : ""
  );
  const [price, setPrice] = useState(editedItem ? editedItem.price : "");
  const [thumbnail, setThumbnail] = useState(
    editedItem ? editedItem.thumbnail : ""
  );

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      title: name,
      description,
      price,
      thumbnail,
    };

    try {
      let response;
      if (editedItem) {
        // If editing an existing item
        response = await fetch(
          `https://my-json-server.typicode.com/jaiswalaryan/data/products/${editedItem.id}`,
          {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(updateCart({ ...editedItem, ...newData }));
      } else {
        // If adding a new item
        response = await fetch(
          "https://my-json-server.typicode.com/jaiswalaryan/data/products",
          {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        dispatch(addProducts([...products, data]));
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success(
        `${editedItem ? "Product Updated" : "Product Added"} Successfully`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setTimeout(() => navigate("/"), 2200);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(`Failed to ${editedItem ? "update" : "add"} product`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setName("");
    setDescription("");
    setPrice("");
    setThumbnail("");
  };

  return (
    <Container className="bg-light border border-1 border-dark mt-4 p-3 ">
      <ToastContainer />
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-black border-2 p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border-black border-2 p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="border-black border-2 p-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="border-black border-2 p-2"
          placeholder="Thumbnail image URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <button
          type="submit"
          className="border-black border-2 btn btn-primary align-self-end mt-4"
          style={{
            width: "9rem",
          }}
        >
          Add to products
        </button>
      </form>
    </Container>
  );
}
