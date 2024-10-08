import {
  loginAccount,
  regenerateOTP,
  registerAccount,
  verifyAccount,
  signInWithGoogle,
  registerStoreAccount,
} from "../../redux/actions/authenticationActions";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useDropzone } from 'react-dropzone';
import VerifyAccount from "../../components/modal/verifyAccount";
import ForgetPasswordForm from "../../components/form/forgetPassword";
import ResetPasswordForm from "../../components/form/resetPassword";

import "./LoginRegister.css";

const LoginRegister = ({ location }) => {
  const publicUrl = "";
  const { pathname } = location;
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("customer");
  const [storeName, setStoreName] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeAvatar, setStoreAvatar] = useState(null);
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [identityCard, setIdentityCard] = useState('');
  const [identityName, setIdentityName] = useState('');
  const [image, setImage] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [storeImage, setStoreImage] = useState(null);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && showVerifyButton) {
      setShowVerifyButton(false);
      setShowRegenerateButton(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, showVerifyButton]);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const savedEmail = getCookie("userEmail");
    const savedPassword = getCookie("userPassword");

    if (savedEmail && savedPassword) {
      document.querySelector('input[name="user-email"]').value = savedEmail;
      document.querySelector('input[name="user-password"]').value = savedPassword;
      setRememberMe(true);
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    // Prepare the request body
    const registerRequest = {
      fullname: e.target["user-fullname"].value,
      email: e.target["user-email"].value,
      password: e.target["user-password"].value,
      address: e.target["user-address"].value,
      gender: e.target["user-gender"].value,
      birthday: e.target["user-birthday"].value,
      phone: parseInt(e.target["user-phone"].value),
    };

    // Convert the registerRequest object to a JSON string
    const registerRequestJson = JSON.stringify(registerRequest);

    // Prepare form data to send as multipart
    const formData = new FormData();
    formData.append('registerRequest', registerRequestJson);

    // If an avatar is selected, append it to the form data
    if (userAvatar) {
      formData.append('avatar', userAvatar);
    }

    // Dispatch the registration request (including avatar if provided)
    dispatch(registerAccount(formData, addToast))
      .then((response) => {
        setEmail(e.target["user-email"].value);
        setCountdown(60);
        setShowVerifyButton(true);
        setShowRegenerateButton(false);
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setShowVerifyButton(false);
        setShowRegenerateButton(false);
        setRegistrationSuccess(false);
      });
  };


  const handleStoreRegister = (e) => {
    e.preventDefault();

    // Prepare the store request body
    const storeRequest = {
      storeName: e.target["store-name"].value,
      type: e.target["store-type"].value,
      storePhone: parseInt(e.target["store-phone"].value),
      storeAddress: e.target["store-store-address"].value,
      email: e.target["store-email"].value,
      bankAccountName: e.target["store-bank-account-name"].value,
      bankNumber: e.target["store-bank-number"].value,
      bankAddress: e.target["store-bank-address"].value,
      taxNumber: e.target["store-tax-number"].value,
      password: e.target["store-password"].value,
      identityCard: e.target["store-identity-card"].value,
      identityName: e.target["store-identity-name"].value,
    };

    // Convert the storeRequest object to a JSON string
    const storeRequestJson = JSON.stringify(storeRequest);

    // Prepare form data to send as multipart
    const formData = new FormData();
    formData.append('storeRequest', storeRequestJson);

    // If a store avatar is selected, append it to the form data
    if (storeAvatar) {
      formData.append('storeAvatar', storeAvatar);
    }

    // Dispatch the store registration request (including avatar if provided)
    dispatch(registerStoreAccount(formData, addToast))
      .then((response) => {
        setEmail(e.target["store-email"].value);
        setCountdown(60);
        setShowVerifyButton(true);
        setShowRegenerateButton(false);
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        console.error("Store registration error:", error);
        setShowVerifyButton(false);
        setShowRegenerateButton(false);
        setRegistrationSuccess(false);
      });
  };


  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email: e.target["user-email"].value,
      password: e.target["user-password"].value,
    };

    dispatch(loginAccount(userData, addToast))
      .then((response) => {
        if (rememberMe) {
          document.cookie = `userEmail=${userData.email}; max-age=31536000; path=/`; // Save for 1 year
          document.cookie = `userPassword=${userData.password}; max-age=31536000; path=/`; // Save for 1 year
        }
        if (response && response.token) {
          localStorage.setItem("token", response.token);
          history.push("/");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleVerifyAccount = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      otp: e.target["user-otp"].value,
    };

    dispatch(verifyAccount(userData, addToast))
      .then(() => {
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Verification error:", error);
      });
  };

  const toggleForgetPasswordForm = (e) => {
    e.preventDefault();
    history.push("/forget-password");
  };

  const handleRegenerateOTP = (e) => {
    e.preventDefault();
    setCountdown(60);
    setShowVerifyButton(true);
    setShowRegenerateButton(false);
    dispatch(regenerateOTP(email, addToast))
      .then(() => {
        console.log("OTP regenerated successfully.");
      })
      .catch((error) => {
        console.error("Regenerate OTP error:", error);
      });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onDropUser = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 1024 * 1024) {
      addToast("Kích thước ảnh phải nhỏ hơn 1MB", { appearance: 'error', autoDismiss: true });
      return;
    } else if (!file.type.startsWith('image/')) {
      addToast("File phải là định dạng hình ảnh", { appearance: 'error', autoDismiss: true });
    }
    setUserAvatar(file);
    setUserImage(Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
  };

  const onDropStore = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 1024 * 1024) {
      addToast("Kích thước ảnh phải nhỏ hơn 1MB", { appearance: 'error', autoDismiss: true });
      return;
    } else if (!file.type.startsWith('image/')) {
      addToast("File phải là định dạng hình ảnh", { appearance: 'error', autoDismiss: true });
    } 
    setStoreAvatar(file);
    setStoreImage(Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
  };

  const ImageUploadComponent = ({ image, setImage, onDrop, handleDeleteImage, title }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*',
      multiple: false,
      maxSize: 1024 * 1024, // 1MB
      onDropRejected: (rejectedFiles) => {
        const file = rejectedFiles[0];
        if (file.size > 1024 * 1024) {
          addToast("Kích thước ảnh phải nhỏ hơn 1MB", { appearance: 'error', autoDismiss: true });
        } else if (!file.type.startsWith('image/')) {
          addToast("File phải là định dạng hình ảnh", { appearance: 'error', autoDismiss: true });
        }
      }
    });

    return (
      <div className="card">
        <h2 className="card-title">{title}</h2>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} name="avatar" />
          {image ? (
            <div className="avatar-wrapper">
              <img src={image.preview} alt="Avatar" className="avatar-image" />
            </div>
          ) : (
            <div className="avatar-wrapper">
              <div className="empty-avatar">
                <span>Chọn file</span>
              </div>
            </div>
          )}
          {image && (
            <Button variant="danger" onClick={handleDeleteImage} className="delete-image-button mb-3">Xoá</Button>
          )}
          <p className="instruction-text">Kéo & thả ảnh vào đây, hoặc nhấn để chọn hình ảnh</p>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Bloom Gift | Đăng Nhập</title>
        <meta name="description" content="Compare page of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={publicUrl + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={publicUrl + pathname}>Đăng nhập - Đăng ký</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Đăng Nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Đăng Ký</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {!showForgetPasswordForm && !showResetPasswordForm ? (
                              <form onSubmit={handleLogin}>
                                <input type="text" name="user-email" placeholder="Email" />
                                <input type="password" name="user-password" placeholder="Mật khẩu" />
                                <div className="button-box">
                                  <div className="login-toggle-btn">
                                    <input
                                      type="checkbox"
                                      checked={rememberMe}
                                      onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label className="ml-10">Ghi nhớ tài khoản</label>
                                    <Link onClick={() => history.push("/forget-password")}>Quên mật khẩu?</Link>
                                  </div>
                                  <button type="submit">
                                    <span>Đăng Nhập</span>
                                  </button>
                                  <button
                                    onClick={() => window.location.href = 'https://bloomgift-bloomgift.azuremicroservices.io/oauth2/authorization/google'}
                                    className="ml-5"
                                  >
                                    Đăng nhập với Google
                                  </button>
                                </div>
                              </form>
                            ) : showForgetPasswordForm ? (
                              <ForgetPasswordForm
                                setEmail={setEmail}
                                setShowForgetPasswordForm={setShowForgetPasswordForm}
                                setShowResetPasswordForm={setShowResetPasswordForm}
                              />
                            ) : (
                              <ResetPasswordForm
                                email={email}
                                setShowResetPasswordForm={setShowResetPasswordForm}
                              />
                            )}
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <Nav variant="tabs" className="mb-3">
                          <Nav.Item>
                            <Nav.Link active={activeSubTab === "customer"} onClick={() => setActiveSubTab("customer")}>
                              Khách hàng
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link active={activeSubTab === "store"} onClick={() => setActiveSubTab("store")}>
                              Cửa hàng
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {activeSubTab === "customer" ? (
                              <form onSubmit={handleRegister}>
                                <ImageUploadComponent
                                  image={userImage}
                                  setImage={setUserImage}
                                  onDrop={onDropUser}
                                  handleDeleteImage={() => {
                                    setUserAvatar(null);
                                    setUserImage(null);
                                  }}
                                  title="Chọn avatar"
                                />
                                <input name="user-fullname" placeholder="Họ tên" type="text" required />
                                <input name="user-email" placeholder="Email" type="email" required />
                                <input name="user-phone" placeholder="Số điện thoại" type="tel" required />
                                <input name="user-address" placeholder="Địa chỉ" type="text" required />
                                <div className="gender-birthday-container">
                                  <div className="form-group">
                                    <label htmlFor="user-gender">Giới tính</label>
                                    <select id="user-gender" name="user-gender" className="form-control" required>
                                      <option value="Male">Nam</option>
                                      <option value="Female">Nữ</option>
                                      <option value="Other">Khác</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="user-birthday">Ngày sinh</label>
                                    <input
                                      id="user-birthday"
                                      name="user-birthday"
                                      placeholder="Ngày sinh"
                                      type="date"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                </div>
                                <input name="user-password" placeholder="Mật khẩu" type="password" required />
                                <input
                                  name="user-confirm-password"
                                  placeholder="Xác nhận mật khẩu"
                                  type="password"
                                  required
                                />
                                {!registrationSuccess && (
                                  <div className="button-box">
                                    <button type="submit">
                                      <span>Đăng ký</span>
                                    </button>
                                  </div>
                                )}
                              </form>
                            ) : (
                              <form onSubmit={handleStoreRegister}>
                                <ImageUploadComponent
                                  image={storeImage}
                                  setImage={setStoreImage}
                                  onDrop={onDropStore}
                                  handleDeleteImage={() => {
                                    setStoreAvatar(null);
                                    setStoreImage(null);
                                  }}
                                  title="Chọn avatar cửa hàng"
                                />
                                <input name="store-name" placeholder="Tên cửa hàng" type="text" required />
                                <label htmlFor="store-type">Loại cửa hàng</label>
                                <select placeholder="Loại cửa hàng" name="store-type" className="form-control mb-5">
                                  <option value="Hoa">Hoa</option>
                                  <option value="Quà">Quà tặng</option>
                                  <option value="Hoa và quà">Hoa và quà</option>
                                </select>
                                <input name="store-phone" placeholder="Số điện thoại" type="tel" required />
                                <input name="store-store-address" placeholder="Địa chỉ cửa hàng" type="text" required />
                                <input name="store-email" placeholder="Email" type="email" required />
                                <div className="card">
                                  <div className="bank-card-form">
                                    <h3>Thông tin tài khoản ngân hàng</h3>
                                    <div className="bank-card">
                                      <div className="bank-card-field">
                                        <label htmlFor="store-bank-account-name">Tên chủ tài khoản</label>
                                        <input name="store-bank-account-name" placeholder="Tên chủ tài khoản ngân hàng" type="text" required />
                                      </div>
                                      <div className="bank-card-field">
                                        <label htmlFor="store-bank-number">Số tài khoản</label>
                                        <input name="store-bank-number" placeholder="Số tài khoản chủ ngân hàng" type="text" required />
                                      </div>
                                      <div className="bank-card-field">
                                        <label htmlFor="store-bank-address">Chi nhánh</label>
                                        <input name="store-bank-address" placeholder="Chi nhánh" type="text" required />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="identity-card-form">
                                    <div className="identity-card">
                                      <div className="identity-card-header">
                                        <h4>Thông tin CMND/CCCD</h4>
                                      </div>
                                      <div className="identity-card-body">
                                        <div className="identity-card-field">
                                          <label htmlFor="store-identity-card">Số CMND/CCCD</label>
                                          <input name="store-identity-card" placeholder="Số CMND/CCCD" type="text" required />
                                        </div>
                                        <div className="identity-card-field">
                                          <label htmlFor="store-identity-name">Tên chủ CMND/CCCD</label>
                                          <input name="store-identity-name" placeholder="Tên chủ CMND/CCCD" type="text" required />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <input name="store-tax-number" placeholder="Mã số thuế" type="text" required />
                                <input name="store-password" placeholder="Mật khẩu" type="password" required />
                                <input
                                  name="store-confirm-password"
                                  placeholder="Xác nhận mật khẩu"
                                  type="password"
                                  required
                                />
                                {!registrationSuccess && (
                                  <div className="button-box">
                                    <button type="submit">
                                      <span>Đăng ký</span>
                                    </button>
                                  </div>
                                )}
                              </form>
                            )}
                            {showVerifyButton && registrationSuccess && (
                              <div className="verify-account-container mt-3">
                                <p>
                                  Bạn cần xác minh tài khoản. Vui lòng nhấn vào nút bên dưới trong {countdown} giây.
                                </p>
                                <Button onClick={handleOpenModal} disabled={countdown === 0}>
                                  Xác thực tài khoản
                                </Button>
                              </div>
                            )}
                            {showRegenerateButton && registrationSuccess && (
                              <div className="regenerate-otp-container mt-3">
                                <p>
                                  Bạn chưa nhận được mã OTP? Nhấn vào nút bên dưới để gửi lại.
                                </p>
                                <Button variant="warning" onClick={handleRegenerateOTP}>
                                  Gửi lại OTP
                                </Button>
                              </div>
                            )}
                            <VerifyAccount
                              showModal={showModal}
                              handleCloseModal={handleCloseModal}
                              handleVerifyAccount={handleVerifyAccount}
                              email={email}
                            />
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;