import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../team.css";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  photo: string;
  bio: string;
  /* Real profile URL only. Left unset until SGMG supplies one — the card
     simply omits the icon rather than linking somewhere invented. */
  linkedin?: string;
}

// Source: sgmg.in/our-team — these three are the real leadership. The photos are
// placeholders; swap them for genuine headshots before launch.
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sushil-mittal",
    name: "Sushil Gangadhar Mittal",
    role: "Founder",
    initials: "SM",
    photo: "/images/team/sushil-mittal.jpg",
    bio: "Sushil Mittal built SGMG into a recognised name in Siliguri real estate. Long experience in the family business shaped the leadership that led him to found SGMG as a unit of the Begraj Group \u2014 a company that today handles residential and commercial complexes across the region. His knowledge of the market, his openness and his long view are what keep SGMG a dependable name for buyers.",
  },
  {
    id: "harshvardhan-mittal",
    name: "Harshvardhan Mittal",
    role: "Managing Director",
    initials: "HM",
    photo: "/images/team/aryan-mittal.jpg",
    bio: "Harshvardhan Mittal oversees the group\u2019s project delivery and day-to-day operations across its residential and commercial developments in Siliguri.",
  },
  {
    id: "mehul-mittal",
    name: "Mehul Mittal",
    role: "Managing Director",
    initials: "MM",
    photo: "/images/team/rohan-mehra.jpg",
    bio: "Mehul Mittal shares responsibility for the group\u2019s developments, working across planning, execution and client relationships.",
  },
];

const CONTACT = {
  email: "sales@sgmg.in",
  phone: "+91 99333 21000",
  whatsapp: "919933321000",
  address: "2nd Floor, SGMG Construction Pvt Ltd, Jeevandeep Tower, Siliguri",
};

/* The sales desk fields enquiries for all three, as the section says. Each
   card's actions route there with the member's name in the subject. */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.75.59.25 1.05.4 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.75 21.5h4.5V10h-4.5v11.5ZM9.75 10v11.5h4.5v-6.2c0-1.72.86-2.6 2.1-2.6 1.17 0 1.9.78 1.9 2.6v6.2h4.5v-6.86c0-3.6-1.9-5.24-4.44-5.24-1.98 0-2.99 1.07-3.56 1.93V10h-5Z" />
  </svg>
);

export default function TeamPage() {
  // Monogram stands in whenever a headshot fails to load.
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = "Our Team \u2022 SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  return (
    <div className="team_page" data-section="light">
      <Header />

      {/* --- HERO --- */}
      <section className="team_hero" data-section="light">
        <div className="team_wrap">
          <h1 className="team_hero_title">
            The people behind{" "}
            <span className="accent_scribble">SGMG</span>
          </h1>

          <p className="team_hero_desc">
            A family business, established in 1985 as a unit of the Begraj Group.
          </p>
        </div>
      </section>

      {/* --- LEADERSHIP --- */}
      <section className="team_section">
        <div className="team_wrap">
          <h2 className="team_section_title">Leadership</h2>
          <p className="team_section_subtitle">
            Reach any of them through the sales desk at Jeevandeep Tower.
          </p>

          <div className="team_grid">
            {TEAM_MEMBERS.map((member) => (
              <article className="team_card" key={member.id}>
                <div className="team_card_media">
                  {failedPhotos[member.id] ? (
                    <span className="team_initials" aria-hidden="true">
                      {member.initials}
                    </span>
                  ) : (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="team_photo"
                      loading="lazy"
                      decoding="async"
                      onError={() =>
                        setFailedPhotos((prev) => ({ ...prev, [member.id]: true }))
                      }
                    />
                  )}
                  <span className="team_member_role">{member.role}</span>
                </div>

                <div className="team_card_body">
                  <h3 className="team_member_name">{member.name}</h3>
                  <p className="team_member_bio">{member.bio}</p>

                  <div className="team_card_actions">
                    <a
                      className="team_action"
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                        `Enquiry for ${member.name}`
                      )}`}
                      aria-label={`Email the sales desk about ${member.name}`}
                    >
                      <MailIcon />
                      <span>Email</span>
                    </a>

                    <a
                      className="team_action"
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                        `Hello SGMG, I would like to speak with ${member.name}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Message the sales desk on WhatsApp about ${member.name}`}
                    >
                      <WhatsAppIcon />
                      <span>WhatsApp</span>
                    </a>

                    {member.linkedin && (
                      <a
                        className="team_action team_action--icon"
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section className="team_section">
        <div className="team_wrap">
          <h2 className="team_section_title">Get in touch</h2>
          <p className="team_section_subtitle">
            The sales desk answers for all three. Walk in, write, or call.
          </p>

          <div className="team_contact_row">
            <div className="team_contact_card">
              <p className="team_contact_label">Office</p>
              <p className="team_contact_value">{CONTACT.address}</p>
            </div>

            <a
              href={`mailto:${CONTACT.email}`}
              className="team_contact_card team_contact_card--link"
            >
              <p className="team_contact_label">Email</p>
              <p className="team_contact_value">{CONTACT.email}</p>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="team_contact_card team_contact_card--link"
            >
              <p className="team_contact_label">Phone</p>
              <p className="team_contact_value">{CONTACT.phone}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
