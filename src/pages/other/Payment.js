import React, { useState } from 'react';
import { Card, Button, Input } from 'antd';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import '../other/Payment.css'
import CheckableTag from 'antd/es/tag/CheckableTag';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
const PaymentPage = ({ location }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [transactionCode, setTransactionCode] = useState('');

  const renderPaymentSteps = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold">Bước 1: Chuyển tiền {paymentMethod === 'momo' ? 'MoMo' : 'TPBank'}</h3>
        <div className="bg-gray-100 p-4 rounded">
          {/* Placeholder for QR code */}
          <div className="w-48 h-48 bg-gray-300 mx-auto"></div>
          <p className="text-center mt-2">LE VAN NHAC</p>
          <p className="text-center">0905269225</p>
          <p className="text-center">(Tối thiểu 20.000 đồng)</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold">Bước 2: Nhập mã giao dịch</h3>
        <Input 
          placeholder="Nhập mã giao dịch"
          value={transactionCode}
          onChange={(e) => setTransactionCode(e.target.value)}
        />
      </div>
      
      <div>
        <h3 className="font-bold">Bước 3: Xác nhận thanh toán</h3>
        <div className="flex items-center space-x-2">
          <CheckableTag id="terms" />
          <label htmlFor="terms">I'm not a robot</label>
        </div>
        <Button className="mt-2 w-full">Xác nhận đã thanh toán</Button>
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
                Nạp xu bằng ví điện tử MoMo
              </Button>
              <Button 
                className="w-full" 
                onClick={() => setPaymentMethod('tpbank')}
                type={paymentMethod === 'tpbank' ? 'primary' : 'default'}
              >
                Nạp xu bằng tài khoản ngân hàng (TPBank)
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