import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./sign-up.module.scss";
import classNames from "classnames/bind";

function SignUp() {
  const cx = classNames.bind(styles);

  // State cho Sign Up
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState("");
  const [signUpRePassword, setSignUpRePassword] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({});

  // Validation rules cho Sign Up
  const validateField = (field, errors) => {
    switch (field) {
      case "username":
        const upperCaseRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (!signUpUsername.trim()) {
          errors.username = "Vui lòng nhập đầy đủ tên";
        } else if (!upperCaseRegex.test(signUpUsername)) {
          errors.username = "Tên phải có tối thiểu một chữ hoa và số";
        }
        break;

      case "phoneNumber":
        if (!signUpPhoneNumber.trim()) {
          errors.phoneNumber = "Vui lòng nhập số điện thoại";
        } else if (signUpPhoneNumber.length < 10) {
          errors.phoneNumber = "Số điện thoại phải có ít nhất 10 ký tự";
        }
        break;

      case "password":
        if (!signUpPassword.trim()) {
          errors.password = "Vui lòng nhập mật khẩu";
        } else if (signUpPassword.length < 6) {
          errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }
        break;

      case "rePassword":
        if (!signUpRePassword.trim()) {
          errors.rePassword = "Vui lòng nhập lại mật khẩu";
        } else if (signUpPassword !== signUpRePassword) {
          errors.rePassword = "Mật khẩu nhập lại không chính xác";
        }
        break;

      default:
        break;
    }
  };

  const validateAllFields = () => {
    const newErrors = { ...signUpErrors };
    validateField("username", newErrors);
    validateField("phoneNumber", newErrors);
    validateField("password", newErrors);
    validateField("rePassword", newErrors);
    // setSignUpErrors(newErrors);
    return newErrors;
  };
  // Hàm xử lý Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    const updatedErrors = validateAllFields();
    if (Object.keys(updatedErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3002/auth/signUp", {
          username: signUpUsername,
          phoneNumber: signUpPhoneNumber,
          password: signUpPassword,
        });
        console.log(response.data);
        alert("Sign up successful! You can sign in now");
      } catch (error) {
        console.error(error.message);
      }
      console.log("Form is valid, submit the data");
    } else {
      setSignUpErrors(updatedErrors);
      console.log("Form contains errors");
    }
  };

  // Reset lỗi khi có sự thay đổi input trong Sign Up
  useEffect(() => {
    setSignUpErrors((prevErrors) => ({
      ...prevErrors,
      username: "", // Reset lỗi cho username
    }));
  }, [signUpUsername]);

  useEffect(() => {
    setSignUpErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: "", // Reset lỗi cho phoneNumber
    }));
  }, [signUpPhoneNumber]);

  useEffect(() => {
    setSignUpErrors((prevErrors) => ({
      ...prevErrors,
      password: "", // Reset lỗi cho password
    }));
  }, [signUpPassword]);

  useEffect(() => {
    setSignUpErrors((prevErrors) => ({
      ...prevErrors,
      rePassword: "", // Reset lỗi cho rePassword
    }));
  }, [signUpRePassword]);

  return (
    <form onSubmit={handleSignUp} noValidate className={cx("form-signUp")}>
      <h4>ĐĂNG KÝ</h4>

      <div className={cx("box-info")}>
        <label htmlFor="signUpUsername">
          Tên đăng nhập<span>*</span>
        </label>
        <input
          className={cx(
            "input-form",
            signUpErrors.username ? "input-form-wrong" : "input-form-hover",
          )}
          type="text"
          id="signUpUsername"
          value={signUpUsername}
          onChange={(e) => setSignUpUsername(e.target.value)}
          onBlur={() => {
            const newErrors = { ...signUpErrors };
            validateField("username", newErrors);
            setSignUpErrors(newErrors); // Cập nhật lỗi ngay khi rời khỏi input
          }}
          required
        />
        {signUpErrors.username && (
          <span className={cx("form-message")}>{signUpErrors.username}</span>
        )}
      </div>

      <div className={cx("box-info")}>
        <label htmlFor="signUpPhoneNumber">
          Số điện thoại<span>*</span>
        </label>
        <input
          className={cx(
            "input-form",
            signUpErrors.phoneNumber ? "input-form-wrong" : "input-form-hover",
          )}
          type="text"
          id="signUpPhoneNumber"
          value={signUpPhoneNumber}
          onChange={(e) => setSignUpPhoneNumber(e.target.value)}
          onBlur={() => {
            const newErrors = { ...signUpErrors };
            validateField("phoneNumber", newErrors);
            setSignUpErrors(newErrors);
          }}
          required
        />
        {signUpErrors.phoneNumber && (
          <span className={cx("form-message")}>{signUpErrors.phoneNumber}</span>
        )}
      </div>

      <div className={cx("box-info")}>
        <label htmlFor="signUpPassword">
          Mật khẩu<span>*</span>
        </label>
        <input
          className={cx(
            "input-form",
            signUpErrors.password ? "input-form-wrong" : "input-form-hover",
          )}
          type="password"
          id="signUpPassword"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          onBlur={() => {
            const newErrors = { ...signUpErrors };
            validateField("password", newErrors);
            setSignUpErrors(newErrors);
          }}
          required
        />
        {signUpErrors.password && (
          <span className={cx("form-message")}>{signUpErrors.password}</span>
        )}
      </div>

      <div className={cx("box-info")}>
        <label htmlFor="signUpRePassword">
          Nhắc lại mật khẩu<span>*</span>
        </label>
        <input
          className={cx(
            "input-form",
            signUpErrors.rePassword ? "input-form-wrong" : "input-form-hover",
          )}
          type="password"
          id="signUpRePassword"
          value={signUpRePassword}
          onChange={(e) => setSignUpRePassword(e.target.value)}
          onBlur={() => {
            const newErrors = { ...signUpErrors };
            validateField("rePassword", newErrors);
            setSignUpErrors(newErrors);
          }}
          required
        />
        {signUpErrors.rePassword && (
          <span className={cx("form-message")}>{signUpErrors.rePassword}</span>
        )}
      </div>

      <button className={cx("form-button")} type="submit">
        Đăng Ký
      </button>

      <div className={cx("note")}>
        <p>
          Thông tin cá nhân của bạn sẽ được dùng để điền vào hóa đơn, giúp bạn
          thanh toán nhanh chóng và dễ dàng
        </p>
      </div>
    </form>
  );
}

export default SignUp;
