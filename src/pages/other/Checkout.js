import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { calculateShippingFee, createOrder } from "../../redux/actions/orderAction";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const Checkout = ({ location, cartItems, createOrder, calculateShippingFee }) => {
  const { pathname } = location;
  const history = useHistory();
  const { addToast } = useToasts();
  const [shippingFee, setShippingFee] = useState(0);
  const [isShippingCalculated, setIsShippingCalculated] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDiscountedPrice = (price, discount) => {
    return discount ? price - (price * discount / 100) : price;
  };
  let cartTotalPrice = 0;

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(item.price, item.discount);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const [formData, setFormData] = useState({
    specificAddress: '',
    deliveryProvince: 'Thành phố Hồ Chí Minh',
    deliveryDistrict: '',
    deliveryWard: '',
    phone: '',
    note: '',
    deliveryDateTime: new Date().toISOString(),
    promotionID: 0,
    point: 0,
    transfer: true,
    orderDetailRequests: cartItems.map(item => ({
      productID: item.productID,
      quantity: item.quantity,
      sizeID: item.selectedProductSize || 0,
    })),
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!isShippingCalculated) {
      addToast('Vui lòng tính phí vận chuyển trước khi đặt hàng', { 
        appearance: 'error', 
        autoDismiss: true 
      });
      return;
    }

    try {
      // Add shipping fee to the form data
      const orderDataWithShipping = {
        ...formData,
        shippingFee: shippingFee
      };

      const isSuccess = await createOrder(orderDataWithShipping, addToast);
      if (isSuccess) {
        history.push('/donhang');
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }, [formData, createOrder, addToast, history, isShippingCalculated, shippingFee]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://provinces.open-api.vn/api/p/79?depth=3');
        
        // Check if the response is successful
        if (response.status !== 200) {
          throw new Error('Failed to fetch location data');
        }
        
        // Access the data directly from response.data
        const data = response.data;
        setDistricts(data.districts);
        setLoading(false);
      } catch (err) {
        // Log the entire error object for better debugging
        console.error("Error fetching location data:", err);
        setError(err.message);
        setLoading(false);
        addToast('Không thể tải dữ liệu địa chỉ', { 
          appearance: 'error', 
          autoDismiss: true 
        });
      }
    };

    fetchLocationData();
  }, [addToast]);

  // Update wards when district changes
  useEffect(() => {
    if (formData.deliveryDistrict) {
      const selectedDistrict = districts.find(
        district => district.name === formData.deliveryDistrict
      );
      if (selectedDistrict) {
        setWards(selectedDistrict.wards);
        setFormData(prev => ({ ...prev, deliveryWard: '' }));
      }
    }
    setIsShippingCalculated(false);
    setShippingFee(0);
  }, [formData.deliveryDistrict, districts]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if(['specificAddress', 'deliveryDistrict', 'deliveryWard'].includes(name)) {
      setIsShippingCalculated(false);
      setShippingFee(0);
    }
  }, []);

  const handleCalculateShipping = async (e) => {
    e.preventDefault();

    if (!formData.deliveryDistrict || !formData.deliveryWard || !formData.specificAddress) {
      addToast('Vui lòng điền đầy đủ thông tin địa chỉ', { 
        appearance: 'error', 
        autoDismiss: true 
      });
      return;
    }

    const storeIDs = [...new Set(cartItems.map(item => item.storeID))];

    try {
      const fee = await calculateShippingFee(
        storeIDs,
        formData.specificAddress,
        formData.deliveryProvince,
        formData.deliveryDistrict,
        formData.deliveryWard,
        addToast
      );
      setShippingFee(fee || 0);
      setIsShippingCalculated(true);
    } catch (error) {
      console.error('Error calculating shipping fee:', error);
      setShippingFee(0);
      setIsShippingCalculated(false);
      addToast('Không thể tính phí vận chuyển', { 
        appearance: 'error', 
        autoDismiss: true 
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderOrderSummary = () => {
    const cartTotalPrice = getCartTotalPrice();
    const totalPriceWithShipping = cartTotalPrice + shippingFee;
  
    return (
      <div className="your-order-bottom">
        <ul>
          <li className="your-order-shipping">
            <span style={{fontWeight: "bold"}}>Phí vận chuyển:</span>
            <span style={{color: "#f56285"}}>
              {shippingFee > 0 ? formatCurrency(shippingFee) : "Chưa tính phí vận chuyển"}
            </span>
          </li>
          <li className="order-total">
            <span style={{fontWeight: "bold"}}>Tổng cộng:</span>
            <span style={{color: "#f56285"}}>
              {formatCurrency(totalPriceWithShipping)}
            </span>
          </li>
        </ul>
      </div>
    );
  };

  const renderShippingCalculator = () => (
    <div className="tax-wrapper">
      <p>Chọn địa chỉ giao hàng cụ thể để tính phí giao hàng</p>
      <div className="tax-select-wrapper">
        <div className="tax-select">
          <label>Thành phố</label>
          <select 
            className="email s-email s-wid" 
            name="deliveryProvince" 
            value={formData.deliveryProvince}
            disabled
          >
            <option>Thành phố Hồ Chí Minh</option>
          </select>
        </div>
        <div className="tax-select">
          <label>* Quận / Huyện</label>
          <select
            className="email s-email s-wid"
            name="deliveryDistrict"
            value={formData.deliveryDistrict}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Chọn Quận / Huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="tax-select">
          <label>* Phường / Xã</label>
          <select
            className="email s-email s-wid"
            name="deliveryWard"
            value={formData.deliveryWard}
            onChange={handleChange}
            disabled={!formData.deliveryDistrict || loading}
          >
            <option value="">Chọn Phường / Xã</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="cart-btn-2"
          type="button"
          onClick={handleCalculateShipping}
          disabled={!formData.deliveryDistrict || !formData.deliveryWard || !formData.specificAddress || loading}
        >
          {loading ? 'Đang tải...' : 'Tính phí giao hàng'}
        </button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <MetaTags>
        <title>BloomGift | Thanh toán</title>
        <meta name="description" content="Checkout page of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Thanh toán</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {loading ? (
              <div>Đang tải dữ liệu địa chỉ...</div>
            ) : cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Thông tin hoá đơn</h3>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Ngày và thời gian giao hàng</label>
                            <input
                              type="datetime-local"
                              name="deliveryDateTime"
                              value={formData.deliveryDateTime}
                              onChange={handleChange}
                              min={today}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Địa chỉ cụ thể</label>
                            <input
                              className="billing-address"
                              placeholder="Số nhà, tên đường"
                              type="text"
                              name="specificAddress"
                              value={formData.specificAddress}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Số điện thoại</label>
                            <input
                              type="number"
                              name="phone"
                              value={formData.phone || ''}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="additional-info-wrap">
                        <h4>Thông tin thêm</h4>
                        <div className="additional-info">
                          <label>Ghi chú</label>
                          <textarea
                            placeholder="Ghi chú cho đơn hàng của bạn."
                            name="note"
                            value={formData.note || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Đơn hàng</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Sản phẩm</li>
                              <li>Tổng tiền</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, index) => {
                                const discountedPrice = getDiscountedPrice(cartItem.price, cartItem.discount);
                                const finalDiscountedPrice = +(discountedPrice).toFixed(2);
                                cartTotalPrice += finalDiscountedPrice * cartItem.quantity;

                                const formattedPrice = new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0
                                }).format(finalDiscountedPrice * cartItem.quantity)

                                return (
                                  <li key={index}>
                                    <Link to={process.env.PUBLIC_URL + "/product/" + cartItem.productID}>
                                      {cartItem.productName} × {cartItem.quantity}
                                    </Link>
                                    <span>{formattedPrice}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          {renderOrderSummary()}
                        </div>
                        <div className="place-order">
                          <button
                            className="btn-hover"
                            type="submit"
                            disabled={!isShippingCalculated}
                            style={{
                              backgroundColor: !isShippingCalculated ? '#ccc' : undefined,
                              cursor: !isShippingCalculated ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {!isShippingCalculated ? 'Vui lòng tính phí vận chuyển' : 'Đặt hàng'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-tax" style={{ marginTop: "20px" }}>
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Chi phí giao hàng
                        </h4>
                      </div>
                      {renderShippingCalculator()}
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <h4>Không có sản phẩm nào trong giỏ hàng.</h4>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  location: PropTypes.object,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  createOrder: PropTypes.func,
  calculateShippingFee: PropTypes.func,
  addToast: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (formData, addToast) => dispatch(createOrder(formData, addToast)),
    calculateShippingFee: (storeIDs, specificAddress, deliveryProvince, deliveryDistrict, deliveryWard, addToast) =>
      dispatch(calculateShippingFee(storeIDs, specificAddress, deliveryProvince, deliveryDistrict, deliveryWard, addToast)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);