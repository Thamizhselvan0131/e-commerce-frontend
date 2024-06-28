import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../Components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";
import { ShopContext } from "../Context/ShopContext";
const apiUrl=import.meta.env.VITE_API_URL

const product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data.product);
      });
  }, []);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts product={product} />
    </div>
  );
};
export default product;
