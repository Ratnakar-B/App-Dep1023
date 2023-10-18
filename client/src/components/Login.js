import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:3333";

  useEffect(() => {
    emailInputRef.current.value = localStorage.getItem("email");
    passwordInputRef.current.value = localStorage.getItem("password");
    // validateToken();
  });

  let loginDataToSendServerThruAxios = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let response = await axios.post("/login", dataToSend);
    alert(response.data.msg);
    if (response.data.status == "success") {
      localStorage.setItem("token", response.data.token);
      navigate("/home", { state: response.data });
    }

    console.log(response.data);
    // let reqOptions = {
    //   method: "POST",
    //   body: dataToSend,
    // };

    // let JSONData = await fetch("http://localhost:3333/login", reqOptions);
    // let JSOData = await JSONData.json();

    // alert(JSOData.msg);
    // if (JSOData.status == "success") {
    //   // localStorage.setItem("email", emailInputRef.current.value);
    //   // localStorage.setItem("password", passwordInputRef.current.value);
    //   localStorage.setItem("token", JSOData.token);
    //   navigate("/home", { state: JSOData });
    // }

    // console.log(JSOData);
  };
  let validateToken = async () => {
    let dataToSend = new FormData();

    dataToSend.append("token", localStorage.getItem("token"));

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:3333/validateToken",
      reqOptions
    );
    let JSOData = await JSONData.json();

    console.log(JSOData);
  };
  return (
    <div className="login-container">
      <form className="login-form">
        <img
          className="brand-pic"
          src="https://static-00.iconduck.com/assets.00/rstudio-icon-2048x2048-bc4jryyg.png"
          alt="Brand-logo"
        ></img>
        <div>
          <label>Email</label>
          <input
            ref={emailInputRef}
            type="email"
            placeholder="Enter Your Email"
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Enter Your Password"
          ></input>
        </div>
        <div>
          <button
            className="login-btn"
            type="button"
            onClick={() => {
              loginDataToSendServerThruAxios();
            }}
          >
            Login
          </button>
        </div>
        <Link className="fp-link" to="/forgotPassword">
          Forgot Password?
        </Link>{" "}
        <div>
          <p>
            Don't have an account ?
            <Link className="login-link" to="/signup">
              Signup
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
