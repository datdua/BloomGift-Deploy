import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost4 = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-4%2Fblog-4.png?alt=media&token=5db05a87-c775-4003-82db-563a2d03f8df"}
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
          <h3>Bí quyết cắm hoa hồng đẹp tại nhà</h3>
          <p>
          Hoa hồng luôn là biểu tượng của tình yêu và sự lãng mạn. Nếu bạn muốn mang vẻ đẹp của hoa hồng vào không gian sống của mình, hãy tham khảo một số bí quyết cắm hoa hồng đẹp tại nhà mà không tốn quá nhiều công sức nhé!
            {" "}          </p><br></br>
          <p>
          Đầu tiên, chọn hoa hồng tươi ngon là rất quan trọng. Khi mua, bạn nên chọn những bông hoa có cánh nở vừa phải, màu sắc tươi sáng và không bị héo úa. Sau đó, hãy chuẩn bị dụng cụ cắm hoa như bình, dao cắt hoa và nước sạch.

            {" "}          </p><br></br>
          <p>
          Một trong những cách cắm hoa hồng đơn giản nhưng đẹp là sử dụng bình thủy tinh trong suốt. Bạn có thể cắt ngắn cuống hoa và sắp xếp chúng theo hình dạng đối xứng. Bạn có thể thêm ít lá xanh để tạo sự cân đối và điểm nhấn cho bó hoa.

            {" "}          </p><br></br>
          <p>
          Ngoài ra, nếu bạn muốn tạo sự phá cách, hãy thử cắm hoa hồng trong những chiếc lọ nhỏ. Bạn có thể sắp xếp các bông hoa hồng với chiều cao khác nhau, tạo nên một bức tranh sinh động. Kết hợp thêm các loại hoa nhỏ khác như hoa cúc hay hoa baby để tăng thêm sự cuốn hút.

            {" "}          </p><br></br>
          <p>
          Đừng quên việc thay nước thường xuyên và cắt tỉa cuống hoa để giữ cho hoa hồng luôn tươi lâu. Với những mẹo cắm hoa đơn giản trên, bạn hoàn toàn có thể tự tay trang trí cho ngôi nhà của mình một cách dễ dàng và đẹp mắt.

            {" "}
          </p><br></br>
          <blockquote>
          Hãy cùng thử sức với nghệ thuật cắm hoa hồng tại nhà và tạo nên những tác phẩm đẹp mắt nhé!          </blockquote>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-4%2Fblog-details-4-1.png?alt=media&token=fd9d6cd6-b758-49ec-8642-faed29e31c00"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-4%2Fblog-details-4-2.png?alt=media&token=32660feb-6840-42aa-b693-7f62b7a83ff2"
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
        <Link to={process.env.PUBLIC_URL + "/blog-3"}>
          {" "}
          <i className="fa fa-angle-left" /> trở lại
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-5"}>
          tiếp theo <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost4;