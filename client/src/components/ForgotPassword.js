import React, { useRef } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  let emailInputRef = useRef();
  return (
    <div className="fp-container">
      <form className="forgotPassword-form">
        <img
          className="brand-pic"
          src="https://static-00.iconduck.com/assets.00/rstudio-icon-2048x2048-bc4jryyg.png"
          alt="Brand-logo"
        ></img>
        <h2>Forgot Password ?</h2>
        <p className="fp-text">
          Enter your e-mail address below to get your
          <br></br> password to e-mail.
        </p>
        <div>
          <label>Email</label>
          <input
            ref={emailInputRef}
            type="email"
            placeholder="Enter Your Email"
          ></input>
        </div>

        <div>
          <button className="back-btn" type="button" onClick={() => {}}>
            <Link className="login-link" to="/">
              Back
            </Link>
          </button>
          <button className="submit-btn" type="button" onClick={() => {}}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
