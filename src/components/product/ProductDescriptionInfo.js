import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart, addToCartWithSize } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";

const ProductDescriptionInfo = ({
  product,
  currency,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToCartWithSize,
  addToWishlist,
  addToCompare
}) => {
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState(product.sizes[0]);
  const [productStock, setProductStock] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const { productId } = useParams();
  const productDefaultPrice = (product.price);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedProductColor(product.colour ? product.colour.trim() : "");
      setSelectedProductSize(product.sizes && product.sizes[0] ? product.sizes[0] : "");
      setProductStock(product.sizes && product.sizes[0] ? product.sizes[0].sizeQuantity : product.quantity);
    }
  }, [product]);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      addToast("Số lượng không thể bé hơn 1", { appearance: "error" });
      return;
    }
    if (newQuantity > productStock) {
      addToast(`Sản phẩm không đủ hàng! Chỉ còn ${productStock} sản phẩm tồn kho`, { appearance: "error", autoDismiss: true });
      return;
    }
    setQuantityCount(newQuantity);
  };

  const sizeID = selectedProductSize ? selectedProductSize.sizeID : null;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      addToast("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", { appearance: "error", autoDismis: true });
      return;
    }
    if (product.sizes && product.sizes.length > 0) {
      if (!selectedProductSize) {
        addToast("Vui lòng chọn kích thước", { appearance: "error" });
        return;
      }
      addToCartWithSize(
        product,
        addToast,
        quantityCount,
        sizeID
      );
    } else {
      addToCart(
        product,
        addToast,
        quantityCount
      );
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSizeChange = (sizeOption) => {
    setSelectedProductSize(sizeOption);
    setProductStock(sizeOption.sizeQuantity);
    setQuantityCount(1);
  };

  return (
    <div className="product-details-content ml-70">
      <h2>{product.productName}</h2>
      <div className="product-details-price">
        {product.discount > 0 ? (
          <Fragment>
          <span>
            {selectedProductSize
              ? (selectedProductSize.price * (1 - product.discount / 100)) + "VND"
              : (productDefaultPrice * (1 - product.discount / 100)) + "VND"}{" "}
          </span>{" "}
          <span className="old">
            {selectedProductSize
              ? selectedProductSize.price + "VND"
              : productDefaultPrice + "VND"}
          </span>
        </Fragment>
        ) : (
          <span>
            {selectedProductSize
              ? selectedProductSize.price + "VND"
              : product.price + "VND"}
          </span>
        )}
      </div>

      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>

      {/* <div className="pro-details-size-color"> */}
        {/* {product.colour && (
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              <label className={`pro-details-color-content--single ${selectedProductColor}`}>
                <input
                  type="radio"
                  value={selectedProductColor}
                  checked={true}
                  readOnly
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        )} */}

        {/* {product.sizes && product.sizes.length > 0 && (
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.sizes.map((sizeOption, key) => (
                <label
                  className={`pro-details-size-content--single`}
                  key={key}
                >
                  <input
                    type="radio"
                    value={sizeOption.sizeID}
                    checked={sizeOption.sizeID === selectedProductSize.sizeID}
                    onChange={() => handleSizeChange(sizeOption)}
                  />
                  <span className="size-name">{sizeOption.text.trim()}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div> */}

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() => handleQuantityChange(quantityCount - 1)}
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() => handleQuantityChange(quantityCount + 1)}
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          {productStock > 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={productCartQty >= productStock}
            >
              {" "}
              Thêm Giỏ hàng{" "}
            </button>
          ) : (
            <button disabled>Out of Stock</button>
          )}
        </div>
        <div className="pro-details-wishlist">
          <button
            className={wishlistItem !== undefined ? "active" : ""}
            disabled={wishlistItem !== undefined}
            title={
              wishlistItem !== undefined
                ? "Added to wishlist"
                : "Add to wishlist"
            }
            onClick={() => addToWishlist(product, addToast)}
          >
            <i className="pe-7s-like" />
          </button>
        </div>
        <div className="pro-details-compare">
          <button
            className={compareItem !== undefined ? "active" : ""}
            disabled={compareItem !== undefined}
            title={
              compareItem !== undefined
                ? "Added to compare"
                : "Add to compare"
            }
            onClick={() => addToCompare(product, addToast)}
          >
            <i className="pe-7s-shuffle" />
          </button>
        </div>
      </div>

      <div className="pro-details-meta">
        <span>Danh mục:</span>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/cuahang"}>
              {product.categoryName}
            </Link>
          </li>
        </ul>
      </div>
      <div className="pro-details-meta">
        <span>Cửa hàng:</span>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/cuahang"}>
              {product.storeName}
            </Link>
          </li>
        </ul>
      </div>
      <div className="pro-details-meta">
        <span>Trạng thái:</span>
        <ul>
          <li>{product.productStatus ? "Đang hoạt động" : "Không hoạt động"}</li>
        </ul>
      </div>
      <div className="pro-details-meta">
        <span>Số lượng:</span>
        <ul>
          <li>{productStock}</li>
        </ul>
      </div>
      <div className="pro-details-meta">
        <span>Đã bán:</span>
        <ul>
          <li>{product.sold}</li>
        </ul>
      </div>
      <div className="pro-details-meta">
        <span>Ngày tạo:</span>
        <ul>
          <li>{new Date(product.createDate).toLocaleDateString()}</li>
        </ul>
      </div>

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToCartWithSize: (item, addToast, quantityCount, selectedProductSize) => {
      dispatch(addToCartWithSize(item, addToast, quantityCount, selectedProductSize));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);