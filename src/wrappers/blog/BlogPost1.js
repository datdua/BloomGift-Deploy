import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost1 = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-1.png?alt=media&token=26e799cb-bc5e-4a56-bc88-d05d8733e7ce"}
          />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>08 Tháng 10, 2024</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-1"}>
                  4 <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h3>Bí quyết dưỡng hoa tươi lâu trong những ngày nắng nóng</h3>
          <p>
            Những ngày nắng nóng khiến cho hoa dễ bị héo úa, nhưng đừng lo, có nhiều bí quyết giúp bạn giữ cho những bông hoa luôn tươi tốt ngay cả trong thời tiết oi bức này!{" "}          </p><br></br>
          <p>
            Đầu tiên, trước khi cắm hoa, bạn nên cắt gốc hoa theo góc 45 độ. Điều này giúp hoa dễ dàng hấp thụ nước hơn. Hãy nhớ là bạn chỉ nên cắt bằng dao sắc, tránh dùng kéo gây dập gốc, làm giảm khả năng hút nước.{" "}          </p><br></br>
          <p>
            Tiếp theo, chọn nước cắm hoa thật sạch. Nếu có thể, hãy thêm một chút đường và giọt chanh vào nước. Đường cung cấp dinh dưỡng cho hoa, còn chanh giúp cân bằng độ pH của nước, giữ cho hoa tươi lâu hơn. Thay nước khoảng 2-3 ngày một lần để loại bỏ vi khuẩn và cung cấp nước sạch cho hoa.{" "}          </p><br></br>
          <p>
            Đặc biệt, trong những ngày nắng nóng, bạn hãy tìm cách giữ cho hoa ở nơi mát mẻ và thoáng gió. Tránh để hoa ở những vị trí có ánh nắng trực tiếp chiếu vào, vì điều này sẽ làm hoa nhanh héo. Nếu có thể, hãy để hoa trong phòng điều hòa hoặc gần quạt gió để duy trì độ ẩm và nhiệt độ lý tưởng.{" "}          </p><br></br>
          <p>
            Cuối cùng, hãy dành chút thời gian để ngắm hoa mỗi ngày. Khi thấy có cánh hoa héo, bạn hãy nhẹ nhàng cắt bỏ chúng. Điều này không chỉ giữ cho bó hoa đẹp mắt mà còn giúp các bông hoa khác hút nước dễ dàng hơn.{" "}
          </p>
          <blockquote>
            Hy vọng với những bí quyết này, hoa của bạn sẽ luôn tươi vui trong những ngày hè nắng nóng! Hãy thử nghiệm và tận hưởng vẻ đẹp của những bông hoa nhé!
          </blockquote>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-details-1.png?alt=media&token=9285aed5-6f10-45d0-93d3-6683b552690b"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-details-2.png?alt=media&token=9c34062c-9356-4da7-8a0a-ca17cb0b7c77"
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                .
              </Link>
            </li>
          </ul>
        </div>
        <div className="blog-share">
          <span>chia sẻ :</span>
          <div className="share-social">
            <ul>
              <li>
                <a className="facebook" href="//facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="instagram" href="//instagram.com">
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="next-previous-post">
        <Link to={process.env.PUBLIC_URL + "/blog-6"}>
          {" "}
          <i className="fa fa-angle-left" /> trở lại
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-2"}>
          tiếp theo <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost1;