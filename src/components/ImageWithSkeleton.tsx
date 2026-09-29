import React, { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * An <img> that shows a shimmering SGMG-branded placeholder until it decodes.
 *
 * Renders the skeleton as an absolutely positioned sibling rather than wrapping
 * the image, so it drops into the existing markup without changing any layout.
 * The nearest positioned ancestor must be `position: relative` — every gallery,
 * card and carousel container in this project already is.
 */
export default function ImageWithSkeleton({ src, alt, onLoad, onError, ...rest }: Props) {
  const [settled, setSettled] = useState(false);

  return (
    <>
      {!settled && (
        <span className="img_skel" aria-hidden="true">
          <img src="/images/sgmg-icon.svg" alt="" className="img_skel_mark" />
        </span>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={(e) => {
          setSettled(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          // Clear the skeleton on failure too, otherwise it spins forever.
          setSettled(true);
          onError?.(e);
        }}
        {...rest}
      />
    </>
  );
}
