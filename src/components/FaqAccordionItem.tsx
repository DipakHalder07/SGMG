import React from "react";

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
  return (
    <div
      className={`accordion-item ${isOpen ? "is-open" : ""} ${className}`.trim()}
      onClick={onToggle}
      role="button"
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
            <div className="icon_wrapper" />
          </div>
        </div>
      </div>

      <div className="item_content-wrapper">
        <div className="accordion_paragraph">
          <div className="item_paragraph w-richtext">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
