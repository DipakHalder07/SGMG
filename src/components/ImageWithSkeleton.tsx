import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * An <img> that shows a react-loading-skeleton placeholder until it decodes.
 *
 * The skeleton renders as an absolutely positioned sibling rather than wrapping
 * the image, so it drops into existing markup without changing any layout. The
 * nearest positioned ancestor must be `position: relative` — every gallery,
 * card and carousel container in this project already is.
 */
export default function ImageWithSkeleton({ src, alt, onLoad, onError, ...rest }: Props) {
  const [settled, setSettled] = useState(false);

  return (
    <>
      {!settled && (
        <span className="img_skel" aria-hidden="true">
          <Skeleton
            height="100%"
            width="100%"
            borderRadius="inherit"
            containerClassName="img_skel_fill"
            baseColor="#ececea"
            highlightColor="#f7f7f5"
            duration={1.4}
          />
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
          // Clear the skeleton on failure too, otherwise it animates forever.
          setSettled(true);
          onError?.(e);
        }}
        {...rest}
      />
    </>
  );
}
