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
  const { orderID } = useParams(); // This line should be correct
  const { addToast } = useToasts();
  const location = useLocation();

  console.log('OrderDetail component rendered with orderID:', orderID);

  const orderState = useSelector(state => state.order);
  const { order, loading, error } = orderState || {};

  const fetchOrderDetail = useCallback(() => {
    console.log('fetchOrderDetail called with orderID:', orderID);
    if (orderID) {
      console.log('Fetching order details for orderID:', orderID);
      dispatch(getOrderDetail(orderID, addToast));
    }
  }, [orderID, dispatch, addToast]);

  useEffect(() => {
    console.log('useEffect called in OrderDetail component');
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

  // Safely access order properties with optional chaining and nullish coalescing
  const startDate = order?.startDate ?? 'N/A';
  const deliveryDateTime = order?.deliveryDateTime ?? 'N/A';

  const orderStatus = [
    { status: 'Đơn Hàng Đã Đặt', icon: <InboxOutlined />, time: startDate },
    { status: 'Đã Xác Nhận Thông Tin Thanh Toán', icon: <DollarCircleOutlined />},
    { status: 'Vận Chuyển', icon: <CarOutlined />, time: deliveryDateTime },
    { status: 'Chờ Giao Hàng', icon: <InboxOutlined /> },
    { status: 'Đánh Giá', icon: <StarOutlined /> },
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
        <meta
          name="description"
          content="Trang chi tiết đơn hàng của BloomGift - mẫu eCommerce React tối giản."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/donhang"}>Lịch sử đơn hàng</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location.pathname}>Chi tiết đơn hàng</BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
        <Breadcrumb/>
        <div className="order-detail-header">
          <h1 style={{textAlign:"center"}}>Đơn hàng # {order?.orderID}</h1>
        </div>
        <div className="container mt-4">
          <Card title={`MÃ ĐƠN HÀNG: ${order?.orderID ?? 'N/A'}`} extra={<span className="text-danger">{order?.orderStatus ?? 'N/A'}</span>}>
            <Row gutter={16}>
              <Col span={16}>
                <Timeline mode="alternate">
                  {orderStatus.map((item, index) => (
                    <Timeline.Item key={index} dot={item.icon} color={index < 3 ? 'green' : 'gray'}>
                      {item.status}
                      <p>{item.time}</p>
                    </Timeline.Item>
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
                <p><strong>Tổng tiền:</strong> ₫{order?.oderPrice ?? 'N/A'}</p>
              </Col>
            </Row>
          </Card>

          <Card title="Chi tiết đơn hàng" className="mt-4">
            <Table columns={columns} dataSource={order?.orderDetails ?? []} pagination={false} />
            <Row justify="end" className="mt-4">
              <Col>
                <p><strong>Tổng tiền hàng:</strong> ₫{order?.oderPrice ?? 'N/A'}</p>
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