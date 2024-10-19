//imports
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import our custom CSS
import "../scss/main.scss";
import "../scss/login.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    const hashKey = getHashKeyFromLocationAfterLogin();

    if (hashKey.token) {
      setAccessTokenInLocalStorage(hashKey.token);
    }
  }, [location]);

  const getHashKeyFromLocationAfterLogin = () => {
    const { hash } = location;
    const hashKey = {};
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    if (error === "access_denied") {
      window.close();
    }

    hash
      .replace(/^#\/?/, "")
      .split("&")
      .forEach((keyValue) => {
        const spl = keyValue.indexOf("=");
        if (spl !== -1) {
          hashKey[keyValue.substring(0, spl)] = keyValue.substring(spl + 1);
        }
      });
    return hashKey;
  };

  const setAccessTokenInLocalStorage = (token) => {
    localStorage.setItem("pa_token", token);
    localStorage.setItem("pa_expires", new Date().getTime() + 60);
    navigate("/"); // Use navigate to redirect
  };

  const isDevelopmentEnvironment = () => {
    return (
      process.env.NODE_ENV === "development" ||
      window.location.hostname === "localhost"
    );
  };

  const getReturnURL = () => {
    if (isDevelopmentEnvironment()) {
      return "http://localhost:5173/login";
    }
    return "https://sample.ccbp.tech/login"; // Update with your production URL
  };

  const openLoginModal = () => {
    const apiKey = "d137f8ec5eeb14dd8ea4784a74f71560"; // Insert your API key
    const returnURL = getReturnURL();
    const url = `https://trello.com/1/OAuthAuthorizeToken?expiration=never&name=TaskManager&scope=read,write,account&key=${apiKey}&callback_method=fragment&return_url=${returnURL}`;

    window.open(url, "_self", ``);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    openLoginModal();
  };

  return (
    <div className="login-form-container">
      <div className="title-container">
        <img
          src="public\images\TaskManagerLogo.png"
          className="me-2"
          alt="title logo"
          style={{ width: "34px", height: "34px" }}
        />
        <h1 className="title">Task Manager</h1>
      </div>
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="public\images\LoginPageImage.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <p className="form-description">
          Task tracking for your everyday needs.
        </p>
        <button type="submit" className="login-button">
          LOG IN WITH TRELLO
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
