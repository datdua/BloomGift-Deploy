import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const BlogPosts = () => {
  return (
    <Fragment>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-1"}>
              <img
                src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-1.png?alt=media&token=26e799cb-bc5e-4a56-bc88-d05d8733e7ce"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
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
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-1"}>
              Bí quyết dưỡng hoa tươi lâu trong những ngày nắng nóng
              </Link>
            </h4>
            <p>
            Những ngày nắng nóng khiến cho hoa dễ bị héo úa, nhưng đừng lo, có nhiều bí quyết 
            giúp bạn giữ cho những bông hoa luôn tươi tốt ngay cả trong thời tiết oi bức này!
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-1"}>
                  đọc thêm
                </Link>
              </div>
              <div className="blog-share">
                <span>chia sẻ:</span>
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
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-2"}>
              <img
                src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-2%2Fblog-2.png?alt=media&token=ef458813-4f60-439f-b0bf-477ad929a6cb"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>08 Tháng 10, 2024</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-2"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-2"}>
              Chọn màu hoa thế nào cho phù hợp với độ tuổi?
              </Link>
            </h4>
            <p>
            Khi lựa chọn hoa để tặng cho một ai đó, bạn có bao giờ nghĩ đến việc màu sắc hoa cũng có thể phản ánh độ tuổi của họ không? Mỗi độ tuổi mang theo một phong cách.
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-2"}>
                  đọc thêm
                </Link>
              </div>
              <div className="blog-share">
                <span>chia sẻ:</span>
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
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-3"}>
              <img
                src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-3%2Fblog-3.png?alt=media&token=b5bb4a37-ffa4-475d-8dac-66fa32ec1c0e"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>08 Tháng 10, 2024</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-3"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-3"}>
              Tặng mẹ hoa gì vào ngày Phụ nữ Việt Nam?
              </Link>
            </h4>
            <p>
            Ngày 20 tháng 10 là dịp đặc biệt để tôn vinh những người phụ nữ, và không gì ý nghĩa hơn là tặng mẹ một bó hoa thật đẹp. Nhưng câu hỏi đặt ra là: Tặng mẹ hoa gì cho thật phù hợp?
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-3"}>
                  đọc thêm
                </Link>
              </div>
              <div className="blog-share">
                <span>chia sẻ:</span>
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
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-4"}>
              <img
                src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-4%2Fblog-4.png?alt=media&token=5db05a87-c775-4003-82db-563a2d03f8df"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>08 Tháng 10, 2024</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-4"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-4"}>
              Bí quyết cắm hoa hồng đẹp tại nhà
              </Link>
            </h4>
            <p>
            Hoa hồng luôn là biểu tượng của tình yêu và sự lãng mạn. Nếu bạn muốn mang vẻ đẹp của hoa hồng vào không gian sống của mình, hãy tham khảo một số bí quyết cắm hoa hồng đẹp tại nhà!
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-4"}>
                  đọc thêm
                </Link>
              </div>
              <div className="blog-share">
                <span>chia sẻ:</span>
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
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-5"}>
              <img
                src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-5%2Fblog-5.png?alt=media&token=5c4a78aa-9a19-4cbe-968a-357521eba447"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>08 Tháng 10, 2024</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-5"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-5"}>
              Những loài hoa phù hợp để tặng chúc mừng
              </Link>
            </h4>
            <p>
            Khi bạn muốn chúc mừng một ai đó, một bó hoa tươi tắn là cách thể hiện cảm xúc tuyệt vời. Hoa không chỉ đẹp mà còn mang ý nghĩa sâu sắc, thể hiện lòng chân thành và sự biết ơn.
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-5"}>
                  đọc thêm
                </Link>
              </div>
              <div className="blog-share">
                <span>chia sẻ:</span>
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
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-6"}>
              <img
                src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-6%2Fblog-6.png?alt=media&token=1305059a-869d-4e80-b2e9-ce0e833b545d"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>08 Tháng 10, 2024</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-6"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-6"}>
              Chọn màu hoa hồng sao cho đúng?
              </Link>
            </h4>
            <p>
            Hoa hồng luôn là biểu tượng của tình yêu và sự lãng mạn. Nếu bạn muốn mang vẻ đẹp của hoa hồng vào không gian sống của mình, hãy tham khảo một số bí quyết cắm hoa hồng đẹp tại nhà!
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-6"}>
                  đọc thêm
                </Link>
              </div>
              <div className="blog-share">
                <span>chia sẻ:</span>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPosts;
