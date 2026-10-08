import React, { useState } from "react";
import FaqAccordionItem from "./FaqAccordionItem";
import PillButton from "./PillButton";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSectionProps {
  id?: string;
  title?: React.ReactNode;
  caption?: React.ReactNode;
  ctaHeading?: React.ReactNode;
  ctaText?: string;
  ctaTo?: string;
  faqs: FaqItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function FaqSection({
  id = "faq",
  title = (
    <>
      Frequently asked
      <br />
      questions
    </>
  ),
  caption = "Everything you need to know about purchasing your SGMG home.",
  ctaHeading = (
    <>
      Didn’t find what you were
      <br />
      looking for?
    </>
  ),
  ctaText = "Explore FAQ",
  ctaTo = "/faq",
  faqs,
  allowMultiple = true,
  className = "",
}: FaqSectionProps) {
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(() => new Set());
  const isDark = className.includes("black") || className.includes("dark");

  const handleToggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      data-section={isDark ? "dark" : "light"}
      className={`faqs ${className}`.trim()}
      id={id}
    >
      <div className="wrapper_general basic">
        <div className={`faq_heading ${isDark ? "white_ver" : ""}`.trim()}>
          <h2 className="h2 smaller">{title}</h2>
        </div>

        <div className="sides_faq">
          <div className="short_left">
            <div className={`caption_faq ${isDark ? "white_ver" : ""}`.trim()}>
              <div>{caption}</div>
            </div>
            <div className="bottom_faq">
              <div className={`p_gen black caption_cta ${isDark ? "white_ver" : ""}`.trim()}>{ctaHeading}</div>
              <div>
                <PillButton text={ctaText} to={ctaTo} />
              </div>
            </div>
          </div>

          <div className="faq_general">
            <div className="w-dyn-list">
              <div role="list" className={`collection_faq w-dyn-items ${isDark ? "white_ver" : ""}`.trim()}>
                {faqs.map((faq, index) => {
                  const isOpen = openFaqs.has(index);
                  return (
                    <FaqAccordionItem
                      key={faq.q}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={isOpen}
                      onToggle={() => handleToggleFaq(index)}
                      className={isDark ? "white_ver" : ""}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
