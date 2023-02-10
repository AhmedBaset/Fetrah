import React, { useEffect, useState } from "react";
import { APP_NAME } from "../config";

import { isAuth, signout } from "../actions/auth";

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
    <div>
      <Navbar {...props}>
        <NavbarBrand className="font-weight-bold" href="/">
          {APP_NAME}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <>
              <NavItem>
                <NavLink href="/blogs/">Blogs</NavLink>
              </NavItem>
              {!isAuthenticated && (
                <NavItem>
                  <NavLink href="/signin/">Signin</NavLink>
                </NavItem>
              )}
            </>

            {isAuthenticated && (
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
            )}

            {isAuthenticated && isAuthenticated.role === 0 && (
              <NavItem>
                <NavLink href="/user">
                  {isAuthenticated.name}'s Dashboard
                </NavLink>
              </NavItem>
            )}

            {isAuthenticated && isAuthenticated.role === 1 && (
              <NavItem>
                <NavLink href="/admin">
                  {isAuthenticated.name}'s Dashboard
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
