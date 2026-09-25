import React from "react";

export default function PageLoader() {
  return (
    <div
      style={{
        minHeight: "70vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "5rem 0",
        fontFamily: "'Exposure', Georgia, serif",
        color: "#292929",
      }}
      aria-label="Loading page content"
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          border: "2.5px solid rgba(41, 41, 41, 0.12)",
          borderTopColor: "#292929",
          borderRadius: "50%",
          animation: "pageLoaderSpin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        }}
      />
      <div
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          opacity: 0.65,
          textTransform: "uppercase",
        }}
      >
        Loading...
      </div>
      <style>{`
        @keyframes pageLoaderSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
