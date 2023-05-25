import { useRef } from "react";

const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCPwBCQDNr1GtiZGAb5aeQwEW7-gWC5oVM",
      {
        method: "POST",
        body: JSON.stringify({
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
          idToken: localStorage.getItem("token"),
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
        //   cartCtx.login(data.idToken);
        //   navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <h2>Contact Details</h2>
      <form onSubmit={submitHandler}>
        <label id="fullName">
          <h3>Full Name</h3>
        </label>
        <input type="text" id="fullName" ref={nameInputRef} />
        <label id="photoUrl">
          <h3>Profile Photo Url</h3>
        </label>
        <input type="text" id="photoUrl" ref={photoUrlInputRef} />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateProfile;
