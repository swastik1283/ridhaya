import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = "10";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    console.log(BackendUrl)
  const addToCart = (itemId) => {
    if (!itemId) {
      toast.error("Select product");
      return;
    }
    const updatedCart = structuredClone(cartItems);
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    setCartItems(updatedCart);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const updateQuantity = (itemId, quantity) => {
    const updatedCart = structuredClone(cartItems);
    if (quantity === 0) {
      delete updatedCart[itemId];
    } else {
      updatedCart[itemId] = quantity;
    }
    setCartItems(updatedCart);
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/product/list`);
      console.log(response);
      setProducts(response.data.productRidaya);

    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    navigate,
    BackendUrl,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
