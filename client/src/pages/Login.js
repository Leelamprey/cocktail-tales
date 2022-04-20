//Build a login screen, require email and password
//make a fetch request to api if it returns token, its a valid user and logged in. Otherwise link to error message.
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login, register } from "../api";

const Login = ({ setToken }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoginSubmit() {
    const apiRes = await login(email, password);
    if (apiRes?.err) {
      alert(JSON.stringify(apiRes.err));
      return;
    } else {
      setToken(apiRes?.token);
      localStorage.setItem("token", apiRes?.token);
      history.push("/");
    }
  }

  async function handleSignUpSubmit() {
    const apiRes = await register(email, password);
    if (apiRes?.success) {
      alert("Registartion is successful, please log in.");
      return;
      // navigate to login
    }
    alert(JSON.stringify(apiRes.err));
  }
  return (
    <div>
      <form
        className="search-form"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div style={{ textAlign: "center" }}>
          <label>
            Email
            {/* use className instead of class */}
            <input
              className="logintext"
              name="email"
              // type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label>
            Password
            <input
              className="logintext"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
          </label>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            className='btn btn-primary'
            type="submit"
            onClick={handleLoginSubmit}
          >
            Log in
          </button>{" "}
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSignUpSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
