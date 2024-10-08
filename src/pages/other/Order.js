import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { ArrowUpDown, CreditCard, X, Eye } from 'lucide-react';
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getOrder } from '../../redux/actions/orderAction.js'; // Assume this is where your action is
import { useHistory } from 'react-router-dom';

const OrderHistory = ({ orders, location }) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedOrders, setSortedOrders] = useState([]);
  const { pathname } = location;
  const history = useHistory();

  useEffect(() => {
    if (Array.isArray(orders)) {
      setSortedOrders(orders);
    } else {
      console.error('Orders prop is not an array:', orders);
      setSortedOrders([]);
    }
  }, [orders]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }

    setSortedOrders(prevOrders =>
      [...prevOrders].sort((a, b) => {
        if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    );
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const handleViewOrder = (orderID) => {
    history.push(`/chitietdonhang/${orderID}`)
  }
  const handlePayOrder = (orderID) => {
    history.push(`/thanhtoandonhang/${orderID}`)
  }

  return (
    <Fragment>
      <MetaTags>
        <title>BloomGift | Lịch sử đơn hàng</title>
        <meta
          name="description"
          content="Trang lịch sử đơn hàng của Flone - mẫu eCommerce React tối giản."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Lịch sử đơn hàng
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {!Array.isArray(sortedOrders) || sortedOrders.length === 0 ? (
              <p>Không có đơn hàng nào để hiển thị.</p>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th onClick={() => handleSort('orderID')} style={{ cursor: 'pointer' }}>
                            Mã đơn hàng <ArrowUpDown className="ml-2 h-4 w-4" />
                          </th>
                          <th onClick={() => handleSort('oderPrice')} style={{ cursor: 'pointer' }}>
                            Giá đơn hàng <ArrowUpDown className="ml-2 h-4 w-4" />
                          </th>
                          <th onClick={() => handleSort('orderStatus')} style={{ cursor: 'pointer' }}>
                            Trạng thái <ArrowUpDown className="ml-2 h-4 w-4" />
                          </th>
                          <th onClick={() => handleSort('startDate')} style={{ cursor: 'pointer' }}>
                            Ngày đặt hàng <ArrowUpDown className="ml-2 h-4 w-4" />
                          </th>
                          <th onClick={() => handleSort('deliveryDateTime')} style={{ cursor: 'pointer' }}>
                            Ngày giao hàng <ArrowUpDown className="ml-2 h-4 w-4" />
                          </th>
                          <th>Địa chỉ giao hàng</th>
                          <th>Số điện thoại</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedOrders.map((order) => (
                          <tr key={order.orderID}>
                            <td>{order.orderID}</td>
                            <td>{order.oderPrice.toFixed(2)}đ</td>
                            <td>{order.orderStatus}</td>
                            <td>{formatDate(order.startDate)}</td>
                            <td>{formatDate(order.deliveryDateTime)}</td>
                            <td>{order.deliveryAddress}</td>
                            <td>{order.phone}</td>
                            <td>
                              <div className="cart-shiping-update-wrapper">
                                <div className="cart-shiping-update">
                                  <div className='cart-clear'>
                                    <button className="cart-btn-2" type="button" onClick={() => handlePayOrder(order.orderID)}>
                                      <CreditCard className="h-4 w-4 mr-2" />
                                      Thanh toán
                                    </button>
                                  </div>
                                </div>
                                <div className="cart-clear">
                                  <button className="cart-btn-2" type="button">
                                    <X className="h-4 w-4 mr-2" />
                                    Hủy
                                  </button>
                                </div>
                                <div className="cart-clear">
                                  <button className="cart-btn-2" type="button" onClick={() => handleViewOrder(order.orderID)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Xem
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

// Main component to fetch orders and pass to OrderHistory
const OrderHistoryPage = (props) => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const location = { pathname: '/order-history' };

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await dispatch(getOrder((msg) => console.error(msg)));
      if (result) {
        setOrders(result);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return <OrderHistory orders={orders} location={location} />;
};

export default OrderHistoryPage;