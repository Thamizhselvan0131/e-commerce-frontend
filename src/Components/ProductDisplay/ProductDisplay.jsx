import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_iconn from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";


const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const image = product?.image
  ? product.image.replace(
      "http://localhost:4000/images/",
      "http://192.168.200.225:4000/images/"
    )
  : "";
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_iconn} alt="" />
          <img src={star_iconn} alt="" />
          <img src={star_iconn} alt="" />
          <img src={star_iconn} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight,usually knitted,pullovershirt,close-fitting and with a
          round neckline and short sleeves,worn as an undershit or outer
          garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size </h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product._id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category :</span>{product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
