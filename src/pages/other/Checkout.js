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

const Checkout = ({ location, cartItems, createOrder, calculateShippingFee }) => {
  const { pathname } = location;
  const history = useHistory();
  const { addToast } = useToasts();
  const [shippingFee, setShippingFee] = useState(0);
  const [isShippingCalculated, setIsShippingCalculated] = useState(false);
  const [isPickup, setIsPickup] = useState(false); // New state for pickup option

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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Reset shipping calculation when address-related fields change
    if (['specificAddress', 'deliveryDistrict', 'deliveryWard'].includes(name)) {
      setIsShippingCalculated(false);
      setShippingFee(0);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!isPickup && !isShippingCalculated) {
      addToast('Vui lòng tính phí vận chuyển trước khi đặt hàng', {
        appearance: 'error',
        autoDismiss: true
      });
      return;
    }

    try {
      // Add shipping fee to the form data only if not pickup
      const orderDataWithShipping = {
        ...formData,
        shippingFee: isPickup ? 0 : shippingFee,
        isPickup: isPickup
      };

      const isSuccess = await createOrder(orderDataWithShipping, addToast);
      if (isSuccess) {
        history.push('/donhang');
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }, [formData, createOrder, addToast, history, isShippingCalculated, shippingFee, isPickup]);

  const districts = {
    "Quận 1": ["Phường Tân Định", "Phường Đa Kao", "Phường Bến Nghé", "Phường Bến Thành", "Phường Nguyễn Thái Bình", "Phường Phạm Ngũ Lão", "Phường Cầu Ông Lãnh", "Phường Cô Giang", "Phường Nguyễn Cư Trinh", "Phường Cầu Kho"],
    "Quận 2": ["Phường Thảo Điền", "Phường An Phú", "Phường Bình An", "Phường Bình Trưng Đông", "Phường Bình Trưng Tây", "Phường Bình Khánh", "Phường An Khánh", "Phường Cát Lái", "Phường Thạnh Mỹ Lợi", "Phường An Lợi Đông", "Phường Thủ Thiêm"],
    "Quận 3": ["Phường 07", "Phường 14", "Phường 12", "Phường 11", "Phường 13", "Phường 06", "Phường 09", "Phường 10", "Phường 04", "Phường 05", "Phường 03", "Phường 02", "Phường 01"],
    "Quận Bình Tân": ["Phường Bình Hưng Hòa", "Phường Bình Hưng Hoà A", "Phường Bình Hưng Hoà B", "Phường Bình Trị Đông", "Phường Bình Trị Đông A", "Phường Bình Trị Đông B", "Phường Tân Tạo", "Phường Tân Tạo A", "Phường An Lạc", "Phường An Lạc A"],
    "Huyện Bình Chánh": ["Xã Phạm Văn Hai", "Xã Vĩnh Lộc A", "Xã Vĩnh Lộc B", "Xã Bình Lợi", "Xã Lê Minh Xuân", "Xã Bình Hưng", "Xã Phong Phú", "Xã An Phú Tây", "Xã Hưng Long", "Xã Đa Phước", "Xã Tân Quý Tây", "Xã Bình Chánh", "Xã Tân Kiên", "Xã Tân Nhựt", "Thị trấn Tân Túc"],
    "Huyện Cần Giờ": ["Thị trấn Cần Thạnh", "Xã Bình Khánh", "Xã Tam Thôn Hiệp", "Xã An Thới Đông", "Xã Thạnh An", "Xã Long Hòa", "Xã Lý Nhơn", "Xã Lý Thạnh", "Xã Tam Thôn Hiep", "Xã An Thới Đông", "Xã Thạnh An", "Xã Long Hòa", "Xã Lý Nhơn", "Xã Lý Thạnh"],
    "Quận 4": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 06", "Phường 08", "Phường 07", "Phường 09", "Phường 10", "Phường 13", "Phường 14", "Phường 15", "Phường 12", "Phường 05", "Phường 11"],
    "Quận 5": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 08", "Phường 09", "Phường 10", "Phường 07", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 6": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 08", "Phường 09", "Phường 10", "Phường 07", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 7": ["Phường Tân Thuận Đông", "Phường Tân Thuận Tây", "Phường Tân Kiểng", "Phường Tân Hưng", "Phường Bình Thuận", "Phường Tân Quy", "Phường Phú Thuận", "Phường Tân Phú", "Phường Tân Phong", "Phường Phú Mỹ", "Phường Tân Hưng", "Phường Bình Thuận", "Phường Tân Kiểng"],
    "Quận 8": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 9": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 10": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 11": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 12": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận Bình Thạnh": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận Gò Vấp": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận Phú Nhuận": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận Tân Bình": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận Tân Phú": ["Phường 01", "Phường 02", "Phường 03", "Phường 04", "Phường 05", "Phường 06", "Phường 07", "Phường 08", "Phường 09", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Thành phố Thủ Đức": ["Phường Linh Trung", "Phường Linh Tây", "Phường Linh Đông", "Phường Bình Chiểu", "Phường Tam Bình", "Phường Tam Phú", "Phường Hiệp Bình Phước", "Phường Hiệp Bình Chánh", "Phường Linh Chiểu", "Phường Linh Xuân", "Phường Linh Trung", "Phường Tam Phú", "Phường Bình Chiểu", "Phường Linh Đông", "Phường Tam Bình"],
    "Quận Tân Phú": ["Phường Hiệp Tân", "Phường Hiệp Phú", "Phường Hiệp Đà", "Phường Thạnh Lộc", "Phường Thạnh Xuân", "Phường Thạnh Lộc", "Phường Phú Thọ Hòa", "Phường Phú Thạnh", "Phường Phú Trung", "Phường Phú Thọ", "Phường Phú Trung", "Phường Phú Thạnh", "Phường Phú Thọ Hòa", "Phường Hiệp Đà", "Phường Hiệp Phú"],
  };

  const [selectedDistrict, setSelectedDistrict] = useState("Quận 1");
  const [wards, setWards] = useState(districts["Quận 1"]);

  useEffect(() => {
    setWards(districts[selectedDistrict] || []);
    setFormData(prev => ({ ...prev, deliveryWard: '' }));
    setIsShippingCalculated(false);
    setShippingFee(0);
  }, [selectedDistrict]);

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
      addToast('Đã tính phí vận chuyển thành công', {
        appearance: 'success',
        autoDismiss: true
      });
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
            <th>Phí vận chuyển</th>
            <td>
              {shippingFee > 0 ? formatCurrency(shippingFee) : "Chưa tính phí vận chuyển"}
            </td>
          </li>
          <li className="order-total">
            <th>Tổng cộng</th>
            <td>
              {formatCurrency(totalPriceWithShipping)}
            </td>
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
          <select className="email s-email s-wid" name="deliveryProvince" value={formData.deliveryProvince}>
            <option>Thành phố Hồ Chí Minh</option>
          </select>
        </div>
        <div className="tax-select">
          <label>* Quận / Huyện</label>
          <select
            className="email s-email s-wid"
            name="deliveryDistrict"
            value={formData.deliveryDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setFormData(prev => ({ ...prev, deliveryDistrict: e.target.value }));
            }}
          >
            {Object.keys(districts).map((district, index) => (
              <option key={index} value={district}>
                {district}
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
            onChange={(e) => setFormData(prev => ({ ...prev, deliveryWard: e.target.value }))}
          >
            <option value="">Chọn Phường / Xã</option>
            {wards.map((ward, index) => (
              <option key={index} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>
        <button
          className="cart-btn-2"
          type="button"
          onClick={handleCalculateShipping}
          disabled={!formData.deliveryDistrict || !formData.deliveryWard || !formData.specificAddress}
        >
          Tính phí giao hàng
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
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Thông tin hoá đơn</h3>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="billing-info mb- 20">
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
                            placeholder="Notes about your order, e.g. special notes for delivery."
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