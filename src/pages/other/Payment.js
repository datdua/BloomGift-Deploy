import React, { useState, useEffect } from 'react';
import { Card, Button, Input, message, Typography, Radio, Space, Divider, Row, Col } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrderDetail } from '../../redux/actions/orderAction';
import paymentService from '../../redux/actions/paymentActions';
import { useToasts } from 'react-toast-notifications';
import ReCAPTCHA from 'react-google-recaptcha';
import './Payment.css';

const { Title, Text } = Typography;

const PaymentPage = ({ location }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [transactionCode, setTransactionCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [countdown, setCountdown] = useState(60); // 60 seconds countdown
  const { orderID } = useParams();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(getOrderDetail(orderID, (message) => {
          console.error(message);
          message.error(message);
        }));

        if (result) {
          setOrderData(result);
        }
      } catch (error) {
        console.error('Error fetching order detail:', error);
        message.error('Có lỗi khi tải thông tin đơn hàng');
      }
    };

    if (orderID) {
      fetchOrderData();
    }
  }, [orderID, dispatch]);

  // Countdown Logic
  useEffect(() => {
    if (countdown === 0) {
      message.warning('Thời gian thanh toán đã hết! Đang chuyển hướng về lịch sử đơn hàng.');
      history.push('/donhang'); // Navigate to Order History
    } else {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on unmount
    }
  }, [countdown, history]);

  const qrCodeImages = {
    momo: '/assets/img/QRCode/Momo.jpg',
    tpbank: '/assets/img/QRCode/TPBank.jpg'
  };

  const handlePaymentConfirmation = async () => {
    if (!transactionCode) {
      message.error('Vui lòng nhập mã giao dịch');
      return;
    }

    if (!isVerified) {
      message.error('Vui lòng xác nhận bạn không phải robot');
      return;
    }

    if (!orderData?.paymentID) {
      message.error('Không tìm thấy thông tin thanh toán');
      return;
    }

    const bankName = paymentMethod === 'momo' ? 'MOMO' : 'TPBANK';

    setIsLoading(true);
    try {
      await paymentService.confirmPayment(
        orderData.paymentID,
        bankName,
        transactionCode,
        addToast
      );

      setTransactionCode('');
      setPaymentMethod(null);
    } catch (error) {
      message.error('Xác nhận thanh toán thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaChange = (value) => {
    setIsVerified(!!value);
  };

  const renderPaymentSteps = () => (
    <Card className="payment-card centered-container">
      <Title level={4} className="text-center">Thông tin thanh toán</Title>
      <div className="payment-steps centered-content">
        <div className="step-item">
          <Title level={5} className="text-center">Bước 1: Chuyển tiền {paymentMethod === 'momo' ? 'MOMO' : 'TPBANK'}</Title>
          <div className="payment-image-container centered-content ">
            <img
              src={qrCodeImages[paymentMethod]}
              alt={`QR Code ${paymentMethod === 'momo' ? 'MOMO' : 'TPBANK'}`}
              className="payment-image"
            />
            <div className="text-center mt-4">
              <Text strong>TRAN THI PHUONG THAO</Text>
              {paymentMethod !== 'momo' && (
                <div className="mt-2">
                  <Text>TPBank</Text>
                  <br />
                  <Text>0905269225</Text>
                </div>
              )}
              <div className="mt-2">
                <Text>
                  {orderData ? (
                    `Số tiền thanh toán: ${orderData.oderPrice.toLocaleString()}đ`
                  ) : (
                    'Đang tải thông tin đơn hàng...'
                  )}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="step-item">
          <Title level={5} className="text-center">Bước 2: Nhập mã giao dịch</Title>
          <Input
            placeholder="Nhập mã giao dịch của bạn"
            value={transactionCode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,11}$/.test(value)) {
                setTransactionCode(value);
              }
            }}
            pattern="\d{11}"
            maxLength={11}
            className="w-full centered-input"
          />
          <Text type="secondary" className="block mt-2 text-center">
            *Vui lòng nhập mã giao dịch bạn nhận được sau khi chuyển khoản
          </Text>
          <br/>
          <Text type="danger" className="block mt-4 text-center">
            Vui lòng nhập đúng nội dung chuyển khoản: "DONHANG {orderID}"
          </Text>
        </div>
        <div className="step-item">
          <Title level={5} className="text-center">Bước 3: Xác nhận thanh toán</Title>
          <ReCAPTCHA
            sitekey="6LcIomkqAAAAAO6LeprJ5JWpm3aicMGGS5zW7WXt"
            onChange={handleCaptchaChange}
            className="recaptcha centered-recaptcha"
          />
          <Button
            type="primary"
            danger
            block
            size="large"
            onClick={handlePaymentConfirmation}
            loading={isLoading}
            disabled={!isVerified || transactionCode.length !== 11}
            className="confirm-button centered-button"
          >
            Xác nhận đã thanh toán
          </Button>
        </div>
      </div>
      <Text type="danger" className="block mt-4 text-center">
        Vui lòng thanh toán đơn hàng trong vòng 1 phút!
      </Text>
      <Text type="danger" className="block mt-2 text-center">
        {countdown} giây còn lại
      </Text>
    </Card>
  );

  const renderOrderSummary = () => (
    <Card className="h-full">
      <Title level={4}>Chọn phương thức thanh toán</Title>
      <Row className="mb-4">
        <Col span={12}>
          <Text type="secondary">ĐƠN HÀNG</Text>
        </Col>
        <Col span={12} className="text-right">
          <Text type="secondary">TỔNG TIỀN</Text>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col span={12}>
          <Text>DONHANG {orderID}</Text>
        </Col>
        <Col span={12} className="text-right">
          <Text>{orderData?.oderPrice?.toLocaleString()}đ</Text>
        </Col>
      </Row>

      <Divider />

      <Radio.Group
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
        className="w-full"
      >
        <Space direction="vertical" className="w-full">
          <Radio value="tpbank" className={paymentMethod === 'tpbank' ? 'selected-radio' : ''}>
            <Space>
              <WalletOutlined />
              <span>Chuyển khoản ngân hàng (TPBank)</span>
            </Space>
          </Radio>
          <Radio value="momo" className={paymentMethod === 'momo' ? 'selected-radio' : ''}>
            <Space>
              <WalletOutlined />
              <span>Quét Mã MoMo</span>
            </Space>
          </Radio>
        </Space>
      </Radio.Group>

      <div className="mt-6">
        <Text type="secondary" className="block mb-4">
          Sau khi chọn phương thức thanh toán, vui lòng làm theo các bước ở bên trái để hoàn tất thanh toán
        </Text>
      </div>
    </Card>
  );

  return (
    <div>
      <MetaTags>
        <title>BloomGift | Thanh toán </title>
        <meta
          name="description"
          content="Trang thanh toán của BloomGift - mẫu eCommerce React tối giản."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location.pathname}>Thanh toán</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="max-w-6xl mx-auto mt-10 px-4">
          <Row gutter={24}>
            <Col xs={24} md={paymentMethod ? 14 : 24}>
              {paymentMethod && renderPaymentSteps()}
            </Col>
            <Col xs={24} md={paymentMethod ? 10 : 24}>
              {renderOrderSummary()}
            </Col>
          </Row>
        </div>
      </LayoutOne>
    </div>
  );
};

export default PaymentPage;