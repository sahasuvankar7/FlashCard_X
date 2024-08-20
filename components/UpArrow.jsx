"use client";
import React, { useState, useEffect } from "react";
import { GoArrowUp } from "react-icons/go";

const UpArrow = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <button
        className="text-white text-2xl border-[0.1px] border-gray-300 bottom-10 right-10 font-extrabold rounded-full bg-black fixed p-4"
        onClick={handleClick}
      >
        <GoArrowUp />
      </button>
    )
  );
};

export default UpArrow;