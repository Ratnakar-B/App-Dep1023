import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  let loc = useLocation();
  console.log(loc);
  let navigate = useNavigate();

  let deleteAccount = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", loc.state.data.email);

    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch("/deleteProfile", reqOptions);

    let JSOData = await JSONData.json();

    navigate("/");
    alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <div className="home-container">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <img
            className="brand-pic"
            style={{ width: "50px" }}
            src="https://static-00.iconduck.com/assets.00/rstudio-icon-2048x2048-bc4jryyg.png"
            alt="Brand-logo"
          ></img>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  More
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => {
                        deleteAccount();
                      }}
                    >
                      Delete Account
                    </button>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="home-card">
        <div className="card">
          <h4>
            {loc.state.data.firstName} &nbsp;
            {loc.state.data.lastName}
          </h4>
          <img
            className="card-img-top"
            src={`${loc.state.data.profilePic}`}
            alt="Card image"
          ></img>
          <div className="card-body">
            <button
              className="edit-btn"
              type="button"
              onClick={() => {
                navigate("/profile", { state: loc.state.data });
              }}
            >
              See Profile
            </button>

            <p className="card-title">
              First Name : {loc.state.data.firstName}
            </p>
            <p className="card-title">Last Name : {loc.state.data.lastName}</p>
            <p className="card-title">Email : {loc.state.data.email}</p>
            {/* <p className="card-title">Password : {loc.state.data.password}</p>
            <p className="card-title">Re-Confirm: {loc.state.data.reConfirm}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
