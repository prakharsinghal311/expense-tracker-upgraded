import classes from "./DummyScreen.module.css";
import { NavLink } from "react-router-dom";
// import {use}

const DummyScreen = () => {
  // const logoutHandler = () => {

  // }

  const emailVerifyButtonHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCPwBCQDNr1GtiZGAb5aeQwEW7-gWC5oVM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          //localStorage.setItem("email", enteredEmail);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        //   cartCtx.login(data.idToken);
        //   navigate("/");
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <h1>welcome to expense tracker</h1>
      <button onClick={emailVerifyButtonHandler}>Verify Email Id</button>
      <h2 className={classes.box}>
        your profile is incomplete.
        <NavLink to="/updateProfile">Complete Now</NavLink>
      </h2>
    </>
  );
};

export default DummyScreen;
