import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);
const apiUrl=import.meta.env.VITE_API_URL

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/v1/products`
        );
        const data = await response.json();
        setAll_Product(data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCartItems = async () => {
      if (localStorage.getItem("auth-token")) {
        try {
          const response = await fetch(
            `${apiUrl}/api/v1/cart`,
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );
          const data = await response.json();
          setCartItems(data.items || []);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const addToCart = async (itemId) => {
    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch(
          `${apiUrl}/api/v1/cart/add`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: itemId }),
          }
        );
        const data = await response.json();

        // Update cart items with the new data from the server
        setCartItems(data.items);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch(
          `${apiUrl}/api/v1/cart/remove/${itemId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        const data = await response.json();
   
        // Update cartItems by filtering out the removed item
        setCartItems(cartItems.filter(item => item._id !== itemId));
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((cartItem) => {
      totalAmount += cartItem.product.new_price * cartItem.quantity;
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return cartItems.length;
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
