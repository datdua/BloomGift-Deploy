import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, updateAccount } from "../../redux/actions/accountActions"; // assuming action location

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.account); // assuming the state is named `account`

  const [accountInfo, setAccountInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    birthday: "",
    phone: "",
  });

  // Fetch account info on mount
  useEffect(() => {
    dispatch(getAccount())
      .then((account) => {
        setAccountInfo({
          fullname: account.fullname || "",
          email: account.email || "",
          address: account.address || "",
          gender: account.gender || "",
          birthday: account.birthday ? account.birthday.split("T")[0] : "",
          phone: account.phone || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Updating the account info
    dispatch(updateAccount(accountInfo))
      .then(() => {
        alert("Account information updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating account information:", error);
        alert("Failed to update account information.");
      });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>BloomGift | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Full Name</label>
                                    <input
                                      type="text"
                                      name="fullname"
                                      value={accountInfo.fullname}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={accountInfo.email}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Phone</label>
                                    <input
                                      type="text"
                                      name="phone"
                                      value={accountInfo.phone}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Address</label>
                                    <input
                                      type="text"
                                      name="address"
                                      value={accountInfo.address}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Gender</label>
                                    <select
                                      name="gender"
                                      value={accountInfo.gender}
                                      onChange={handleChange}
                                      style={{ border: '2px solid #ccc', width: '200px', height: '40px', backgroundColor: 'white', paddingLeft: "10px", marginLeft:"10px" }}
                                    >
                                      <option value="Nam">Nam</option>
                                      <option value="Nữ">Nữ</option>
                                      <option value="Khác">Khác</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Birthday</label>
                                    <input
                                      type="date"
                                      name="birthday"
                                      value={accountInfo.birthday}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Update</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
