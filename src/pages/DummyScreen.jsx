import { useSelector } from "react-redux";
import classes from "./DummyScreen.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const DummyScreen = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  const token = useSelector((state) => state.auth.idTokens);
  //console.log(token);
  //console.log(localStorage.getItem("token"));

  const emailVerifyButtonHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBbKp0ENaywVHn9ck3tL43AH9whSWoXPg",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          //idToken: localStorage.getItem("token"),
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const expenseHandler = () => {
    navigate("/addingExpenses");
  };

  return (
    <>
      <div className={classes.dummyScreen1}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <div className={classes.dummyScreen2}>
        <h1>welcome to expense tracker</h1>
        <button onClick={emailVerifyButtonHandler}>Verify Email Id</button>
        <h2 className={classes.box}>
          your profile is incomplete.
          <NavLink to="/updateProfile">Complete Now</NavLink>
        </h2>
        <button onClick={expenseHandler}>Add Expenses</button>
      </div>
    </>
  );
};

export default DummyScreen;
