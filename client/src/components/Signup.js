import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let reConfirmInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setProfilePic] = useState(
    "https://cdn-icons-png.flaticon.com/512/6915/6915987.png"
  );

  let signupDataToSendServer = async () => {
    let dataToSend = new FormData();
    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("reConfirm", reConfirmInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/signup", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <div className="signup-container">
      <form>
        <img
          className="brand-pic"
          src="https://static-00.iconduck.com/assets.00/rstudio-icon-2048x2048-bc4jryyg.png"
          alt="Brand-logo"
        ></img>
        <div>
          <label>First Name </label>
          <input
            ref={firstNameInputRef}
            type="text"
            placeholder="First Name"
          ></input>
        </div>
        <div>
          <label>Last Name </label>
          <input
            ref={lastNameInputRef}
            type="text"
            placeholder="Last Name"
          ></input>
        </div>
        <div>
          <img className="profile-pic" src={profilePic} alt=""></img>
          <input
            ref={profilePicInputRef}
            type="file"
            className="file"
            onChange={() => {
              let uploadImageUrlPath = URL.createObjectURL(
                profilePicInputRef.current.files[0]
              );
              setProfilePic(uploadImageUrlPath);
            }}
          ></input>
        </div>
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
          <label>Re-Confirm</label>
          <input
            ref={reConfirmInputRef}
            type="password"
            placeholder="Re-Enter Your Pasword"
          ></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              signupDataToSendServer();
            }}
          >
            Signup
          </button>
        </div>
        <div>
          <p>
            Already have an account?
            <Link className="login-link" to="/">
              Login
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
