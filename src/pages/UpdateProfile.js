import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();

  const [name, setName] = useState();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();

  const token = useSelector((state) => state.auth.idTokens);

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCBbKp0ENaywVHn9ck3tL43AH9whSWoXPg",
      {
        method: "POST",
        body: JSON.stringify({
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
          //localStorage.setItem("email", enteredEmail);
          //const i = 0;
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
        setName(data.users[0].displayName);
        setProfilePhotoUrl(data.users[0].photoUrl);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCBbKp0ENaywVHn9ck3tL43AH9whSWoXPg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: `${token}`,
          //idToken: `${localStorage.getItem("token")}`,
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
          deleteAttribute: [],
          returnSecureToken: true,
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
        <input type="text" id="fullName" ref={nameInputRef} value={name} />
        <label id="photoUrl">
          <h3>Profile Photo Url</h3>
        </label>
        <input
          type="text"
          id="photoUrl"
          ref={photoUrlInputRef}
          value={profilePhotoUrl}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateProfile;
