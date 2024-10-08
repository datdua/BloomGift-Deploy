import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost2 = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-2%2Fblog-2.png?alt=media&token=ef458813-4f60-439f-b0bf-477ad929a6cb"}
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
          <h3>Chọn màu hoa thế nào cho phù hợp với độ tuổi?</h3>
          <p>
            Khi lựa chọn hoa để tặng cho một ai đó, bạn có bao giờ nghĩ đến việc màu sắc hoa cũng có thể phản ánh độ tuổi của họ không? Mỗi độ tuổi mang theo một phong cách và sở thích riêng. Hãy cùng khám phá cách chọn màu hoa phù hợp với từng độ tuổi nhé!
            {" "}          </p><br></br>
          <p>
            Trẻ em (dưới 10 tuổi): Màu sắc tươi sáng, vui tươi luôn là lựa chọn hàng đầu. Bạn có thể chọn hoa màu hồng, xanh dương, vàng hay cam. Những màu này không chỉ thu hút trẻ nhỏ mà còn mang lại cảm giác vui vẻ, hồn nhiên.
            {" "}          </p><br></br>
          <p>
            Thanh thiếu niên (10-20 tuổi): Đối với lứa tuổi này, hoa mang màu sắc tương đối cá tính và nổi bật sẽ phù hợp hơn. Hồng pastel, xanh mint hay tím lavender là những lựa chọn tuyệt vời. Những màu này thể hiện sự trẻ trung, năng động và sáng tạo.
            {" "}          </p><br></br>
          <p>
            Người trưởng thành (20-40 tuổi): Hoa màu vừa sang trọng vừa tinh tế sẽ là sự lựa chọn thông minh. Màu đỏ, trắng, vàng đồng hoặc xám thường mang đến cảm giác chín chắn, trưởng thành. Đặc biệt, màu đỏ tượng trưng cho tình yêu và đam mê, rất thích hợp cho những dịp đặc biệt.
            {" "}          </p><br></br>
          <p>
            Người trung niên (40-60 tuổi): Khi đến độ tuổi này, hoa với màu sắc ấm áp như nâu, vàng đậm, cam hoặc tím đậm sẽ mang lại sự thư giãn và an yên. Màu sắc này thường tạo cảm giác thân thiện và gần gũi.
            {" "}
          </p><br></br>
          <p>
            Người cao tuổi (trên 60 tuổi): Những màu sắc nhẹ nhàng, trầm lắng như trắng tinh khôi, xanh nhạt hoặc hoa màu pastel sẽ mang lại cảm giác thanh bình, dễ chịu. Nhất là khi màu trắng biểu trưng cho sự trong sạch và bình an.
            {" "}
          </p><br></br>
          <blockquote>
            Hy Chọn màu hoa không chỉ dựa vào sở thích cá nhân mà còn phản ánh giai đoạn cuộc đời. Hãy tặng hoa với một chút tâm tư để làm cho người nhận thêm phần vui vẻ nhé!
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
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-2%2Fblog-details-2-1.png?alt=media&token=8d8ab3c5-dfbf-4145-8968-315781f71ac2"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "https://firebasestorage.googleapis.com/v0/b/bloom-gift-67f83.appspot.com/o/element-layout%2Fblog%2Fblog-2%2Fblog-details-2-2.png?alt=media&token=b9539175-fc53-47a5-a694-83dd6654a332"
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
        <Link to={process.env.PUBLIC_URL + "/blog-1"}>
          {" "}
          <i className="fa fa-angle-left" /> trở lại
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-3"}>
          tiếp theo <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost2;