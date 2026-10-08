import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface FaqAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  className = "",
}: FaqAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const content = contentRef.current;
    const paragraph = paragraphRef.current;
    const icon = iconRef.current;
    if (!content || !paragraph) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isOpen) {
        gsap.set(content, { height: "auto" });
        gsap.set(paragraph, { opacity: 1, y: "0%", yPercent: 0 });
        if (icon) gsap.set(icon, { rotateZ: 45 });
      } else {
        gsap.set(content, { height: 0 });
        gsap.set(paragraph, { opacity: 0, y: "20%", yPercent: 0 });
        if (icon) gsap.set(icon, { rotateZ: 0 });
      }
      return;
    }

    gsap.killTweensOf([content, paragraph, icon].filter(Boolean));

    if (isOpen) {
      content.style.overflow = "hidden";
      const currentHeight = content.offsetHeight;
      gsap.set(paragraph, { y: "0%", yPercent: 0 });
      content.style.height = "auto";
      const targetHeight = Math.ceil(content.scrollHeight);
      content.style.height = `${currentHeight}px`;
      gsap.set(paragraph, { y: "20%", yPercent: 0 });

      gsap.to(content, {
        height: targetHeight,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          content.style.height = "auto";
          content.style.overflow = "visible";
          ScrollTrigger.refresh();
        },
      });

      if (icon) {
        gsap.to(icon, {
          rotateZ: 45,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      gsap.fromTo(
        paragraph,
        { opacity: 0, y: "20%", yPercent: 0 },
        {
          opacity: 1,
          y: "0%",
          yPercent: 0,
          delay: 0.1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      content.style.overflow = "hidden";
      const currentHeight = content.offsetHeight;
      content.style.height = `${currentHeight}px`;

      gsap.to(content, {
        height: 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          content.style.height = "0px";
          ScrollTrigger.refresh();
        },
      });

      if (icon) {
        gsap.to(icon, {
          rotateZ: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      gsap.to(paragraph, {
        opacity: 0,
        y: "20%",
        yPercent: 0,
        delay: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  return (
    <div
      role="listitem"
      className={`accordion-item w-dyn-item ${isOpen ? "is-open" : ""} ${className}`.trim()}
      onClick={onToggle}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isOpen}
    >
      <div className="accordion_head-wrapper">
        <div className="item_head">
          <div className="title_wrapper">
            <div className="item_title">{question}</div>
            <div
              ref={iconRef}
              className={`icon_wrapper ${className.includes("white_ver") ? "white_ver" : ""}`.trim()}
            />
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="item_content-wrapper"
        style={{ height: 0, overflow: "hidden" }}
      >
        <div className="accordion_paragraph">
          <div
            ref={paragraphRef}
            className="item_paragraph w-richtext"
            style={{
              opacity: 0,
            }}
          >
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
