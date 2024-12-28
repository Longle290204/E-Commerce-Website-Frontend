import styles from "./loginForm.module.scss";
import classNames from "classnames/bind";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";

function LoginForm() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("form-login")}>
      <SignIn />
      <div className={cx("or-line")}>
        <span>Or</span>
      </div>
      <SignUp />
    </div>
  );
}

export default LoginForm;
