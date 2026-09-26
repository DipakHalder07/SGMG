import React from "react";
import SgmgLoader from "./SgmgLoader";

export default function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
      aria-label="Loading page content"
    >
      <SgmgLoader />
    </div>
  );
}
