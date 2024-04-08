import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // Navigation hook
  const total = useSelector((state) => state.totalCart) || 0; // Fetching total cart items from Redux store and setting it to 0 if undefined or null

  return (
    <nav className="bg-blue-500 navbar navbar-expand-lg p-4 align-items-center">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white fs-3" href="#">
          Shoppify.in
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-light">
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addproducts" className="nav-link active text-light">
                Add a product
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-5 position-relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
              alt="error"
              width={"40rem"}
              onClick={() => navigate("/cart")} // Handling click event to navigate to cart
              style={{ cursor: "pointer" }}
            />
            {total !== 0 ? ( // Showing total cart items if not zero
              <p
                className="text-white bg-blue-800 rounded-circle position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  bottom: "24%",
                  left: "20%",
                }}
              >
                {total}
              </p>
            ) : (
              <p
                className="text-white bg-blue-800 rounded-circle position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  bottom: "24%",
                  left: "20%",
                }}
              >
                {total}
              </p>
            )}
            <img
              src="https://cdn-icons-png.flaticon.com/512/236/236832.png"
              alt="error"
              width={"44rem"}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
