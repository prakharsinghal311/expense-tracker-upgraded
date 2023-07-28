import { useRef } from "react";

const ForgotPassword = () => {
  const emailInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBbKp0ENaywVHn9ck3tL43AH9whSWoXPg",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: `${emailInputRef.current.value}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
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
        // cartCtx.login(data.idToken);
        //   localStorage.setItem("token", data.idToken);
        //   navigate("/dummy");
        //   console.log("User has successfully signed up");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>Enter the email with which you have registered</label>
        <input type="email" required ref={emailInputRef}></input>
        <button type="submit">Send a Link</button>
      </form>
    </>
  );
};

export default ForgotPassword;
