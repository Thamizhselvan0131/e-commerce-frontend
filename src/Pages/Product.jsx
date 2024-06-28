import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';
import { ShopContext } from '../Context/ShopContext';
import all_product from ".././Components/Assets/all_product"

 const product = () =>{
  // const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  console.log(productId);
  const product = all_product.find((e)=> e._id === Number(productId)); 
  return (

    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox  product={product}/>
      <RelatedProducts product={product}/>
    </div>
  )
}
export default product

