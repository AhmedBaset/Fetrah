import React, { useEffect, useState } from "react";
import { APP_NAME } from "../config";

import { isAuth, signout } from "../actions/auth";
import Search from "./blog/Search";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAuth());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar style={{ backgroundColor: "#a7727d" }} navbar="true" {...props}>
        <NavbarBrand
          style={{ color: "white", fontSize: "22px", marginLeft: "2rem" }}
          className="font-weight-bold"
          href="/"
        >
          {APP_NAME}
        </NavbarBrand>
        <NavbarToggler navbar="true" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <>
              <NavItem>
                <NavLink
                  style={{
                    backgroundColor: "white",
                    borderColor: "#a7727d",
                  }}
                  className="btn btn-primary text-dark pe-3 ps-3 rounded-pill navLinkItem"
                  href="/signup"
                >
                  حساب جديد
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    backgroundColor: "white",
                    borderColor: "#a7727d",
                  }}
                  className="btn btn-primary text-dark pe-3 ps-3 rounded-pill navLinkItem"
                  href="/signin"
                >
                  تسجيل الدخول
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "1.2rem",
                  }}
                  href="/blogs/"
                >
                  الدعم
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "1.2rem",
                  }}
                  href="/blogs/"
                >
                  كيف تختار زوجك
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "1.2rem",
                  }}
                  href="/blogs/"
                >
                  التجارب الناجحة
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "1.2rem",
                  }}
                  href="/blogs/"
                >
                  {" "}
                  البحث
                </NavLink>
              </NavItem>
              {/* {!isAuthenticated && (
                <NavItem>
                  <NavLink href="/signin/">Signin</NavLink>
                </NavItem>
              )} */}
            </>

            {/* {isAuthenticated && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    signout(() => {
                      router.replace("/signin");
                    });
                  }}
                >
                  Signout
                </NavLink>
              </NavItem>
            )} */}

            {/* {isAuthenticated && isAuthenticated.role === 0 && (
              <NavItem>
                <NavLink href="/user">
                  {isAuthenticated.name}'s Dashboard
                </NavLink>
              </NavItem>
            )} */}

            {/* {isAuthenticated && isAuthenticated.role === 1 && (
              <NavItem>
                <NavLink href="/admin">
                  {isAuthenticated.name}'s Dashboard
                </NavLink>
              </NavItem>
            )} */}

            {/* <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem> */}

            {/* <NavItem>
              <NavLink href="/users">Users</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
      {/* <Search /> */}
    </>
  );
};

export default Header;
