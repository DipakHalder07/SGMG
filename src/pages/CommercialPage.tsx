import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Building2, Clapperboard, Mail, MapPin, MessageCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PillButton from "../components/PillButton";
import FaqSection from "../components/FaqSection";
import "../commercial.css";

type ProjectStatus = "ongoing" | "completed" | "upcoming";

interface CommercialProject {
  id: string;
  name: string;
  // Locality as sgmg.in gives it; Siliguri where the old site names none
  location: string;
  status: ProjectStatus;
  // Upcoming projects have no photo yet
  image?: string;
  // One sourced fact shown on the photo
  note?: string;
  // What an ongoing project is, in a line
  summary?: string;
}

// Source: sgmg.in/commercial-retail and sgmg.in/inox. Photos are cropped from
// the old site's project tiles, so they're SGMG's own but low resolution
// (408px wide, 800px for Cosmos Connect and Cosmos Mall); the layout keeps
// them near that size. Swap in the originals when SGMG supplies them.
const PROJECTS: CommercialProject[] = [
  {
    id: "cosmos-connect",
    name: "Cosmos Connect",
    location: "Siliguri",
    status: "ongoing",
    image: "/images/commercial/cosmos-connect.jpg",
    summary: "A new commercial building in Siliguri, now under construction.",
  },
  {
    id: "cosmos-prashil-retail",
    name: "Cosmos Prashil (Retail)",
    location: "Devidanga",
    status: "ongoing",
    image: "/images/commercial/cosmos-prashil-retail.jpg",
    summary: "Shops at the base of Cosmos Prashil, SGMG’s residential project in Devidanga.",
  },
  {
    id: "vega-circle-mall",
    name: "Vega Circle Mall",
    location: "Check Post",
    status: "completed",
    image: "/images/commercial/vega-circle-mall.jpg",
    note: "Home to a 1,100-seat INOX",
  },
  { id: "cosmos-mall", name: "Cosmos Mall", location: "Sevoke Road", status: "completed", image: "/images/commercial/cosmos-mall.jpg" },
  {
    id: "jeevandeep-complex",
    name: "Jeevandeep Complex",
    location: "Salugara",
    status: "completed",
    image: "/images/commercial/jeevandeep-complex.jpg",
    note: "Our sales office is here",
  },
  { id: "city-plaza-complex", name: "City Plaza Complex", location: "Salugara", status: "completed", image: "/images/commercial/city-plaza-complex.jpg" },
  { id: "spencer-plaza", name: "Spencer Plaza", location: "Burdwan Road", status: "completed", image: "/images/commercial/spencer-plaza.jpg" },
  { id: "golden-plaza", name: "Golden Plaza", location: "Burdwan Road", status: "completed", image: "/images/commercial/golden-plaza.jpg" },
  { id: "burdwan-road", name: "Burdwan Road", location: "Burdwan Road", status: "upcoming" },
  { id: "eastern-bypass", name: "Eastern Bypass", location: "Eastern Bypass", status: "upcoming" },
  { id: "medical", name: "Medical", location: "Medical", status: "upcoming" },
];

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing: "Under construction",
  completed: "Completed",
  upcoming: "Upcoming",
};

const byStatus = (status: ProjectStatus) => PROJECTS.filter((p) => p.status === status);
const ONGOING = byStatus("ongoing");
const COMPLETED = byStatus("completed");
const UPCOMING = byStatus("upcoming");

// Bar order and section anchors for the at-a-glance card
const STATUS_ORDER: { status: ProjectStatus; anchor: string }[] = [
  { status: "completed", anchor: "#cm-landmarks" },
  { status: "ongoing", anchor: "#cm-building" },
  { status: "upcoming", anchor: "#cm-next" },
];

// Every named locality, in page order, without the catch-all "Siliguri"
const LOCALITIES = Array.from(
  new Set(PROJECTS.map((p) => p.location).filter((l) => l !== "Siliguri"))
);

const CONTACT = {
  email: "sales@sgmg.in",
  whatsapp: "919933321000",
};

const whatsappUrl = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

const enquiryUrl = (project: CommercialProject) =>
  whatsappUrl(
    project.status === "upcoming"
      ? `Hello SGMG, I'd like updates on your upcoming project at ${project.name}.`
      : `Hello SGMG, I'd like to know more about ${project.name}.`
  );

const SPACE_ENQUIRY = whatsappUrl("Hello SGMG, I'm looking for shop or office space in Siliguri.");
const LAND_EMAIL = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Joint venture: my land")}&body=${encodeURIComponent(
  ["Name:", "Phone:", "Where is the land?", "Approximate size:", ""].join("\n")
)}`;
const LAND_WHATSAPP = whatsappUrl("Hello SGMG, I own land and I'd like to talk about developing it with you.");

const COMMERCIAL_FAQS = [
  {
    q: "Which commercial projects has SGMG built in Siliguri?",
    a: "SGMG has completed Vega Circle Mall, Cosmos Mall, Jeevandeep Complex, City Plaza Complex, Spencer Plaza and Golden Plaza. Cosmos Connect and the Cosmos Prashil retail block are under construction, and projects at Burdwan Road, Eastern Bypass and Medical are coming next.",
  },
  {
    q: "Is shop or office space available?",
    a: "Ask about Cosmos Connect and the Cosmos Prashil retail block, which are under construction. Our sales team will tell you what space is available and share layouts, sizes and prices.",
  },
  {
    q: "Does SGMG run the INOX cinema at Vega Circle Mall?",
    a: "Yes. SGMG Multimedia, the group’s entertainment arm, runs the 1,100-seat INOX at Vega Circle Mall under a management contract with INOX Leisure Ltd.",
  },
  {
    q: "I own land. Can I develop it with SGMG?",
    a: "Yes. SGMG develops land in joint venture with landowners, turning a plot into a finished building and sharing the returns. Email sales@sgmg.in or call +91 99333 21000 to talk about your land.",
  },
  {
    q: "Where is the SGMG sales office?",
    a: "On the 2nd floor of Jeevandeep Tower in Salugara, one of SGMG’s own commercial projects.",
  },
];

// Fades sections in as they scroll into view. Content stays visible if the
// observer never runs, because the hidden state needs the cm-js class.
function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".cm-reveal"));

    root.classList.add("cm-js");
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

function GlanceCard() {
  const total = PROJECTS.length;
  return (
    <aside className="cm-glance" aria-label="SGMG commercial projects at a glance">
      <div className="cm-glance_total">
        <span className="cm-glance_num">{total}</span>
        <span className="cm-glance_label">commercial projects across Siliguri</span>
      </div>

      {/* Proportional bar; the legend below carries the same numbers in text */}
      <div className="cm-bar" aria-hidden="true">
        {STATUS_ORDER.map(({ status }) => (
          <span
            key={status}
            className={`cm-bar_seg is-${status}`}
            style={{ flexGrow: byStatus(status).length }}
          />
        ))}
      </div>

      <ul className="cm-legend">
        {STATUS_ORDER.map(({ status, anchor }) => (
          <li key={status}>
            <a href={anchor} className="cm-legend_item">
              <span className={`cm-legend_dot is-${status}`} aria-hidden="true" />
              <span className="cm-legend_count">{byStatus(status).length}</span>
              <span className="cm-legend_text">{STATUS_LABEL[status]}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="cm-places">
        <span className="cm-places_label">Where we’ve built</span>
        <ul className="cm-places_list">
          {LOCALITIES.map((place) => (
            <li key={place}>{place}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function BuildingCard({ project }: { project: CommercialProject }) {
  return (
    <article className="cm-build cm-reveal" aria-labelledby={`cm-${project.id}`}>
      <div className="cm-build_media">
        <img src={project.image} alt={`${project.name}, under construction`} width={408} height={318} loading="lazy" />
      </div>
      <div className="cm-build_body">
        <span className="cm-status is-ongoing">
          <span className="cm-status_dot" aria-hidden="true" />
          {STATUS_LABEL[project.status]}
        </span>
        <h3 id={`cm-${project.id}`} className="cm-build_name">{project.name}</h3>
        <span className="cm-place">
          <MapPin aria-hidden="true" />
          {project.location}
        </span>
        <p className="cm-build_text">{project.summary}</p>
        <div className="cm-build_actions">
          <PillButton
            text="Ask about space"
            href={enquiryUrl(project)}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel={`Ask about space at ${project.name} on WhatsApp`}
          />
        </div>
      </div>
    </article>
  );
}

function LandmarkTile({ project }: { project: CommercialProject }) {
  return (
    <li className="cm-tile">
      <figure className="cm-tile_figure">
        <img src={project.image} alt={project.name} width={408} height={318} loading="lazy" />
        {project.note && <span className="cm-tile_note">{project.note}</span>}
        <figcaption className="cm-tile_caption">
          <span className="cm-tile_name">{project.name}</span>
          <span className="cm-tile_place">
            <MapPin aria-hidden="true" />
            {project.location}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function CommercialPage() {
  const rootRef = useReveal();

  useEffect(() => {
    document.title = "Retail & Commercial • SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  return (
    <div ref={rootRef} className="page-wrapper cm-page">
      <Header />

      {/* No data-section here: it would mask the dark band from the header */}
      <main>
        {/* --- HERO --- */}
        <section className="cm-hero" data-section="light">
          <div className="cm-wrap cm-hero_grid">
            <div className="cm-hero_copy">
              <p className="cm-eyebrow">
                <span className="cm-dot" aria-hidden="true" />
                Retail &amp; commercial
              </p>
              <h1 className="cm-hero_title">
                Where Siliguri
                <br />
                shops &amp;{" "}
                <span data-scribble="2" className="scribble-wrap scribble-visible">works</span>
              </h1>
              <p className="cm-hero_lead">
                Malls, market complexes and office buildings across the city, from Vega
                Circle Mall at Check Post to the plazas of Burdwan Road. Two more are
                under construction now.
              </p>
              <div className="cm-hero_actions">
                <PillButton
                  text="Ask About Space"
                  href={SPACE_ENQUIRY}
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel="Ask about shop or office space on WhatsApp"
                />
                <a href="#cm-land" className="cm-link">
                  Own land? Partner with us
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <GlanceCard />
          </div>
        </section>

        {/* --- NOW BUILDING --- */}
        <section id="cm-building" className="cm-section cm-building" aria-labelledby="cm-building-title">
          <div className="cm-wrap">
            <div className="cm-intro cm-reveal">
              <h2 id="cm-building-title" className="cm-title">
                Now{" "}
                <span data-scribble="5" className="scribble-wrap scribble-visible">building</span>
              </h2>
              <p className="cm-intro_text">
                Looking for a shop or office? These two are under construction. Ask our
                sales team what space is available, with layouts, sizes and prices.
              </p>
            </div>

            <div className="cm-build_grid">
              {ONGOING.map((project) => (
                <BuildingCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* --- LANDMARKS (completed) --- */}
        <section id="cm-landmarks" className="cm-section cm-landmarks" aria-labelledby="cm-landmarks-title">
          <div className="cm-wrap">
            <div className="cm-intro cm-reveal">
              <h2 id="cm-landmarks-title" className="cm-title">
                Landmarks
                <br />
                we’ve built
              </h2>
              <p className="cm-intro_text">
                {COMPLETED.length} completed buildings that Siliguri shops, works and
                spends its evenings in.
              </p>
            </div>

            <ul className="cm-tiles cm-reveal">
              {COMPLETED.map((project) => (
                <LandmarkTile key={project.id} project={project} />
              ))}
            </ul>
          </div>
        </section>

        {/* --- COMING NEXT (upcoming, as stops on a route) --- */}
        <section id="cm-next" className="cm-section cm-next" aria-labelledby="cm-next-title">
          <div className="cm-wrap">
            <div className="cm-intro cm-reveal">
              <h2 id="cm-next-title" className="cm-title">
                Coming{" "}
                <span data-scribble="1" className="scribble-wrap scribble-visible">next</span>
              </h2>
              <p className="cm-intro_text">
                Three new commercial projects are planned. Details will follow; ask to hear
                about them first.
              </p>
            </div>

            <ol className="cm-route cm-reveal">
              {UPCOMING.map((project, i) => (
                <li key={project.id} className="cm-stop">
                  <span className="cm-stop_pin" aria-hidden="true">
                    <Building2 strokeWidth={1.5} />
                  </span>
                  <span className="cm-stop_num">Stop {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="cm-stop_name">{project.name}</h3>
                  <span className="cm-status is-upcoming">
                    <span className="cm-status_dot" aria-hidden="true" />
                    {STATUS_LABEL[project.status]}
                  </span>
                  <a
                    href={enquiryUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cm-link"
                    aria-label={`Get updates on ${project.name} on WhatsApp`}
                  >
                    Get updates
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --- INOX (dark band) --- */}
        <section className="cm-inox" data-section="dark" aria-labelledby="cm-inox-title">
          <div className="cm-wrap cm-inox_grid cm-reveal">
            <div className="cm-inox_copy">
              <span className="cm-inox_icon" aria-hidden="true">
                <Clapperboard strokeWidth={1.5} />
              </span>
              <h2 id="cm-inox-title" className="cm-title is-light">
                Evenings out, too
              </h2>
              <p>
                SGMG Multimedia, the group’s entertainment arm, runs the INOX at Vega
                Circle Mall under a management contract with INOX Leisure Ltd.
              </p>
            </div>
            <div className="cm-inox_stat">
              <span className="cm-inox_num">1,100</span>
              <span className="cm-inox_label">seats at INOX, Vega Circle Mall</span>
            </div>
          </div>
        </section>

        {/* --- LANDOWNERS (blue band) --- */}
        <section id="cm-land" className="cm-land" data-section="light" aria-labelledby="cm-land-title">
          <div className="cm-wrap cm-land_grid cm-reveal">
            <div>
              <h2 id="cm-land-title" className="cm-title">
                Own land in
                <br />
                Siliguri?
              </h2>
            </div>
            <div className="cm-land_body">
              <p>
                SGMG specialises in joint-venture development with landowners: we bring
                out the value in your plot and turn it into a finished building. Tell us
                where your land is and we’ll talk it through.
              </p>
              <div className="cm-land_actions">
                <PillButton text="Email Us About Your Land" href={LAND_EMAIL} variant="black" />
                <a href={LAND_WHATSAPP} target="_blank" rel="noopener noreferrer" className="cm-link is-dark">
                  <MessageCircle aria-hidden="true" />
                  or WhatsApp +91 99333 21000
                </a>
              </div>
              <p className="cm-land_note">
                <a href={`mailto:${CONTACT.email}`}>
                  <Mail aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>
        </section>

        <FaqSection
          faqs={COMMERCIAL_FAQS}
          caption="What people ask about SGMG’s shops, malls and offices."
        />
      </main>

      <Footer />
    </div>
  );
}
