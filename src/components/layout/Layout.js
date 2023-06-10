import classes from "./Layout.module.css";
import { Container, Navbar } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" expand="sm" variant="dark">
        <Container className={classes.header}>
          <Navbar.Brand className={classes.links}>
            <NavLink activeclassname={classes.active} to="/home">
              Home
            </NavLink>
          </Navbar.Brand>
          <Navbar.Brand className={classes.links}>
            <NavLink activeclassname={classes.active} to="/products">
              Products
            </NavLink>
          </Navbar.Brand>
          <Navbar.Brand className={classes.links}>
            <NavLink activeclassname={classes.active} to="/about">
              About Us
            </NavLink>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
