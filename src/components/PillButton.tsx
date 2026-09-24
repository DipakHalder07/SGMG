import React from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "./Header";
import { prefetchRoute } from "../lib/prefetch";

export interface PillButtonProps {
  text: string;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: "default" | "black" | "header" | "lavender";
  className?: string;
  textBoxClassName?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export default function PillButton({
  text,
  to,
  href,
  onClick,
  variant = "default",
  className = "",
  textBoxClassName = "",
  type = "button",
  target,
  rel,
  ariaLabel,
}: PillButtonProps) {
  const variantClass =
    variant === "black"
      ? "black"
      : variant === "header"
      ? "header_cta"
      : variant === "lavender"
      ? "lavender"
      : "";

  const arrowFill =
    variant === "black"
      ? "#ffffff"
      : variant === "lavender"
      ? "#121214"
      : "#292929";

  const content = (
    <>
      <div className={`icon_box is-left ${variantClass}`}>
        <div className="arrow_icon">
          <div className="arrow-icon w-embed">
            <ArrowIcon fill={arrowFill} />
          </div>
        </div>
      </div>
      <div className={`text_box ${variantClass} ${textBoxClassName}`.trim()}>
        <div>{text}</div>
      </div>
      <div className={`icon_box is-right ${variantClass}`}>
        <div className="arrow_icon">
          <div className="arrow-icon w-embed">
            <ArrowIcon fill={arrowFill} />
          </div>
        </div>
      </div>
    </>
  );

  const baseClassName = `button w-inline-block ${variantClass} ${className}`.trim();

  if (to) {
    return (
      <Link
        to={to}
        className={baseClassName}
        onClick={onClick}
        onMouseEnter={() => prefetchRoute(to)}
        onFocus={() => prefetchRoute(to)}
        onTouchStart={() => prefetchRoute(to)}
        aria-label={ariaLabel || text}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel || text}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClassName}
      onClick={onClick}
      aria-label={ariaLabel || text}
      style={{ background: "none", border: "none", padding: 0 }}
    >
      {content}
    </button>
  );
}
