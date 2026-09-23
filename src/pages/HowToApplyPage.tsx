import React, { useEffect, useRef, useState } from "react";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../how-to-apply.css";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}

// Step data
interface StepItem {
  step: number;
  title: string;
  bg: string;
  textColor: string;
  numberBg: string;
  numberColor: string;
  imgSrc: string;
  desc: string;
}

const STEPS: StepItem[] = [
  {
    step: 1,
    title: "Choose your space",
    bg: "#e8ceff",
    textColor: "#292929",
    numberBg: "#292929",
    numberColor: "#ffffff",
    imgSrc: "/images/how-to-apply/step-1.avif",
    desc: "Select your lease term and luxury floor plan that fits your lifestyle at SGMG Residences. If applying with family or co-residents, ensure everyone specifies the same residence preferences.",
  },
  {
    step: 2,
    title: "Create your account",
    bg: "#feb7b9",
    textColor: "#292929",
    numberBg: "#292929",
    numberColor: "#ffffff",
    imgSrc: "/images/how-to-apply/step-2.avif",
    desc: "Sign up using your email to initiate your application. You’ll use this verified account throughout the onboarding process, digital lease signing, and resident portal access.",
  },
  {
    step: 3,
    title: "Complete your application",
    bg: "#f3ede6",
    textColor: "#292929",
    numberBg: "#292929",
    numberColor: "#ffffff",
    imgSrc: "/images/how-to-apply/step-3.avif",
    desc: "Fill in your background details, documentation, and specific living preferences. Include pet details and verification documentation to help our onsite concierge team prepare everything.",
  },
  {
    step: 4,
    title: "Review & Confirm",
    bg: "#292929",
    textColor: "#ffffff",
    numberBg: "#ffffff",
    numberColor: "#292929",
    imgSrc: "/images/how-to-apply/step-4.avif",
    desc: "Review your submitted information, community policies, and terms. If you have questions about amenities or custom requests, our dedicated onsite leasing desk is readily available.",
  },
  {
    step: 5,
    title: "Sign & Move in",
    bg: "#fee5b7",
    textColor: "#292929",
    numberBg: "#292929",
    numberColor: "#ffffff",
    imgSrc: "/images/how-to-apply/step-5.avif",
    desc: "Once your application is approved, execute your lease digitally and coordinate move-in day with our welcome team. We'll guide you through your keys, parking access, and orientation.",
  },
];

// Testimonials data
interface TestimonialItem {
  id: number;
  name: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Emily Carter",
    avatar: "/images/how-to-apply/author-1.avif",
    quote:
      "“I can't say enough about how seamless the entire onboarding process was. The management team went above and beyond to ensure a smooth move-in, walked through every single detail, and made moving in feel effortless. SGMG Residences is a truly extraordinary place to call home!”",
  },
  {
    id: 2,
    name: "Ryan Mitchell",
    avatar: "/images/how-to-apply/author-2.avif",
    quote:
      "“I wasn’t sure what to expect with luxury apartment leasing, but everything exceeded my expectations. The architectural finish, clean modern layouts, and immediate support from the onsite team made the transition smooth. It’s been an outstanding living experience.”",
  },
  {
    id: 3,
    name: "Daniel Brooks",
    avatar: "/images/how-to-apply/author-3.avif",
    quote:
      "“Living here has been tranquil and effortless from day one. Everything you need is already taken care of, high-speed connectivity is built-in, and the location near the premier malls is unbeatable. It simply makes daily life better.”",
  },
];

// FAQs data
const FAQS = [
  {
    q: "How do I apply for an apartment?",
    a: "You can apply directly online through our digital portal in just a few minutes. Choose your preferred floor plan, submit your personal and identification details, and our leasing desk will review your submission promptly.",
  },
  {
    q: "What documents do I need to apply?",
    a: "You will need a government-issued photo ID (passport, driver's license, or Aadhaar), proof of income or employment (recent pay stubs or bank statements), and contact details for rental verification.",
  },
  {
    q: "Do I need a guarantor or co-signer?",
    a: "A guarantor may be required if an applicant does not meet standard credit or income criteria (typically 3x monthly rent). Guarantors can complete their portion of the digital application online with ease.",
  },
  {
    q: "How long does the approval process take?",
    a: "Most applications are thoroughly reviewed and processed within 24 to 48 business hours once all required documentation has been submitted.",
  },
  {
    q: "Are pets allowed at SGMG Residences?",
    a: "Yes! SGMG Residences is a dedicated pet-friendly community. Both cats and dogs are welcomed with open arms, and we feature comfortable pet-friendly layouts and dedicated green grounds.",
  },
  {
    q: "How is monthly rent paid?",
    a: "Rent is conveniently paid through our secure online resident portal via credit/debit card, ACH bank transfer, or scheduled auto-pay for total peace of mind.",
  },
];

export default function HowToApplyPage() {
  const stepsSectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const isAutoScrollingRef = useRef(false);

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [testimonialProgress, setTestimonialProgress] = useState<number>(0);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // --- GSAP CARD STACKING & PEELING ANIMATION (1:1 21OAKS) ---
  useEffect(() => {
    const section = stepsSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card_how_item");
      if (!cards.length) return;

      const stepTopTime = new Map<number, number>();

      // 1. Initial State: cards placed below screen with authentic reverse z-index (card 1 on top)
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          y: window.innerHeight * 1.1 + i * 60,
          rotation: (i - 2) * 2.5 + (i % 2 === 0 ? -1.5 : 1.5),
          zIndex: cards.length - i,
        });
      });

      // 2. Timeline with ScrollTrigger pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3800",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: () => {
            if (isAutoScrollingRef.current) return;
            const t = tl.time();
            let best = -Infinity;
            let active: number | null = null;
            stepTopTime.forEach((time, step) => {
              if (t >= time && time > best) {
                best = time;
                active = step;
              }
            });
            if (active != null) setActiveStep(active);
          },
        },
      });

      // Step A: All cards fly in from below to center
      tl.to(cards, {
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power2.out",
      });

      // Step B: Cards settle into stacked deck
      tl.to(
        cards,
        {
          y: (i) => -i * 8,
          rotation: (i) => (i - (cards.length - 1) / 2) * 2.2,
          stagger: 0.06,
          duration: 0.8,
          ease: "power1.out",
        },
        ">-0.15"
      );

      // Record time when Step 1 is settled
      stepTopTime.set(1, tl.duration());

      // Step C: Each card (1 to 4) peels away upward to reveal the next card
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card stays visible
        const pos = i === 0 ? tl.duration() + 0.15 : tl.duration();
        const nextStep = i + 2;
        stepTopTime.set(nextStep, pos);

        tl.to(
          card,
          {
            y: -window.innerHeight * 1.35,
            rotation: i % 2 ? 8 : -8,
            duration: 0.65,
            ease: "power2.in",
          },
          pos
        );
      });
    }, stepsSectionRef);

    // Refresh after DOM and images are completely ready
    const tRefresh = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(tRefresh);
      ctx.revert();
    };
  }, []);

  // Jump to step on chip click
  const handleChipClick = (step: number) => {
    setActiveStep(step);
    const section = stepsSectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.getAll().find((s) => s.trigger === section);
    if (st) {
      isAutoScrollingRef.current = true;
      const ratio = (step - 1) / 4;
      const targetScroll = st.start + (st.end - st.start) * (ratio * 0.92 + 0.04);

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 750);
    }
  };

  // --- TESTIMONIALS AUTOPLAY & TIMER ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialProgress((prev) => {
        if (prev >= 100) {
          setActiveTestimonial((curr) => (curr + 1) % TESTIMONIALS.length);
          return 0;
        }
        return prev + 2; // ~5 seconds per testimonial cycle
      });
    }, 100);

    return () => clearInterval(timer);
  }, [activeTestimonial]);

  const selectTestimonial = (index: number) => {
    setActiveTestimonial(index);
    setTestimonialProgress(0);
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: "#ffffff" }}>
      {/* Light Theme Navigation Header */}
      <Header />

      {/* --- HERO SECTION --- */}
      <main data-section="light" className="hero_how">
        <div className="wrapper_apply">
          <div className="heading_apply">
            <h1 className="h1 black">
              How{" "}
              <span
                data-scribble="2"
                className="scribble-wrap scribble-visible"
              >
                to apply
              </span>
            </h1>
          </div>

          {/* Continuous Hand-Drawn Room-to-Door Illustration */}
          <div className="ill_abs desktop_only">
            <div className="how_ill" />
          </div>
          <div className="ill_abs mobile_only">
            <div className="how_ill" />
          </div>

          <div className="bot_side_hero">
            <div className="shift_box">
              <div className="apply_box">
                <div className="title_apply">
                  Apply in just a few simple steps.
                </div>
                <div className="p_apply_box">
                  <div className="p_gen black">
                    From choosing your floor plan to moving in, the process is
                    designed to be clear, quick, and easy to follow.
                  </div>
                </div>
              </div>
              <div className="button_amenities">
                <WebflowButton
                  text="Apply Now"
                  href="/#contact"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- GSAP PINNED STEPS SECTION --- */}
      <section
        ref={stepsSectionRef}
        id="steps-section"
        data-section="light"
        className="how_to_apply"
      >
        <div className="wrapper_how_to">
          {/* Section Heading */}
          <div className="abs_heading">
            <h2 className="h2 smaller spec_how">
              Getting started
              <br />
              is simple
            </h2>
          </div>

          {/* Step Cards Stack Container */}
          <div className="card_how_parent">
            <div className="cards_how_list">
              {STEPS.map((step) => (
                <div
                  key={step.step}
                  data-step={step.step}
                  className="card_how_item"
                  style={{ backgroundColor: step.bg }}
                >
                  <div className="wrapper_card">
                    {/* Top Row: Number badge */}
                    <div
                      className="number_box"
                      style={{
                        backgroundColor: step.numberBg,
                        color: step.numberColor,
                      }}
                    >
                      <div className="number_text">{step.step}</div>
                    </div>

                    {/* Step Title */}
                    <div className="title_step_box">
                      <div
                        className="title_step"
                        style={{ color: step.textColor }}
                      >
                        {step.title}
                      </div>
                    </div>

                    {/* Illustration Graphic */}
                    <div className="illustration_step">
                      <img
                        src={step.imgSrc}
                        alt={step.title}
                        loading="lazy"
                        className="image ill_steps"
                      />
                    </div>

                    {/* Description Text */}
                    <div className="description_step">
                      <div
                        className="desc_step_txt"
                        style={{ color: step.textColor }}
                      >
                        {step.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Chips Bar */}
          <div className="chips_bot">
            {STEPS.map((s) => (
              <div
                key={s.step}
                role="button"
                className={`chip_how ${activeStep === s.step ? "is-active" : ""}`}
                onClick={() => handleChipClick(s.step)}
              >
                <div>{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PET-FRIENDLY SECTION --- */}
      <section data-section="light" className="pets">
        <div className="wrapper_pets">
          <div className="pets_heading">
            <h2 className="h2 pets_h">
              For You.
              <br />
              For{" "}
              <span
                data-scribble="5"
                className="scribble-wrap scribble-visible"
              >
                Them.
              </span>
            </h2>
          </div>

          <div className="pets_ill">
            <div className="box_pets" />
            <div className="p_pets">
              <div className="p_gen black">
                A pet-friendly living environment designed to support everyday
                life together, where comfort, routine, and space extend
                naturally to your pet. From quiet moments of rest to daily
                movement and shared routines, the space remains open, calm, and
                easy to adapt — allowing both of you to settle in and feel at
                home without compromise.
              </div>
            </div>
          </div>

          <div className="pet_boxes">
            <div className="pet_box">
              <div className="pet_title">A place to settle</div>
              <div className="pet_desc">
                Soft, quiet areas where your pet can rest, relax, and find a
                consistent sense of comfort throughout the day.
              </div>
            </div>
            <div className="pet_box">
              <div className="pet_title">Room to move</div>
              <div className="pet_desc">
                Open, flexible layouts that support movement, play, and daily
                routines without restriction or disruption.
              </div>
            </div>
            <div className="pet_box">
              <div className="pet_title">Part of everyday life</div>
              <div className="pet_desc">
                A setting where living with your pet feels natural, integrated,
                and fully considered in how the space functions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="testimonials">
        <div className="wrapper_general basic">
          <div className="testimonials_heading">
            <h2 className="h2 bigger">
              <span
                data-scribble="2"
                className="scribble-wrap scribble-visible"
              >
                Real
              </span>{" "}
              resident
              <br />
              experiences
            </h2>
          </div>

          <div className="cms_testimonials">
            {/* Authors List with Radial Progress Ring */}
            <div className="authors">
              <div className="author_coll">
                {TESTIMONIALS.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`author_item ${activeTestimonial === idx ? "is-active" : ""}`}
                    onClick={() => selectTestimonial(idx)}
                  >
                    <div
                      className="author_circle"
                      style={
                        {
                          "--p": activeTestimonial === idx ? testimonialProgress : 0,
                        } as React.CSSProperties
                      }
                    >
                      <div className="author_photo">
                        <img src={t.avatar} alt={t.name} loading="lazy" />
                      </div>
                    </div>
                    <div className="author_name">
                      <div className="author_name_txt">{t.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Quote Display */}
            <div className="quotes">
              <div className="testimonial_coll">
                {TESTIMONIALS.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`testimonial_item ${activeTestimonial === idx ? "is-active" : ""}`}
                  >
                    <div className="testimonial_txt">{t.quote}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LIGHT FAQS SECTION --- */}
      <section className="faqs light">
        <div className="wrapper_general basic">
          <div className="heading_faq">
            <h2 className="h2 smaller">
              Frequently asked
              <br />
              questions
            </h2>
          </div>

          <div className="sides_faq">
            {/* Left Column: Context & Explore FAQ Button */}
            <div className="short_left">
              <div className="caption_faq">
                Everything you might want to know before moving in.
              </div>
              <div className="bottom_faq">
                <div className="bot_txt_faq">
                  Didn’t find what you were looking for?
                </div>
                <WebflowButton
                  text="Explore FAQ"
                  href="/#faq"
                  className=""
                />
              </div>
            </div>

            {/* Right Column: Accordion List */}
            <div className="faq_general">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`faq_row ${isOpen ? "is-open" : ""}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <div className="faq_question_bar">
                      <div className="item_title">{faq.q}</div>
                      <div className="icon_faq">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0V20M0 10H20"
                            stroke="#292929"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="faq_answer">
                      <div className="p_faq">{faq.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA & FOOTER --- */}
      <Footer />
    </div>
  );
}
