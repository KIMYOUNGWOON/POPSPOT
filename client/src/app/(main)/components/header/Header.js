"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="header">
      <img
        className="logo"
        src="https://user-images.githubusercontent.com/126956430/282671069-a09c630b-27dd-4089-9cdc-a2117ca9c132.png"
        alt="로고이미지"
      />
      <div className={`searchBarWrapper ${isFocused ? "focused" : null}`}>
        <label htmlFor="search">
          <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search in Pop-Up Store..."
          autoComplete="off"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
      <div className="btnWrapper">
        <div className="loginBtn">LOGIN</div>
        <div className="signUpBtn">SIGN UP</div>
        <div className="findBtnWrapper">
          <FontAwesomeIcon className="icon" icon={faSliders} />
          <div className="text">FIND</div>
        </div>
      </div>
    </div>
  );
}