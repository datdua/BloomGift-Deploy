import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToWishlist,
  deleteFromWishlist,
  deleteAllFromWishlist
} from "../../redux/actions/wishlistActions";
import { addToCart } from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Wishlist = ({
  location,
  cartItems,
  currency,
  addToCart,
  wishlistItems,
  deleteFromWishlist,
  deleteAllFromWishlist
}) => {
  const { addToast } = useToasts();
  const { pathname } = location;

  console.log("Wishlist Item:", wishlistItems)

  return (
    <Fragment>
      <MetaTags>
        <title>BloomGift | Wishlist</title>
        <meta
          name="description"
          content="Wishlist page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Wishlist
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Thêm Giỏ hàng</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem, key) => {
                            // Ensure wishlistItem is not null or undefined
                            if (!wishlistItem) return null;

                            const price = wishlistItem.price || 0;
                            const discount = wishlistItem.discount || 0;

                            const discountedPrice = getDiscountPrice(price, discount);
                            const finalProductPrice = (price * currency.currencyRate).toFixed(2);
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                            const cartItem = cartItems.find(item => item?.productID === wishlistItem?.productID);

                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + wishlistItem.productID}>
                                    <img
                                      className="img-fluid"
                                      src={
                                        wishlistItem.images && wishlistItem.images.length > 0
                                          ? process.env.PUBLIC_URL + wishlistItem.images[0].productImage
                                          : process.env.PUBLIC_URL + "/assets/img/product/flowers/1.jpg" // Fallback image if no image exists
                                      }
                                      alt={wishlistItem.productName}
                                    />
                                  </Link>
                                </td>
                                <td className="product-name text-center">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + wishlistItem.productID}>
                                    {wishlistItem.productName}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol + finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol + finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol + finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-wishlist-cart">
                                  {wishlistItem.affiliateLink ? (
                                    <a href={wishlistItem.affiliateLink} rel="noopener noreferrer" target="_blank">
                                      Buy now
                                    </a>
                                  ) : wishlistItem.variation && wishlistItem.variation.length >= 1 ? (
                                    <Link to={`${process.env.PUBLIC_URL}/product/${wishlistItem.productID}`}>
                                      Select option
                                    </Link>
                                  ) : wishlistItem.stock && wishlistItem.stock > 0 ? (
                                    <button
                                      onClick={() => addToCart(wishlistItem, addToast)}
                                      className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                                      disabled={cartItem !== undefined && cartItem.quantity > 0}
                                      title={cartItem !== undefined ? "Added to cart" : "Thêm Giỏ hàng"}
                                    >
                                      {cartItem !== undefined && cartItem.quantity > 0 ? "Added" : "Thêm Giỏ hàng"}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Out of stock
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => deleteFromWishlist(wishlistItem, addToast)}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/cuahang"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromWishlist(addToast)}>
                          Clear Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/cuahang"}>
                        Add Items
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast, quantityCount) => {
      dispatch(addToWishlist(item, addToast, quantityCount));
    },
    deleteFromWishlist: (item, addToast, quantityCount) => {
      dispatch(deleteFromWishlist(item, addToast, quantityCount));
    },
    deleteAllFromWishlist: addToast => {
      dispatch(deleteAllFromWishlist(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
