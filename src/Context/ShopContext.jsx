import React, { createContext, useState, useEffect } from "react";
 
export const ShopContext = createContext(null);
 
const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});
 
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://192.168.200.225:4000/api/v1/products");
      const data = await response.json();
      setAll_Product(data.data.products);
      console.log(data.data.products);
    };
 
    const fetchCartItems = async () => {
      if (localStorage.getItem("auth-token")) {
        const response = await fetch("http://192.168.200.225:4000/api/v1/cart", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await response.json();
        setCartItems(data.cartItems);
      }
    };
 
    fetchProducts();
    fetchCartItems();
  }, []);
 
  const addToCart = async (itemId) => {
    if (localStorage.getItem("auth-token")) {
      const response = await fetch("http://192.168.200.225:4000/api/v1/cart/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      });
      const data = await response.json();
      setCartItems(data.cartItems);
    }
  };
 
  const removeFromCart = async (itemId) => {
    if (localStorage.getItem("auth-token")) {
      const response = await fetch("http://192.168.200.225:4000/api/v1/cart/remove", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      });
      const data = await response.json();
      setCartItems(data.cartItems);
    }
  };
 
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
 
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };
 
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
 
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
 
export default ShopContextProvider;