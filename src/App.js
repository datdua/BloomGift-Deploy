import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import ForgetPasswordForm from "./components/form/forgetPassword";
import ResetPasswordForm from "./components/form/resetPassword";
import SignInWithGoogle from "./pages/other/SignInWithGoogle";
import SalerSidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/sidebar/DashBoard";
import ShopManagement from "./components/sidebar/ShopManagement";
import StoreProfile from "./components/sidebar/ProductManager/StoreProfile";
import Header from "./components/sidebar/HeaderSidebar";
import ProductList from "./components/sidebar/ProductManager/ProductList";
import OrderHistory from "./pages/other/Order";



// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeFashionEight = lazy(() => import("./pages/home/HomeFashionEight"));
const HomeKidsFashion = lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureTwo = lazy(() => import("./pages/home/HomeFurnitureTwo"));
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);
const HomeFurnitureFour = lazy(() => import("./pages/home/HomeFurnitureFour"));
const HomeFurnitureFive = lazy(() => import("./pages/home/HomeFurnitureFive"));
const HomeFurnitureSix = lazy(() => import("./pages/home/HomeFurnitureSix"));
const HomeFurnitureSeven = lazy(() =>
  import("./pages/home/HomeFurnitureSeven")
);
const HomeElectronics = lazy(() => import("./pages/home/HomeElectronics"));
const HomeElectronicsTwo = lazy(() =>
  import("./pages/home/HomeElectronicsTwo")
);
const HomeElectronicsThree = lazy(() =>
  import("./pages/home/HomeElectronicsThree")
);
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));
const HomeBookStoreTwo = lazy(() => import("./pages/home/HomeBookStoreTwo"));
const HomePlants = lazy(() => import("./pages/home/HomePlants"));
const HomeFlowerShop = lazy(() => import("./pages/home/HomeFlowerShop"));
const HomeFlowerShopTwo = lazy(() => import("./pages/home/HomeFlowerShopTwo"));
const HomeOrganicFood = lazy(() => import("./pages/home/HomeOrganicFood"));
const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeGridBanner = lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = lazy(() => import("./pages/home/HomePetFood"));
const HomeMedicalEquipment = lazy(() =>
  import("./pages/home/HomeMedicalEquipment")
);
const HomeChristmas = lazy(() => import("./pages/home/HomeChristmas"));
const HomeBlackFriday = lazy(() => import("./pages/home/HomeBlackFriday"));
const HomeBlackFridayTwo = lazy(() =>
  import("./pages/home/HomeBlackFridayTwo")
);
const HomeValentinesDay = lazy(() => import("./pages/home/HomeValentinesDay"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));


const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
const publicUrl = typeof process !== 'undefined' ? process.env.REACT_APP_PUBLIC_URL || "" : "";

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
          vi: require("./translations/vietnamese.json")
        }
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={publicUrl + "/"}
                  component={HomeFashion}
                />

                {/* Homepages */}
                <Route
                  path={publicUrl + "/home-fashion"}
                  component={HomeFashion}
                />

                {/* Shop pages */}
                <Route
                  path={publicUrl + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />
                <Route
                  path={publicUrl + "/shop-grid-filter"}
                  component={ShopGridFilter}
                />
                <Route
                  path={publicUrl + "/shop-grid-two-column"}
                  component={ShopGridTwoColumn}
                />
                <Route
                  path={publicUrl + "/shop-grid-no-sidebar"}
                  component={ShopGridNoSidebar}
                />
                <Route
                  path={publicUrl + "/cuahang"}
                  component={ShopGridFullWidth}
                />
                <Route
                  path={publicUrl + "/shop-grid-right-sidebar"}
                  component={ShopGridRightSidebar}
                />
                <Route
                  path={publicUrl + "/shop-list-standard"}
                  component={ShopListStandard}
                />
                <Route
                  path={publicUrl + "/combo"}
                  component={ShopListFullWidth}
                />
                <Route
                  path={publicUrl + "/shop-list-two-column"}
                  component={ShopListTwoColumn}
                />

                {/* Shop product pages */}
                <Route
                  path={publicUrl + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={publicUrl + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />
                <Route
                  path={publicUrl + "/product-tab-right/:id"}
                  component={ProductTabRight}
                />
                <Route
                  path={publicUrl + "/product-sticky/:id"}
                  component={ProductSticky}
                />
                <Route
                  path={publicUrl + "/product-slider/:id"}
                  component={ProductSlider}
                />
                <Route
                  path={publicUrl + "/product-fixed-image/:id"}
                  component={ProductFixedImage}
                />

                {/* Blog pages */}
                <Route
                  path={publicUrl + "/blog-standard"}
                  component={BlogStandard}
                />
                <Route
                  path={publicUrl + "/blog-no-sidebar"}
                  component={BlogNoSidebar}
                />
                <Route
                  path={publicUrl + "/blog-right-sidebar"}
                  component={BlogRightSidebar}
                />
                <Route
                  path={publicUrl + "/blog-details-standard"}
                  component={BlogDetailsStandard}
                />

                {/* Other pages */}
                <Route
                  path={publicUrl + "/about"}
                  component={About}
                />
                <Route
                  path={publicUrl + "/contact"}
                  component={Contact}
                />
                <Route
                  path={publicUrl + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={publicUrl + "/dangky-dangnhap"}
                  component={LoginRegister}
                />

                <Route
                  path={publicUrl + "/cart"}
                  component={Cart}
                />
                <Route
                  path={publicUrl + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={publicUrl + "/compare"}
                  component={Compare}
                />
                <Route
                  path={publicUrl + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={publicUrl + "/not-found"}
                  component={NotFound}
                />
                <Route
                  path={publicUrl + "/forget-password"}
                  component={ForgetPasswordForm}
                />
                <Route
                  path={publicUrl + "/reset-password"}
                  component={ResetPasswordForm}
                />
                <Route
                  path={publicUrl + "/signInWithGoogle"}
                  component={SignInWithGoogle}
                />
                <Route
                  path={publicUrl + "/not-found"}
                  component={NotFound}
                />
                <Route 
                  path={publicUrl + "/donhang"}
                  component={OrderHistory}
                />
                <Route path="/seller">
                  <SalerSidebar>
                    <Switch>
                      <Route path="/seller/dashboard" component={Dashboard} />
                      <Route path="/seller/shop-management" component={ShopManagement} />
                      <Route path="/seller/shop-profile" component={StoreProfile} />
                      <Route path="/seller/all-products" component={ProductList} />
                    </Switch>
                  </SalerSidebar>
                </Route>
                <Route exact component={NotFound} />
                <Route exact path="/not-found" component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
