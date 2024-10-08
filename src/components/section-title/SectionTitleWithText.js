import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h1>Chào mừng đến với BloomGift</h1>
          <p>
          BloomGift là một website thương mại điện tử chuyên biệt, 
          nơi các cửa hàng hoa và quà tặng có thể dễ dàng đăng tải sản phẩm, quản lý bán hàng và vận hành kinh doanh hiệu quả. Chúng tôi mang đến giải pháp toàn diện giúp các doanh nghiệp nhỏ, tối ưu hóa quy trình bán hàng và quảng bá sản phẩm đến một lượng lớn khách hàng trực tuyến.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
