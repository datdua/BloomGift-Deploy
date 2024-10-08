import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost3 = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-3%2Fblog-3.png?alt=media&token=b5bb4a37-ffa4-475d-8dac-66fa32ec1c0e"}
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
          <h3>Tặng mẹ hoa gì vào ngày Phụ nữ Việt Nam?</h3>
          <p>
          Ngày 20 tháng 10 là dịp đặc biệt để tôn vinh những người phụ nữ, và không gì ý nghĩa hơn là tặng mẹ một bó hoa thật đẹp. Nhưng câu hỏi đặt ra là: Tặng mẹ hoa gì cho thật phù hợp? Hãy cùng khám phá một vài loại hoa tuyệt vời nhé!

            {" "}          </p><br></br>
          <p>
          Đầu tiên, hoa hồng là lựa chọn hàng đầu. Hoa hồng không chỉ tượng trưng cho tình yêu mà còn thể hiện sự kính trọng. Một bó hoa hồng đỏ tươi sẽ thể hiện tình cảm mãnh liệt, trong khi hoa hồng vàng lại mang ý nghĩa của sự tôn vinh và ngưỡng mộ.

            {" "}          </p><br></br>
          <p>
          Tiếp theo, hoa cẩm chướng cũng là một sự lựa chọn hoàn hảo cho mẹ. Hoa cẩm chướng biểu trưng cho sự ngưỡng mộ và tình yêu thương. Những bông hoa với đủ màu sắc sẽ làm cho mẹ cảm thấy vui vẻ và ấm áp hơn.

            {" "}          </p><br></br>
          <p>
          Ngoài ra, hoa lan cũng rất thích hợp để tặng mẹ. Với vẻ đẹp sang trọng và thanh lịch, hoa lan không chỉ mang lại niềm vui mà còn thể hiện sự trân trọng dành cho mẹ. Một giò hoa lan tươi thắm sẽ khiến mẹ cảm thấy đặc biệt vào ngày này.

            {" "}          </p><br></br>
          <p>
          Cuối cùng, hoa violet hay hoa nhài cũng là những lựa chọn đẹp. Hoa violet tượng trưng cho tình yêu và sự chân thành, trong khi hoa nhài mang hương thơm ngọt ngào, gợi nhớ về những kỷ niệm đẹp trong gia đình.

            {" "}
          </p><br></br>
          <blockquote>
          Dù bạn chọn hoa gì, điều quan trọng nhất là tình cảm chân thành bạn gửi gắm qua món quà đó. Chúc bạn có một ngày 20 tháng 10 thật ý nghĩa bên mẹ!
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
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-3%2Fblog-details-3-1.png?alt=media&token=62e57656-1e6f-4a5a-bd92-cad58bfcbea8"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-3%2Fblog-details-3-2.png?alt=media&token=4ea478d5-01d2-4bd1-8ad6-976e874be57e"
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
        <Link to={process.env.PUBLIC_URL + "/blog-2"}>
          {" "}
          <i className="fa fa-angle-left" /> trở lại
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-4"}>
          tiếp theo <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost3;