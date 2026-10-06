import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PillButton from "../components/PillButton";
import "../story.css";
import "../team.css";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  /* Real headshot only. Until SGMG supplies one, the card shows a monogram
     rather than a stock photo of someone else. */
  photo?: string;
}

// Source: sgmg.in/our-team — these three are the real leadership.
const TEAM_MEMBERS: TeamMember[] = [
  { id: "sushil-mittal", name: "Sushil Gangadhar Mittal", role: "Founder", initials: "SM" },
  { id: "harshvardhan-mittal", name: "Harshvardhan Mittal", role: "Managing Director", initials: "HM" },
  { id: "mehul-mittal", name: "Mehul Mittal", role: "Managing Director", initials: "MM" },
];

const CONTACT = {
  email: "sales@sgmg.in",
  phone: "+91 99333 21000",
  whatsapp: "919933321000",
  address: "2nd Floor, Jeevandeep Tower, Salugara, Siliguri",
};

// The sales desk answers for all three; the message names who it's for
const whatsappFor = (member: TeamMember) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hello SGMG, I would like to speak with ${member.name}.`
  )}`;

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div role="listitem" className="apartment_item w-dyn-item">
      {/* Same markup as the residence cards' photo area */}
      <div className="apart_image grid_apartments">
        <div className="overlay_tags">
          <div className="tag_available">
            <div className="dot_available" />
            <div className="txt_available">{member.role}</div>
          </div>
        </div>

        <div className="carousel_parent_apartments">
          <div className="carousel_list">
            <div className="carousel_item w-dyn-item">
              <div className="carousel_apartments">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="image_carousel" loading="lazy" />
                ) : (
                  <div className="team_monogram" aria-hidden="true">
                    {member.initials}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content_apart">
        <div className="apart_title_line">
          <div className="apartment_title">
            <span className="apart_title">{member.name}</span>
          </div>
        </div>

        <div className="explore_button">
          <PillButton
            text="Get in Touch"
            href={whatsappFor(member)}
            target="_blank"
            rel="noreferrer"
            textBoxClassName="apartments_button"
          />
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  useEffect(() => {
    document.title = "Our Team • SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  return (
    <div className="page-wrapper apartments-page-view team-page-view">
      <Header />

      <main className="apartments-page-main" data-section="light">
        {/* --- HEADING & LEADERSHIP (Residences layout) --- */}
        <section data-section="light">
          <div className="wrapper_general apartments_gen">
            <div className="heading_aparts">
              <div className="heading_aparts_row">
                <h1 className="h1 black spec_amenities">
                  The people<br />
                  behind <span data-scribble="2" className="scribble-wrap scribble-visible">SGMG</span>
                </h1>
              </div>
            </div>

            <div className="apartments_sides">
              {/* Left column: where the Residences page has its filters */}
              <div className="team_side">
                <div className="filter_title"><div>Leadership</div></div>
                <p className="team_side_text">
                  A family business, established in 1985 as a unit of the Begraj Group.
                  The sales desk at Jeevandeep Tower puts you through to any of them.
                </p>

                <dl className="team_contact">
                  <div>
                    <dt>Office</dt>
                    <dd>{CONTACT.address}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a></dd>
                  </div>
                </dl>
              </div>

              <div className="apartments_box">
                <div className="apartments_grid" role="list">
                  {TEAM_MEMBERS.map((member) => (
                    <TeamCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- STORY (About page layout) --- */}
        <section data-section="light" className="about_story_sec">
          <div className="wrapper_about_story">
            <div className="about_story_heading">
              <h2 className="h2 about_story_h">
                A family business
                <br />
                since{" "}
                <span data-scribble="5" className="scribble-wrap scribble-visible">
                  1985.
                </span>
              </h2>
            </div>

            <div className="about_story_showcase">
              <div className="about_story_visual">
                <div className="about_img_frame">
                  <img
                    src="/images/projects/green-view.jpg"
                    alt="Green View, an SGMG residential project in Siliguri"
                    loading="lazy"
                    className="about_feature_img"
                  />
                  <div className="about_img_badge">
                    <div className="badge_dot" />
                    <span>Green View, Siliguri</span>
                  </div>
                </div>
              </div>

              <div className="about_story_content">
                <div className="about_story_lead">
                  “Our main values are dependability and quality, and we hold every
                  project we take on to them.”
                </div>
                <div className="p_gen black about_story_body">
                  After many years in the family business, Sushil Gangadhar Mittal founded
                  SGMG as a unit of the Begraj Group. Under his leadership the group has
                  built homes such as Cosmos Valley, Green View and Green Valley, and
                  commercial landmarks such as Vega Circle Mall and Cosmos Mall. Today he
                  leads SGMG with Managing Directors Harshvardhan Mittal and Mehul Mittal.
                </div>

                <div className="about_story_stats">
                  <div className="about_stat_box">
                    <div className="about_stat_num">1985</div>
                    <div className="about_stat_lbl">Established</div>
                  </div>
                  <div className="about_stat_box">
                    <div className="about_stat_num">Begraj</div>
                    <div className="about_stat_lbl">Parent group</div>
                  </div>
                  <div className="about_stat_box">
                    <div className="about_stat_num">Jeevandeep</div>
                    <div className="about_stat_lbl">Office, Salugara</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core values, from sgmg.in/thecompany */}
            <div className="about_pillars">
              <div className="about_pillar_item">
                <div className="about_pillar_num">01</div>
                <div className="about_pillar_title">Dependability &amp; Quality</div>
                <div className="about_pillar_desc">
                  The two values SGMG holds every project to, whether it’s a home, a mall
                  or an office block.
                </div>
              </div>

              <div className="about_pillar_item">
                <div className="about_pillar_num">02</div>
                <div className="about_pillar_title">Listening First</div>
                <div className="about_pillar_desc">
                  We meet our clients’ needs by paying attention to what they say and
                  taking the time to understand them.
                </div>
              </div>

              <div className="about_pillar_item">
                <div className="about_pillar_num">03</div>
                <div className="about_pillar_title">On Schedule</div>
                <div className="about_pillar_desc">
                  We take pride in handing over finished spaces on schedule, project after
                  project.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
