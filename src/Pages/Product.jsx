import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../Components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";
import { ShopContext } from "../Context/ShopContext";

const product = () => {
  // const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  console.log(productId);
  // const product = all_product.find((e)=> e.id === Number(productId));
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.200.225:4000/api/v1/products/${productId}`)
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
