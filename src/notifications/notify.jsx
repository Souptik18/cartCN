// Make sure to import ToastContainer from react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define showToastMessage function
export const showToastMessage = (message, type) => {
  if (typeof toast !== "undefined") {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
