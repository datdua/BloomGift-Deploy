import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import BrandLogoSliderTwo from "../../wrappers/brand-logo/BrandLogoSliderOne";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Bloom Gift | Trang chủ</title>
        <meta
          name="Bloom Gift"
          content="Nền Tảng Liên Kết Cửa Hàng Bán Hoa Và Quà Tại TP. Hồ Chí Minh"
        />
      </MetaTags>
      <LayoutOne
        headerTop="visible"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />

        <BrandLogoSliderTwo spaceBottomClass="pb-95" spaceTopClass="pt-100" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
