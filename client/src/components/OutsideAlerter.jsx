import React, { useRef, useEffect } from "react";

function OutsideAlerter({ children, hideListOption }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hideListOption();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hideListOption]);

  return <div ref={ref}>{children}</div>;
}

export default OutsideAlerter;
