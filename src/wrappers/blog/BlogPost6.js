import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost6 = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-6%2Fblog-6.png?alt=media&token=1305059a-869d-4e80-b2e9-ce0e833b545d"}
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
          <h3>Chọn màu hoa hồng sao cho đúng?</h3>
          <p>
          Hoa hồng luôn là biểu tượng của tình yêu và sự lãng mạn. Nhưng bạn có biết rằng mỗi màu hoa hồng đều mang trong mình một ý nghĩa riêng không? Hãy cùng mình tìm hiểu về các màu hoa hồng phổ biến và ý nghĩa của chúng nhé!            {" "}          </p><br></br>
          <p>
          Hoa hồng đỏ là biểu tượng cổ điển của tình yêu nồng nàn và sự đam mê. Nếu bạn muốn thể hiện tình cảm chân thành với người yêu của mình, hãy lựa chọn hoa hồng đỏ. Đây chính là món quà hoàn hảo cho những dịp kỷ niệm hoặc lễ Valentine.

            {" "}          </p><br></br>
          <p>
          Hoa hồng trắng lại mang ý nghĩa trong sáng, thuần khiết và thành kính. Đây là lựa chọn tuyệt vời cho những dịp như đám cưới, hay để bày tỏ lòng tôn kính với những người đã khuất. Màu trắng cũng tượng trưng cho sự khởi đầu mới, rất phù hợp cho những ai đang bước vào một mối quan hệ mới.

            {" "}          </p><br></br>
          <p>
          Hoa hồng vàng thường được hiểu là tình bạn và sự vui vẻ. Nếu bạn muốn gửi gắm thông điệp của sự thân thiết và niềm vui đến một người bạn, đừng ngần ngại chọn hoa hồng vàng nhé! Đây cũng là biểu tượng của sự tri ân.

            {" "}          </p><br></br>
          <p>
          Hoa hồng hồng mang lại cảm giác dịu dàng và tình cảm. Màu hồng thường được sử dụng để thể hiện sự ngưỡng mộ và tình yêu nhẹ nhàng. Đây là một lựa chọn hoàn hảo khi bạn chưa sẵn sàng cho một tình yêu sâu đậm nhưng vẫn muốn bày tỏ cảm xúc của mình.

            {" "}
          </p><br></br>
          <blockquote>
          Vậy là bạn đã có một cái nhìn tổng quan về ý nghĩa của các màu hoa hồng. Hy vọng rằng bạn sẽ chọn được màu hoa phù hợp để gửi gắm thông điệp của mình!          </blockquote>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-6%2Fblog-details-6-1.png?alt=media&token=f7069cd2-77c7-4d58-b79c-9dc67e48990c"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-6%2Fblog-details-6-2.png?alt=media&token=a31f451c-f114-42e5-befb-e80742af1dd7"
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
        <Link to={process.env.PUBLIC_URL + "/blog-5"}>
          {" "}
          <i className="fa fa-angle-left" /> trở lại
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-1"}>
          tiếp theo <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost6;