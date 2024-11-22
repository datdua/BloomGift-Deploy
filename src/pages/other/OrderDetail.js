import React, { useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getOrderDetail } from '../../redux/actions/orderAction';
import { useToasts } from 'react-toast-notifications';
import { Card, Row, Col, Timeline, Spin, Table } from 'antd';
import { CheckCircleOutlined, DollarCircleOutlined, CarOutlined, InboxOutlined, CloseCircleOutlined, LoadingOutlined, TruckOutlined, HistoryOutlined } from '@ant-design/icons';
import { MetaTags } from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';

const formatDateTime = (dateTime) => {
  if (!dateTime) return 'N/A';
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { orderID } = useParams();
  const { addToast } = useToasts();
  const location = useLocation();

  const orderState = useSelector(state => state.order);
  const { order, loading, error } = orderState || {};

  const fetchOrderDetail = useCallback(() => {
    if (orderID) {
      dispatch(getOrderDetail(orderID, addToast));
    }
  }, [orderID, dispatch, addToast]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail, location.pathname]);

  if (loading) {
    return <Spin size="large" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: '100vh',
    }} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!order) {
    return <p>Không có đơn hàng</p>;
  }

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const startDate = formatDateTime(order?.startDate);
  const deliveryDateTime = formatDateTime(order?.deliveryDateTime);

  // Define order status progression
  const STATUS_PROGRESSION = {
    'Chưa thanh toán': ['Chưa thanh toán'],
    'Đang chờ xác nhận': ['Chưa thanh toán','Đang chờ xác nhận'],
    'Đã hủy': ['Chưa thanh toán','Đã hủy'],  
    'Đã thanh toán': ['Chưa thanh toán', 'Đang chờ xác nhận', 'Đã thanh toán'],
    'Đang thực hiện': ['Chưa thanh toán', 'Đang chờ xác nhận', 'Đã thanh toán', 'Đang thực hiện'],
    'Đang vận chuyển': ['Chưa thanh toán','Đang chờ xác nhận', 'Đã thanh toán', 'Đang thực hiện', 'Đang vận chuyển'],
    'Đã hoàn tất': ['Chưa thanh toán', 'Đang chờ xác nhận', 'Đã thanh toán', 'Đang thực hiện', 'Đang vận chuyển', 'Đã hoàn tất']
  };

  const orderStatus = [
    { 
      status: 'Đơn Hàng Đã Đặt', 
      icon: <InboxOutlined />, 
      time: startDate, 
      statusKey: 'Chưa thanh toán', 
    },
    { 
      status: 'Đơn Hàng Bị Huỷ', 
      icon: <CloseCircleOutlined />, 
      statusKey: 'Đã hủy'
    },
    {
      status: 'Đang Chờ Xác Nhận',
      icon: <HistoryOutlined />,
      statusKey: 'Đang chờ xác nhận'
    },
    { 
      status: 'Đã Xác Nhận Thông Tin Thanh Toán', 
      icon: <DollarCircleOutlined />, 
      statusKey: 'Đã thanh toán'
    },
    { 
      status: 'Người Bán Đang Chuẩn Bị Hàng', 
      icon: <LoadingOutlined />, 
      statusKey: 'Đang thực hiện'
    },
    { 
      status: 'Đang Vận Chuyển', 
      icon: <TruckOutlined />, 
      time: deliveryDateTime, 
      statusKey: 'Đang vận chuyển'
    },
    { 
      status: 'Đã giao hàng', 
      icon: <CheckCircleOutlined />, 
      statusKey: 'Đã hoàn tất'
    },
  ];

  const columns = [
    { title: 'Sản phẩm', dataIndex: 'productName', key: 'productName' },
    { title: 'Cửa hàng', dataIndex: 'storeName', key: 'storeName' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Đơn giá', dataIndex: 'productTotalPrice', key: 'productTotalPrice' },
  ];

  // Determine if a status should be colored green or red
  const getStatusColor = (statusKey) => {
    if (statusKey === 'Đã hủy' && order.orderStatus === 'Đã hủy') {
      return 'red';
    }
    const currentProgressionSteps = STATUS_PROGRESSION[order.orderStatus] || [];
    return currentProgressionSteps.includes(statusKey) ? 'green' : 'gray';
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Chi tiết đơn hàng | Bloom Gift</title>
        <meta name="description" content="Trang chi tiết đơn hàng của BloomGift - mẫu eCommerce React tối giản." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/donhang"}>Lịch sử đơn hàng</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location.pathname}>Chi tiết đơn hàng</BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
        <Breadcrumb />
        <div className="order-detail-header">
          <h1 style={{ textAlign: "center" }}>Đơn hàng # {order?.orderID}</h1>
        </div>
        <div className="container mt-4">
          <Card title={`MÃ ĐƠN HÀNG: ${order?.orderID ?? 'N/A'}`} extra={<span className="text-danger">{order?.orderStatus ?? 'N/A'}</span>}>
            <Row gutter={16}>
              <Col span={16}>
                <Timeline mode="alternate">
                  {orderStatus.map((item, index) => (
                    (item.statusKey !== 'Đã hủy' || order.orderStatus === 'Đã hủy') && (
                      <Timeline.Item 
                        key={index} 
                        dot={item.icon} 
                        color={getStatusColor(item.statusKey)}
                      >
                        {item.status}
                        {item.time && <p>{item.time}</p>}
                      </Timeline.Item>
                    )
                  ))}
                </Timeline>
              </Col>
              <Col span={8}>
                <p>Đơn hàng sẽ được giao cho đơn vị vận chuyển trước {deliveryDateTime}. Bạn có thể kiểm tra hàng sau khi thanh toán.</p>
              </Col>
            </Row>
          </Card>

          <Card title="Thông tin đơn hàng" className="mt-4">
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Địa chỉ nhận hàng:</strong> {order?.deliveryAddress ?? 'N/A'}</p>
                <p><strong>Số điện thoại:</strong> {order?.phone ?? 'N/A'}</p>
              </Col>
              <Col span={12}>
                <p><strong>Phương thức thanh toán:</strong> COD</p>
                <p><strong>Tổng tiền:</strong> {formatMoney(order?.oderPrice ?? 'N/A')} VND</p>
              </Col>
            </Row>
          </Card>

          <Card title="Chi tiết đơn hàng" className="mt-4">
            <Table columns={columns} dataSource={order?.orderDetails ?? []} pagination={false} />
            <Row justify="end" className="mt-4">
              <Col>
                <p><strong>Tổng tiền hàng:</strong> {formatMoney(order?.oderPrice ?? 'N/A')} VND</p>
              </Col>
            </Row>
          </Card>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderDetail;