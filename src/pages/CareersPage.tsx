import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PillButton from "../components/PillButton";
import FaqSection from "../components/FaqSection";
import "../story.css";
import "../careers.css";

interface WorkArea {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/* The kinds of work SGMG does, not advertised vacancies: no openings,
   salaries or deadlines are listed until SGMG supplies real ones. */
const WORK_AREAS: WorkArea[] = [
  {
    id: "sales",
    title: "Sales & Customer Care",
    description: "Help families choose a home and businesses find space, from the first site visit to handover.",
    image: "/images/projects/green-view.jpg",
    imageAlt: "Green View, an SGMG residential project",
  },
  {
    id: "sites",
    title: "Sites & Engineering",
    description: "Build SGMG’s homes and commercial projects across Siliguri, from foundations to finishing.",
    image: "/images/commercial/cosmos-connect.jpg",
    imageAlt: "Cosmos Connect, an SGMG commercial project under construction",
  },
  {
    id: "office",
    title: "Office & Accounts",
    description: "Keep the business running: accounts, purchasing, paperwork and administration.",
    image: "/images/commercial/jeevandeep-complex.jpg",
    imageAlt: "Jeevandeep Complex, home of the SGMG office",
  },
];

const CONTACT = {
  email: "sales@sgmg.in",
  phone: "+91 99333 21000",
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

const CAREER_FAQS = [
  {
    q: "Are there openings right now?",
    a: "We don’t list fixed vacancies on the website. Send us your CV and tell us the kind of work you’re looking for, and the team will get in touch if there’s a role that fits.",
  },
  {
    q: "How do I apply?",
    a: `Email your CV to ${CONTACT.email} with “Job application” and the area of work in the subject line. The Apply buttons on this page open that email for you, ready to fill in.`,
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

function WorkAreaCard({ area }: { area: WorkArea }) {
  return (
    <div role="listitem" className="apartment_item w-dyn-item">
      {/* Same markup as the residence cards' photo area, with one photo */}
      <div className="apart_image grid_apartments">
        <div className="overlay_tags">
          <div className="tag_available">
            <div className="dot_available" />
            <div className="txt_available">Siliguri</div>
          </div>
        </div>

        <div className="carousel_parent_apartments">
          <div className="carousel_list">
            <div className="carousel_item w-dyn-item">
              <div className="carousel_apartments">
                <img src={area.image} alt={area.imageAlt} className="image_carousel" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content_apart">
        <div className="apart_title_line">
          <div className="apartment_title">
            <span className="apart_title">{area.title}</span>
          </div>
        </div>
        <p className="careers_card_desc">{area.description}</p>

        <div className="explore_button">
          <PillButton text="Apply" href={applyMailto(area.title)} textBoxClassName="apartments_button" />
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  useEffect(() => {
    document.title = "Careers • SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  return (
    <div className="page-wrapper apartments-page-view careers-page-view">
      <Header />

      <main className="apartments-page-main" data-section="light">
        {/* --- HEADING & WORK AREAS (Residences layout) --- */}
        <section data-section="light">
          <div className="wrapper_general apartments_gen">
            <div className="heading_aparts">
              <div className="heading_aparts_row">
                <h1 className="h1 black spec_amenities">
                  Build <span data-scribble="2" className="scribble-wrap scribble-visible">Siliguri</span>
                  <br />
                  with us
                </h1>
              </div>
            </div>

            <div className="apartments_sides">
              {/* Left column: where the Residences page has its filters */}
              <div className="careers_side">
                <div className="filter_title"><div>Careers</div></div>
                <p className="careers_side_text">
                  SGMG has been building homes, malls and offices in Siliguri since 1985.
                  We’re always glad to hear from people who want to build with us.
                </p>
                <div className="careers_side_cta">
                  <PillButton text="Send Your CV" href={applyMailto()} />
                </div>

                <dl className="careers_contact">
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
                  </div>
                  <div>
                    <dt>Office</dt>
                    <dd>{CONTACT.address}</dd>
                  </div>
                </dl>
              </div>

              <div className="apartments_box">
                <div className="apartments_grid" role="list">
                  {WORK_AREAS.map((area) => (
                    <WorkAreaCard key={area.id} area={area} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY SGMG (About page layout) --- */}
        <section data-section="light" className="about_story_sec">
          <div className="wrapper_about_story">
            <div className="about_story_heading">
              <h2 className="h2 about_story_h">
                Why work
                <br />
                at{" "}
                <span data-scribble="5" className="scribble-wrap scribble-visible">
                  SGMG.
                </span>
              </h2>
            </div>

            <div className="about_story_showcase">
              <div className="about_story_visual">
                <div className="about_img_frame">
                  <img
                    src="/images/commercial/vega-circle-mall.jpg"
                    alt="Vega Circle Mall, built by SGMG"
                    loading="lazy"
                    className="about_feature_img"
                  />
                  <div className="about_img_badge">
                    <div className="badge_dot" />
                    <span>Vega Circle Mall, built by SGMG</span>
                  </div>
                </div>
              </div>

              <div className="about_story_content">
                <div className="about_story_lead">
                  “Performance with purpose — neighbourhoods to live in, healthy
                  environments to work in, and malls that serve as a complete family
                  destination.”
                </div>
                <div className="p_gen black about_story_body">
                  SGMG has built homes such as Cosmos Valley, Green View and Cosmos Prashil,
                  and commercial landmarks such as Vega Circle Mall, Cosmos Mall and
                  Jeevandeep Complex, where our office is. The group also runs the INOX
                  multiplex at Vega Circle Mall.
                </div>

                <div className="about_story_stats">
                  <div className="about_stat_box">
                    <div className="about_stat_num">1985</div>
                    <div className="about_stat_lbl">Established</div>
                  </div>
                  <div className="about_stat_box">
                    <div className="about_stat_num">5</div>
                    <div className="about_stat_lbl">Residential projects</div>
                  </div>
                  <div className="about_stat_box">
                    <div className="about_stat_num">11</div>
                    <div className="about_stat_lbl">Commercial projects</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about_pillars">
              <div className="about_pillar_item">
                <div className="about_pillar_num">01</div>
                <div className="about_pillar_title">Work You Can See</div>
                <div className="about_pillar_desc">
                  Our projects are homes, malls and offices that people in Siliguri use
                  every day.
                </div>
              </div>

              <div className="about_pillar_item">
                <div className="about_pillar_num">02</div>
                <div className="about_pillar_title">A Family Business</div>
                <div className="about_pillar_desc">
                  The founder and both managing directors work from the same office at
                  Jeevandeep Tower.
                </div>
              </div>

              <div className="about_pillar_item">
                <div className="about_pillar_num">03</div>
                <div className="about_pillar_title">More Than One Kind of Project</div>
                <div className="about_pillar_desc">
                  Residential, retail and entertainment, from apartment blocks to the
                  INOX at Vega Circle Mall.
                </div>
              </div>
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
