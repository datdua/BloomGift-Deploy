import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { deleteFromCart, getCartItems } from "../../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const MenuCart = ({ cartData, currency }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const cartItemsArray = Object.values(cartData);
  const totalPriceCart = cartItemsArray.reduce((total, item) => total + (item.price * item.quantity), 0);
  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
 
  useEffect(() => {
    dispatch(getCartItems(addToast));
  }, [dispatch, addToast]);

  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item, addToast));
  };
 
  return (
    <div className="shopping-cart-content">
      {cartItemsArray.length > 0 ? (
        <Fragment>
          <ul>
            {cartItemsArray.map((item) => (
              <li className="single-shopping-cart" key={item.productID}>
                <div className="shopping-cart-img">
                  <Link to={`${process.env.PUBLIC_URL}/product/${item.productID}`}>
                    <img
                      alt={item.productName}
                      src={item.image1}
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className="shopping-cart-title">
                  <h4>
                    <Link to={`${process.env.PUBLIC_URL}/product/${item.productID}`}>
                      {item.productName}
                    </Link>
                  </h4>
                  <h6>SL: {item.quantity}</h6>
                  <span>{formatMoney(item.price) + " VND"}</span>
                  <div className="cart-item-variation">
                    {/* <span>Kích thước: {item.sizeText}</span> */}
                    <span>Cửa hàng: {item.storeName}</span>
                  </div>
                </div>
                <div className="shopping-cart-delete">
                  <button onClick={() => handleDeleteFromCart(item)}>
                    <i className="fa fa-times-circle" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Tổng tiền:{" "}
              <span className="shop-total">
                {formatMoney(totalPriceCart) + " VND"}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Xem giỏ hàng
            </Link>
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/checkout"}>
              Thanh toán
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Không có sản phẩm trong giỏ hàng</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currency: PropTypes.object,
};

export default MenuCart;
