import React, { useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getOrderDetail } from '../../redux/actions/orderAction';
import { useToasts } from 'react-toast-notifications';
import { Card, Row, Col, Timeline, Button, Table, Spin } from 'antd';
import { CheckCircleOutlined, DollarCircleOutlined, CarOutlined, InboxOutlined, StarOutlined } from '@ant-design/icons';
import { MetaTags } from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';

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
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!order) {
    return <p>No order details available</p>;
  }
  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const startDate = order?.startDate ?? 'N/A';
  const deliveryDateTime = order?.deliveryDateTime ?? 'N/A';

  const orderStatus = [
    { status: 'Đơn Hàng Đã Đặt', icon: <InboxOutlined />, time: startDate, enabled: true },
    { status: 'Đơn Hàng Bị Huỷ', icon: <InboxOutlined />, enabled: order.orderStatus === 'Đã hủy' },
    { status: 'Đã Xác Nhận Thông Tin Thanh Toán', icon: <DollarCircleOutlined />, enabled: order.orderStatus === 'Xác nhận đơn hàng' },
    { status: 'Người Bán Đang Chuẩn Bị Hàng', icon: <DollarCircleOutlined />, enabled: order.orderStatus === 'Đang thực hiện' }, 
    { status: 'Đang Vận Chuyển', icon: <CarOutlined />, time: deliveryDateTime, enabled: order.orderStatus === 'Đang giao hàng' },
    { status: 'Đã giao hàng', icon: <InboxOutlined />, enabled: order.orderStatus === 'Đã hoàn tất' },
  ];

  const columns = [
    { title: 'Sản phẩm', dataIndex: 'productName', key: 'productName' },
    { title: 'Cửa hàng', dataIndex: 'storeName', key: 'storeName' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Đơn giá', dataIndex: 'productTotalPrice', key: 'productTotalPrice' },
  ];

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
                    item.enabled && (
                      <Timeline.Item key={index} dot={item.icon} color={index < 3 ? 'green' : 'gray'}>
                        {item.status}
                        <p>{item.time}</p>
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
          <Row justify="end" className="mt-4">
            <Col>
              <Button type="primary" className="mr-2">Liên Hệ Người Bán</Button>
              <Button>Hủy Đơn Hàng</Button>
            </Col>
          </Row>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderDetail;