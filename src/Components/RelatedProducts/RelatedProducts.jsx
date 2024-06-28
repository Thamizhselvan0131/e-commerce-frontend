import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import {Item} from "../Item/Item";

export const RelatedProducts = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(() => {
    fetch("http://192.168.200.225:4000/api/v1/products/popularinwomen")
      .then((response) => response.json())
      .then((data) => setNew_collection(data.data.products));
  },[]);
  
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {new_collection.map((item, i) => {
           const image = item.image.replace(
            "http://localhost:4000/images/",
            "http://192.168.200.225:4000/images/"
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
