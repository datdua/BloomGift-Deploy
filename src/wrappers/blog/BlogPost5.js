import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost5 = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-5%2Fblog-5.png?alt=media&token=5c4a78aa-9a19-4cbe-968a-357521eba447"}
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
          <h3>Những loài hoa phù hợp để tặng chúc mừng</h3>
          <p>
          Khi bạn muốn chúc mừng một ai đó, một bó hoa tươi tắn là cách thể hiện cảm xúc tuyệt vời. Hoa không chỉ đẹp mà còn mang ý nghĩa sâu sắc, thể hiện lòng chân thành và sự biết ơn. Dưới đây là một số loài hoa phù hợp để tặng chúc mừng.
          {" "}          </p><br></br>
          <p>
          Hoa hồng: Không còn gì phải bàn cãi, hoa hồng là biểu tượng của tình yêu và sự trân trọng. Đối với những dịp chúc mừng như sinh nhật, thăng chức hay kỷ niệm, những bông hoa hồng đỏ, hồng phấn hoặc vàng đều mang ý nghĩa may mắn và hạnh phúc.

            {" "}          </p><br></br>
          <p>
          Hoa lily: Với hình dáng thanh thoát và hương thơm dịu dàng, hoa lily thường được tặng để chúc mừng những thành công lớn trong công việc hay học tập. Hoa lily màu trắng tượng trưng cho sự thuần khiết và cao quý.

            {" "}          </p><br></br>
          <p>
          Hoa cúc: Ở Việt Nam, hoa cúc là loài hoa phổ biến trong các dịp lễ hội và chúc mừng. Màu vàng rực rỡ của hoa cúc mang lại cảm giác vui tươi, hạnh phúc, rất thích hợp để chúc mừng bạn bè, người thân.

            {" "}          </p><br></br>
          <p>
          Hoa lan: Mang vẻ đẹp sang trọng, hoa lan là sự lựa chọn hoàn hảo cho các dịp chúc mừng quan trọng như khai trương, tốt nghiệp. Hoa lan không chỉ biểu trưng cho sự phát triển mà còn cho tình bạn quý giá.

            {" "}
          </p><br></br>
          <p>
          Hoa đồng tiền: Được coi là biểu tượng của sự thịnh vượng, hoa đồng tiền với những gam màu rực rỡ sẽ đem lại niềm vui và hy vọng trong những dịp chúc mừng. Tặng hoa đồng tiền như cách gửi gắm lời chúc phúc và may mắn đến người nhận.

            {" "}
          </p><br></br>
          <blockquote>
          Lựa chọn hoa nào cũng cần phù hợp với sở thích của người nhận để gửi gắm thông điệp chân thành nhất trong trái tim bạn!          </blockquote>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-5%2Fblog-details-5-1.png?alt=media&token=d8494bb9-e503-4dec-9157-19f8b590bb6f"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-5%2Fblog-details-5-2.png?alt=media&token=8aafa4f6-eb76-432d-8b40-6dd50431ff60"
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
        <Link to={process.env.PUBLIC_URL + "/blog-4"}>
          {" "}
          <i className="fa fa-angle-left" /> trở lại
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-6"}>
          tiếp theo <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost5;