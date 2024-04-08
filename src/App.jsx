import Nav from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import CartItems from "./components/CartItems";
import ProductItemList from "./components/ProductListItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "./actions/index";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  const productDetailItem = useSelector((state) => state.itemToDisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Souptik18/cartCN/db"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const modifiedData = data.products.map((item) => ({
          ...item,
          edit: true,
        }));
        window.localStorage.setItem("products", JSON.stringify(modifiedData));
        const products = JSON.parse(window.localStorage.getItem("products"));
        dispatch(addProducts(products));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addProducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
