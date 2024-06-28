import React, { useEffect, useState } from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import { Item } from "../Item/Item";
const apiUrl=import.meta.env.VITE_API_URL
export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/products/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data.data.products));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          const image = item.image.replace(
            "http://localhost:4000/images/",
            `${apiUrl}/images/`
          );
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};
