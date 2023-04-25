import React, { useEffect, useState, useRef } from "react";
import { APP_NAME } from "../config";

import { isAuth, signout } from "../actions/auth";
import Search from "./blog/Search";
// import socketIO from "socket.io-client";
// import { API } from "../config";
// const socket = socketIO.connect(API);

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { userPublicProfile } from "../actions/user";

const Header = (props) => {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const container = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      const data = await userPublicProfile(result.username);
      setIsAuthenticated(data?.user);
    };
    fetchUser();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar style={{ backgroundColor: "#a7727d" }} navbar="true" {...props}>
        <NavbarBrand className="font-weight-bold logo" href="/">
          {APP_NAME}
        </NavbarBrand>
        <NavbarToggler navbar="true" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav style={{ marginRight: "5rem" }} className="me-auto" navbar>
            <>
              {isAuthenticated && (
                <div className="authContainer">
                  <div className="accountIcon">
                    <Image
                      className="notificationIcon"
                      src={"/images/notificationIcon.svg"}
                      width={20}
                      height={20}
                      alt={""}
                    />
                  </div>
                  <div className="accountRoundedBtn">
                    <div className="roundedBtnLabel">
                      {" "}
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        className={"AccountItemContainer"}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowMenu(!showMenu);
                        }}
                        ref={container}
                        href={"/"}
                      >
                        حسابي
                        {showMenu && (
                          <ul className="accountMenu">
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                if (isAuthenticated.role === 1) {
                                  router.push("/admin");
                                } else if (isAuthenticated.role === 0) {
                                  router.push("/user");
                                }
                              }}
                            >
                              {" معلوماتي الشخصية"}
                            </li>
                            <li
                              onClick={() => {
                                router.push("/requests");
                              }}
                            >
                              طلبات القبول
                            </li>
                            <li onClick={null}>قائمة المحفوظات</li>
                            <li
                              onClick={() => {
                                signout(() => {
                                  router.replace("/signin");
                                });
                              }}
                            >
                              تسجيل الخروج
                            </li>
                          </ul>
                        )}
                      </Link>
                    </div>
                    <div className="accountIcon">
                      <Image
                        src={"/images/accountIconMale.png"}
                        width={35}
                        height={35}
                        alt={""}
                      />
                    </div>
                  </div>
                </div>
              )}

              {!isAuthenticated && (
                <>
                  <div className="authContainer">
                    <div className="roundedBtn">
                      <div className="roundedBtnLabel">
                        <Link
                          style={{ textDecoration: "none", color: "#000" }}
                          href={"/signup"}
                        >
                          حساب جديد
                        </Link>
                      </div>
                    </div>
                    <div className="roundedBtn">
                      <div className="roundedBtnLabel">
                        <Link
                          style={{ textDecoration: "none", color: "#000" }}
                          href={"/signin"}
                        >
                          تسجيل دخول
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <NavItem>
                <NavLink
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "1.2rem",
                    textAlign: "center",
                  }}
                  href="/"
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
                    textAlign: "center",
                  }}
                  href="/blogs/"
                >
                  المقالات
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "1.2rem",
                    textAlign: "center",
                  }}
                  href="/users/"
                >
                  {" "}
                  البحث
                </NavLink>
              </NavItem>
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
