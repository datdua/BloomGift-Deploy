import React, { useState, useEffect } from 'react';
import { Card, Button, Input, message } from 'antd';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import '../other/Payment.css';
import CheckableTag from 'antd/es/tag/CheckableTag';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrderDetail } from '../../redux/actions/orderAction';
import paymentService from '../../redux/actions/paymentActions';
import { useToasts } from 'react-toast-notifications';

const PaymentPage = ({ location }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [transactionCode, setTransactionCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRobot, setIsRobot] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const { orderID } = useParams();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

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

  const qrCodeImages = {
    momo: '/assets/img/QRCode/Momo.jpg',
    tpbank: '/assets/img/QRCode/TPBank.jpg'
  };

  const handlePaymentConfirmation = async () => {
    if (!transactionCode) {
      message.error('Vui lòng nhập mã giao dịch');
      return;
    }

    if (isRobot) {
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
    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentSteps = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold">Bước 1: Chuyển tiền {paymentMethod === 'momo' ? 'MOMO' : 'TPBANK'}</h3>
        <div className="bg-gray-100 p-4 rounded">
          <img 
            src={qrCodeImages[paymentMethod]} 
            alt={`QR Code ${paymentMethod === 'momo' ? 'MOMO' : 'TPBANK'}`}
            className="w-48 h-48 mx-auto"
            style={{maxWidth:'300px', maxHeight:'300px'}}
          />
          <p className="text-center mt-2">TRAN THI PHUONG THAO</p>
          {paymentMethod !== 'momo' && (
            <>
              <p className="text-center">TPBank</p>
              <p className="text-center">0905269225</p>
            </>
          )}
          <p className="text-center">
            {orderData ? (
              `Số tiền thanh toán: ${orderData.oderPrice.toLocaleString()}đ`
            ) : (
              'Đang tải thông tin đơn hàng...'
            )}
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold">Bước 2: Nhập mã giao dịch</h3>
        <Input 
          placeholder="Nhập mã giao dịch của bạn"
          value={transactionCode}
          onChange={(e) => setTransactionCode(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">
          *Vui lòng nhập mã giao dịch bạn nhận được sau khi chuyển khoản
        </p>
      </div>
      
      <div>
        <h3 className="font-bold">Bước 3: Xác nhận thanh toán</h3>
        <div className="flex items-center space-x-2">
          <CheckableTag 
            checked={!isRobot}
            onChange={(checked) => setIsRobot(!checked)}
          >
            I'm not a robot
          </CheckableTag>
        </div>
        <Button 
          className="mt-2 w-full"
          onClick={handlePaymentConfirmation}
          loading={isLoading}
          disabled={isRobot || !transactionCode}
        >
          Xác nhận đã thanh toán
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <MetaTags>
        <title>BloomGift | Thanh toán</title>
        <meta
          name="description"
          content="Trang thanh toán của BloomGift - mẫu eCommerce React tối giản."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location.pathname}>Thanh toán</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="max-w-md mx-auto mt-10">
          <Card className="centered-card">
            <Card.Meta
              title={<h2 className="text-2xl font-bold" style={{ textAlign: "center" }}>Chọn phương thức thanh toán</h2>}
            />
            <div className="button-container space-y-4">
              <Button 
                className="w-full" 
                onClick={() => setPaymentMethod('momo')}
                type={paymentMethod === 'momo' ? 'primary' : 'default'}
              >
                Thanh toán bằng ví điện tử MoMo
              </Button>
              <Button 
                className="w-full" 
                onClick={() => setPaymentMethod('tpbank')}
                type={paymentMethod === 'tpbank' ? 'primary' : 'default'}
              >
                Thanh toán bằng tài khoản ngân hàng (TPBank)
              </Button>
            </div>
            
            {paymentMethod && (
              <div className="mt-6">
                {renderPaymentSteps()}
              </div>
            )}
          </Card>
        </div>
      </LayoutOne>
    </div>
  );
};

export default PaymentPage;