import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

function MyDropDown({ direction, title, data, onClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState("");

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleOnClick = (status) => {
    setStatus(status);
    onClick(status);
  };

  let mtitle = status === "" ? title : `${status}`;

  return (
    <div className="">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle className="pe-4 ps-4 w-100" caret>
          {mtitle}
        </DropdownToggle>
        <DropdownMenu className="w-100">
          {data.map((item) => {
            return (
              <DropdownItem
                key={item}
                onClick={() => {
                  handleOnClick(item);
                }}
              >
                {item}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

MyDropDown.propTypes = {
  direction: PropTypes.string,
};

export default MyDropDown;
