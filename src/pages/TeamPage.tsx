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
  address: "2nd Floor, SGMG Construction Pvt Ltd, Jeevandeep Tower, Siliguri",
};

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
                </div>

                <div className="team_card_body">
                  <p className="team_member_role">{member.role}</p>
                  <h3 className="team_member_name">{member.name}</h3>
                  <p className="team_member_bio">{member.bio}</p>
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
