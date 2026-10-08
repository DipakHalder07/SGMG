import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calculator,
  Check,
  Copy,
  Handshake,
  HardHat,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PillButton from "../components/PillButton";
import FaqSection from "../components/FaqSection";
import "../careers.css";

interface WorkArea {
  id: string;
  title: string;
  description: string;
  // Where the work happens
  place: string;
  tasks: string[];
  icon: LucideIcon;
}

/* The kinds of work SGMG does, not advertised vacancies: no openings,
   salaries or deadlines are listed until SGMG supplies real ones. */
const WORK_AREAS: WorkArea[] = [
  {
    id: "sales",
    title: "Sales & Customer Care",
    description: "Help families choose a home and businesses find space, from the first site visit to handover.",
    place: "Office & sites",
    tasks: ["Showing homes and shops on site", "Bookings, agreements and follow-up", "Keeping buyers updated until handover"],
    icon: Handshake,
  },
  {
    id: "sites",
    title: "Sites & Engineering",
    description: "Build SGMG’s homes and commercial projects across Siliguri, from foundations to finishing.",
    place: "Project sites",
    tasks: ["Site supervision", "Quality and safety checks", "Working with contractors and suppliers"],
    icon: HardHat,
  },
  {
    id: "office",
    title: "Office & Accounts",
    description: "Keep the business running: accounts, purchasing, paperwork and administration.",
    place: "Jeevandeep Tower",
    tasks: ["Accounts and billing", "Purchasing and vendor payments", "Records, registration and admin"],
    icon: Calculator,
  },
];

const CONTACT = {
  email: "sales@sgmg.in",
  phone: "+91 99333 21000",
  whatsapp: "919933321000",
  address: "2nd Floor, Jeevandeep Tower, Salugara, Siliguri",
};

// Opens a pre-filled email; the applicant attaches their CV
const applyMailto = (area?: string) => {
  const subject = area ? `Job application: ${area}` : "Job application";
  const body = [
    "Name:",
    "Phone:",
    `Area of work: ${area ?? ""}`,
    "Experience:",
    "",
    "(Please attach your CV)",
  ].join("\n");
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Same desk as email; the CV can be attached in the chat
const applyWhatsApp = (area?: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    area
      ? `Hello SGMG, I would like to apply for work in ${area}. My name is `
      : "Hello SGMG, I would like to apply for a job. My name is "
  )}`;

/* Restates what the page already promises; no timelines are claimed */
const APPLY_STEPS = [
  {
    title: "Pick an area of work",
    text: "Sales, sites or the office. If you’re not sure, tell us what you’ve done before.",
  },
  {
    title: "Send your CV",
    text: "By email or on WhatsApp, with your name, phone number and experience.",
  },
  {
    title: "Hear from the team",
    text: "If there’s a role that fits, someone from SGMG will call you.",
  },
];

const CAREER_FAQS = [
  {
    q: "Are there openings right now?",
    a: "We don’t list fixed vacancies on the website. Send us your CV and tell us the kind of work you’re looking for, and the team will get in touch if there’s a role that fits.",
  },
  {
    q: "How do I apply?",
    a: `Email your CV to ${CONTACT.email} with “Job application” and the area of work in the subject line. The Apply buttons on this page open that email for you, ready to fill in. You can also send your CV on WhatsApp to ${CONTACT.phone}.`,
  },
  {
    q: "What should I send?",
    a: "Your CV, plus your name, phone number, the area of work you’re interested in and your experience so far. The email the Apply buttons open already has space for each.",
  },
  {
    q: "Where would I work?",
    a: `At the SGMG office on the ${CONTACT.address.replace(", Siliguri", "")}, or on our project sites around Siliguri, depending on the role.`,
  },
  {
    q: "Can I visit the office instead?",
    a: `Yes. The office is on the ${CONTACT.address}. You can also call ${CONTACT.phone} before you come.`,
  },
];

// Fades sections in as they scroll into view. Content stays visible if the
// observer never runs, because the hidden state needs the crs-js class.
function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".crs-reveal"));
    if (!("IntersectionObserver" in window)) return;

    root.classList.add("crs-js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
}

// For visitors whose browser has no mail app set up, where mailto does nothing
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address is still on screen to select by hand
    }
  };

  return (
    <button type="button" className="crs-copy" onClick={copy} aria-live="polite">
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function WorkAreaRow({ area, index }: { area: WorkArea; index: number }) {
  const Icon = area.icon;
  return (
    <li className="crs-area crs-reveal" id={`area-${area.id}`}>
      <div className="crs-area_icon" aria-hidden="true">
        <Icon strokeWidth={1.5} />
      </div>

      <div className="crs-area_main">
        <span className="crs-area_num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="crs-area_name">{area.title}</h3>
        <span className="crs-area_place">
          <MapPin aria-hidden="true" />
          {area.place}
        </span>
      </div>

      <div className="crs-area_body">
        <p className="crs-area_desc">{area.description}</p>
        <ul className="crs-chips" aria-label={`What ${area.title} involves`}>
          {area.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>

      <div className="crs-area_actions">
        <PillButton
          text="Apply"
          href={applyMailto(area.title)}
          ariaLabel={`Apply for ${area.title} by email`}
        />
        <a
          className="crs-link"
          href={applyWhatsApp(area.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Apply for ${area.title} on WhatsApp`}
        >
          or WhatsApp
        </a>
      </div>
    </li>
  );
}

export default function CareersPage() {
  const rootRef = useReveal();

  useEffect(() => {
    document.title = "Careers • SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  return (
    <div ref={rootRef} className="page-wrapper crs-page">
      <Header />

      <main>
        {/* --- HERO --- */}
        <section className="crs-hero" data-section="light">
          <div className="crs-wrap crs-hero_grid">
            <div className="crs-hero_copy">
              <p className="crs-eyebrow">
                <span className="crs-dot" aria-hidden="true" />
                Careers at SGMG
              </p>
              <h1 className="crs-hero_title">
                Build <span data-scribble="2" className="scribble-wrap scribble-visible">Siliguri</span>
                <br />
                with us
              </h1>
              <p className="crs-hero_lead">
                Since 1985, SGMG has built the homes, malls and offices that people in
                Siliguri use every day. If you want to build them with us, we’d like to
                hear from you.
              </p>

              <div className="crs-hero_actions">
                <PillButton text="Send Your CV" href={applyMailto()} />
                <a className="crs-link" href={applyWhatsApp()} target="_blank" rel="noopener noreferrer">
                  or apply on WhatsApp
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>

              <nav className="crs-jump" aria-label="Areas of work">
                <span className="crs-jump_label">Areas of work</span>
                {WORK_AREAS.map((area) => (
                  <a key={area.id} href={`#area-${area.id}`} className="crs-jump_chip">
                    {area.title}
                  </a>
                ))}
              </nav>
            </div>

            <figure className="crs-hero_media">
              <img
                src="/assets/SideElevation_Day_.avif"
                alt="Cosmos Prashil in Devidanga, an SGMG building with shops on the lower floors and homes above"
                width={3000}
                height={1550}
                className="crs-hero_img"
              />
              <figcaption className="crs-badge">
                <span className="crs-dot" aria-hidden="true" />
                Cosmos Prashil, Devidanga
              </figcaption>

              <div className="crs-hero_card" aria-hidden="true">
                <span className="crs-hero_card_icon">
                  <Mail strokeWidth={1.5} />
                </span>
                <span>
                  <strong>Open applications</strong>
                  <span>CVs welcome any time</span>
                </span>
              </div>
            </figure>
          </div>
        </section>

        {/* --- AREAS OF WORK --- */}
        <section className="crs-areas" data-section="light" aria-labelledby="crs-areas-title">
          <div className="crs-wrap">
            <div className="crs-intro crs-reveal">
              <h2 id="crs-areas-title" className="crs-title">
                Three ways to
                <br />
                build with{" "}
                <span data-scribble="5" className="scribble-wrap scribble-visible">us</span>
              </h2>
              <p className="crs-intro_text">
                We don’t post fixed vacancies. Choose the kind of work that suits you and
                send your CV. The team will call if there’s a role that fits.
              </p>
            </div>

            <ol className="crs-areas_list">
              {WORK_AREAS.map((area, i) => (
                <WorkAreaRow key={area.id} area={area} index={i} />
              ))}
            </ol>
          </div>
        </section>

        {/* --- HOW TO APPLY (dark band) --- */}
        <section className="crs-apply" data-section="dark" aria-labelledby="crs-apply-title">
          <div className="crs-wrap">
            <div className="crs-intro crs-reveal">
              <h2 id="crs-apply-title" className="crs-title is-light">
                How to apply
              </h2>
              <p className="crs-intro_text">
                No forms to fill in. Send your CV whichever way is easiest for you.
              </p>
            </div>

            <ol className="crs-steps crs-reveal">
              {APPLY_STEPS.map((step, i) => (
                <li key={step.title} className="crs-step">
                  <span className="crs-step_num">{i + 1}</span>
                  <h3 className="crs-step_name">{step.title}</h3>
                  <p className="crs-step_text">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="crs-contacts crs-reveal">
              <div className="crs-contact">
                <Mail className="crs-contact_icon" strokeWidth={1.5} aria-hidden="true" />
                <span className="crs-contact_label">Email your CV</span>
                <div className="crs-contact_row">
                  <a href={applyMailto()} className="crs-contact_value">{CONTACT.email}</a>
                  <CopyEmailButton />
                </div>
              </div>

              <div className="crs-contact">
                <MessageCircle className="crs-contact_icon" strokeWidth={1.5} aria-hidden="true" />
                <span className="crs-contact_label">Send it on WhatsApp</span>
                <a
                  href={applyWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="crs-contact_value"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div className="crs-contact">
                <MapPin className="crs-contact_icon" strokeWidth={1.5} aria-hidden="true" />
                <span className="crs-contact_label">Visit the office</span>
                <span className="crs-contact_value is-text">{CONTACT.address}</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY SGMG --- */}
        <section className="crs-why" data-section="light" aria-labelledby="crs-why-title">
          <div className="crs-wrap crs-why_grid">
            <div className="crs-why_copy crs-reveal">
              <h2 id="crs-why-title" className="crs-title">
                Why work
                <br />
                at <span data-scribble="2" className="scribble-wrap scribble-visible">SGMG.</span>
              </h2>

              <blockquote className="crs-quote">
                <p>“Performance with purpose.”</p>
                <span className="crs-quote_by">The SGMG vision</span>
              </blockquote>

              <ol className="crs-reasons">
                <li>
                  <h3 className="crs-reason_name">Work you can see</h3>
                  <p>
                    Our projects are homes, malls and offices that people in Siliguri use
                    every day.
                  </p>
                </li>
                <li>
                  <h3 className="crs-reason_name">A family business</h3>
                  <p>
                    SGMG is led by its founder, Sushil Gangadhar Mittal, with Managing
                    Directors Harshvardhan Mittal and Mehul Mittal.{" "}
                    <Link to="/team" className="crs-link">Meet the team</Link>
                  </p>
                </li>
                <li>
                  <h3 className="crs-reason_name">More than one kind of project</h3>
                  <p>
                    Residential, retail and entertainment, from apartment blocks to the
                    INOX at Vega Circle Mall.{" "}
                    <Link to="/commercial" className="crs-link">See our projects</Link>
                  </p>
                </li>
              </ol>
            </div>

            <div className="crs-mosaic crs-reveal">
              <figure className="crs-tile is-wide">
                <img
                  src="/assets/gallery/Elevation_Evening_1.webp"
                  alt="Cosmos Prashil towers lit up in the evening"
                  width={1230}
                  height={666}
                  loading="lazy"
                />
                <figcaption className="crs-badge">
                  <span className="crs-dot" aria-hidden="true" />
                  Cosmos Prashil at dusk
                </figcaption>
              </figure>
              <figure className="crs-tile">
                <img
                  src="/images/projects/green-valley.jpg"
                  alt="A courtyard at Green Valley, a completed SGMG project"
                  width={800}
                  height={594}
                  loading="lazy"
                />
                <figcaption className="crs-badge">
                  <span className="crs-dot" aria-hidden="true" />
                  Green Valley
                </figcaption>
              </figure>
              <figure className="crs-tile">
                <img
                  src="/assets/SwimmingPoolView_Night_.avif"
                  alt="The rooftop swimming pool at Cosmos Prashil"
                  width={3000}
                  height={1688}
                  loading="lazy"
                />
                <figcaption className="crs-badge">
                  <span className="crs-dot" aria-hidden="true" />
                  Rooftop pool
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <FaqSection
          faqs={CAREER_FAQS}
          caption="How applying to SGMG works."
          ctaHeading={
            <>
              Have another
              <br />
              question?
            </>
          }
          ctaText="Contact Us"
          ctaTo="/contact"
        />
      </main>

      <Footer />
    </div>
  );
}
