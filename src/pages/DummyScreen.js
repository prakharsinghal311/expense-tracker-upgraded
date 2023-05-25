import classes from "./DummyScreen.module.css";
import { NavLink } from "react-router-dom";

const DummyScreen = () => {
  return (
    <>
      <h1>welcome to expense tracker</h1>
      <h2 className={classes.box}>
        your profile is incomplete.
        <NavLink to="/updateProfile">Complete Now</NavLink>
      </h2>
    </>
  );
};

export default DummyScreen;
