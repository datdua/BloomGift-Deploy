import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";

const ProductImageGallerySlider = ({ product }) => {
  const [swiper, setSwiper] = useState(null);

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 15,
    slidesPerView: 3,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    },
    on: {
      init: () => {
        setSwiper(swiper);
      }
    }
  };

  useEffect(() => {
    if (swiper) {
      swiper.destroy();
    }
  }, [product]);

  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--slider">
      <Swiper {...gallerySwiperParams}>
        {product.images &&
          product.images.map((single, key) => {
            return (
              <div key={key}>
                <div className="single-image">
                  <img
                    src={single.productImage}
                    className="img-fluid"
                    alt={`${product.productName} - Image ${key + 1}`}
                  />
                </div>
              </div>
            );
          })}
      </Swiper>
    </div>
  );
};

ProductImageGallerySlider.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallerySlider;