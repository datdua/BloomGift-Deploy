import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
          {product.featured ? <span className="purple">Featured</span> : ""}
          {product.storeName ? <span className="yellow">{product.storeName}</span>: ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {product.image ? (
          <img
            src={process.env.PUBLIC_URL + product.image[0]}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
