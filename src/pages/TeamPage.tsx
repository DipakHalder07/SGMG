import React, { useState, useEffect } from "react";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import "../team.css";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Executive Leadership" | "Architecture & Design" | "Community & Resident Wellness" | "Operations & Relations";
  image: string;
  tagline: string;
  bio: string;
  highlights: string[];
  quote: string;
  email: string;
  linkedin: string;
  isSpotlight?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sushil-mittal",
    name: "Sushil Gangadhar Mittal",
    role: "Founder & Group Chairman",
    department: "Executive Leadership",
    image: "/images/team/sushil-mittal.jpg",
    tagline: "Building tomorrow's living environments on timeless values of trust, precision, and architectural innovation.",
    bio: "With over 35 years of pioneering leadership in infrastructure, commercial developments, and luxury residential real estate across Siliguri and North Bengal, Sushil Gangadhar Mittal founded SGMG with a singular vision: to create tranquil, world-class living spaces. Under his stewardship, SGMG has delivered prestigious landmarks, creating communities where modern craftsmanship, structural integrity, and family warmth converge.",
    highlights: [
      "35+ Years of Real Estate & Infrastructure Leadership",
      "Visionary Founder of SGMG Group",
      "Pioneered Master-Planned Residences in Siliguri",
      "Member of CREDAI & Regional Development Councils",
    ],
    quote: "“A great residence does not simply provide four walls; it elevates family life and builds enduring generational value.”",
    email: "sushil.mittal@sgmg.in",
    linkedin: "https://linkedin.com",
    isSpotlight: true,
  },
  {
    id: "aryan-mittal",
    name: "Aryan Mittal",
    role: "Managing Director & CEO",
    department: "Executive Leadership",
    image: "/images/team/aryan-mittal.jpg",
    tagline: "Reimagining contemporary real estate as a catalyst for elevated lifestyles, community, and sustainable growth.",
    bio: "A graduate of premier international management programs, Aryan brings visionary modern energy to SGMG. He spearheads the group's strategic growth across Siliguri, smart construction technologies, customer-centric digital platforms, and premium residential design. Aryan is passionate about setting hospitality-grade benchmarks in modern home living.",
    highlights: [
      "Oversees Strategy, Technology & Group Expansion",
      "Pioneered Hospitality-Grade Residential Standards",
      "Spearheaded Digital Homeowner Experience Portal",
      "Passionate Advocate for Sustainable Urbanism",
    ],
    quote: "“We are designing sanctuaries where families can thrive peacefully, enjoy world-class amenities, and feel truly at home.”",
    email: "aryan.mittal@sgmg.in",
    linkedin: "https://linkedin.com",
    isSpotlight: true,
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Chief Architect & Design Director",
    department: "Architecture & Design",
    image: "/images/team/priya-sharma.jpg",
    tagline: "Crafting biophilic, sunlit spaces that harmoniously balance quiet contemplation and dynamic social connection.",
    bio: "Priya is an acclaimed architect with a master’s in Sustainable Urbanism from CEPT. She directs SGMG's architectural philosophy, from sculptural exterior facades to human-centric interior spatial layouts. Her designs prioritize natural daylight, thermal comfort, cross-ventilation, and expansive balconies overlooking scenic Siliguri landscapes.",
    highlights: [
      "Master of Sustainable Urbanism (CEPT)",
      "IGBC Accredited Green Building Professional",
      "12+ Years Designing High-Performance Residences",
      "Winner of National Award for Spatial Design",
    ],
    quote: "“Architecture must speak to the human spirit. In residential developments, natural light and quiet acoustic pockets are foundational to mental clarity.”",
    email: "priya.sharma@sgmg.in",
    linkedin: "https://linkedin.com",
  },
  {
    id: "rohan-mehra",
    name: "Rohan Mehra",
    role: "Director of Resident Experience & Community",
    department: "Community & Resident Wellness",
    image: "/images/team/rohan-mehra.jpg",
    tagline: "Creating an energetic, inclusive community where every resident feels supported, connected, and inspired.",
    bio: "Rohan leads homeowner community programming, clubhouse lifestyle amenities, cultural celebrations, and resident well-being at SGMG. With a background in hospitality management and community engagement, he curates festive gatherings, fitness workshops, and social events that make living at SGMG a rewarding lifestyle experience.",
    highlights: [
      "Master's in Applied Community Management",
      "Curator of 50+ Annual Resident Networking & Cultural Events",
      "Architect of the SGMG Homeowner Club Network",
      "Champion for Diverse & Inclusive Living Environments",
    ],
    quote: "“A true community is born when neighbors become lifelong friends. We ensure our shared spaces spark lasting bonds.”",
    email: "rohan.mehra@sgmg.in",
    linkedin: "https://linkedin.com",
  },
  {
    id: "anjali-sharma",
    name: "Anjali Sharma",
    role: "Chief Financial Officer",
    department: "Executive Leadership",
    image: "/images/team/anjali-sharma.jpg",
    tagline: "Sustaining high-impact real estate growth through sound fiscal stewardship and institutional integrity.",
    bio: "A fellow chartered accountant and seasoned investment strategist with over 16 years leading private equity and asset management portfolios, Anjali oversees financial operations, bank home loan alliances, capital allocation, and investor relations. She ensures SGMG maintains impeccable operational transparency and sustainable financial foundations.",
    highlights: [
      "Fellow Chartered Accountant (FCA) & MBA Finance",
      "16+ Years Managing Large-Scale Real Estate Assets",
      "Specialist in Long-Term Value Creation & ESG Investment",
      "Member of Association of Women Financial Leaders",
    ],
    quote: "“Financial resilience and uncompromising integrity enable us to deliver enduring value to every homeowner and stakeholder.”",
    email: "anjali.sharma@sgmg.in",
    linkedin: "https://linkedin.com",
  },
  {
    id: "rahul-sharma",
    name: "Rahul Sharma",
    role: "VP of Sales & Client Relations",
    department: "Operations & Relations",
    image: "/images/team/rahul-sharma.jpg",
    tagline: "Delivering white-glove advisory from your initial inquiry to possession handover.",
    bio: "Rahul brings over a decade of luxury residential advisory and client relations experience from premier real estate and hospitality brands. He leads our Siliguri sales desk, private site walkthroughs, documentation assistance, and homebuyer onboarding with warm, transparent dedication.",
    highlights: [
      "10+ Years in Luxury Real Estate & Property Advisory",
      "Designed Seamless Zero-Paperwork Homeowner Onboarding",
      "Dedicated Client & NRI Relationship Desk Lead",
      "Excellence in Homeowner Support & Rapid Resolution",
    ],
    quote: "“Our team’s promise is simple: we handle every detail with warmth, responsiveness, and genuine care so our homeowners can enjoy complete peace of mind.”",
    email: "rahul.sharma@sgmg.in",
    linkedin: "https://linkedin.com",
  },
  {
    id: "rajesh-verma",
    name: "Dr. Rajesh Verma",
    role: "VP of Sustainable Infrastructure & Engineering",
    department: "Architecture & Design",
    image: "/images/team/rajesh-verma.jpg",
    tagline: "Engineering carbon-conscious infrastructure that protects our planet and nurtures resident well-being.",
    bio: "Holding a Ph.D. in Environmental and Structural Engineering from IIT Delhi, Dr. Verma oversees structural integrity, high-efficiency solar integration, rainwater harvesting, smart energy systems, and earthquake-resistant construction. He ensures every SGMG residence meets IGBC Gold and Platinum standards.",
    highlights: [
      "Ph.D. in Environmental Engineering (IIT Delhi)",
      "IGBC Platinum Green Building Lead Assessor",
      "Integrated 100kW+ Clean Solar & Rainwater Recovery Systems",
      "Authored 20+ Papers on Sustainable Urban Habitats",
    ],
    quote: "“True luxury lives in clean air, natural water purity, and environmental harmony. Sustainable engineering is our duty to the future.”",
    email: "rajesh.verma@sgmg.in",
    linkedin: "https://linkedin.com",
  },
  {
    id: "kavita-patel",
    name: "Kavita Patel",
    role: "Head of Resident Wellness & Amenities",
    department: "Community & Resident Wellness",
    image: "/images/team/kavita-patel.jpg",
    tagline: "Nurturing mental peace, mindful living, and wholesome lifestyle amenities for modern families.",
    bio: "Certified in mindfulness coaching and holistic health, Kavita oversees clubhouse amenities, yoga pavilions, acoustic meditation gardens, and recreation spaces across SGMG developments. Her thoughtful approach ensures every resident finds balance, fitness, and relaxation.",
    highlights: [
      "Certified Mindfulness & Holistic Health Practitioner",
      "Lead Coordinator for Clubhouse Wellness & Fitness Amenities",
      "Designer of Landscaped Meditation & Acoustic Garden Sanctuaries",
      "Organizes Regular Yoga, Fitness & Lifestyle Workshops",
    ],
    quote: "“When families feel balanced, active, and mentally supported, everyday living flourishes. Wellness is woven into daily life at SGMG.”",
    email: "kavita.patel@sgmg.in",
    linkedin: "https://linkedin.com",
  },
];

const DEPARTMENTS = [
  "All Leaders",
  "Executive Leadership",
  "Architecture & Design",
  "Community & Resident Wellness",
  "Operations & Relations",
] as const;

export default function TeamPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All Leaders");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Set document title
  useEffect(() => {
    document.title = "Our Leadership Team | SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  // Keyboard accessibility for modal (ESC closes)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter team members based on department
  const filteredMembers =
    selectedDept === "All Leaders"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === selectedDept);

  // Founder spotlight item
  const founder = TEAM_MEMBERS.find((m) => m.id === "sushil-mittal") || TEAM_MEMBERS[0];

  return (
    <div className="team_page">
      {/* Brand Header */}
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="team_hero">
        <div className="team_hero_container">
          <h1 className="team_hero_title">
            Crafting spaces that{" "}
            <span className="accent_scribble">inspire & elevate</span>
          </h1>

          <p className="team_hero_desc">
            From architectural visionaries and green engineers to dedicated client experience directors,
            our multidisciplinary leadership is committed to setting new benchmarks for luxury residential
            living in Siliguri.
          </p>

          {/* Key Metrics / Highlights */}
          <div className="team_stats_grid">
            <div className="team_stat_item">
              <span className="team_stat_num">35+</span>
              <span className="team_stat_label">Years of Group Heritage & Excellence</span>
            </div>
            <div className="team_stat_item">
              <span className="team_stat_num">600+</span>
              <span className="team_stat_label">Luxury Residences Delivered</span>
            </div>
            <div className="team_stat_item">
              <span className="team_stat_num">99.2%</span>
              <span className="team_stat_label">Resident Satisfaction & Trust Index</span>
            </div>
            <div className="team_stat_item">
              <span className="team_stat_num">24 / 7</span>
              <span className="team_stat_label">Onsite Concierge, Security & Facility Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FILTER TABS BAR --- */}
      <div className="team_filter_bar">
        <div className="team_filter_container">
          <div className="team_filter_tabs" role="tablist">
            {DEPARTMENTS.map((dept) => {
              const count =
                dept === "All Leaders"
                  ? TEAM_MEMBERS.length
                  : TEAM_MEMBERS.filter((m) => m.department === dept).length;
              const isActive = selectedDept === dept;

              return (
                <button
                  key={dept}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`team_tab_btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setSelectedDept(dept)}
                >
                  <span>{dept}</span>
                  <span className="team_tab_count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="team_filter_info">
            Showing {filteredMembers.length} {filteredMembers.length === 1 ? "Leader" : "Leaders"}
          </div>
        </div>
      </div>

      {/* --- FEATURED FOUNDER SPOTLIGHT (Shown when "All Leaders" or "Executive Leadership" is selected) --- */}
      {(selectedDept === "All Leaders" || selectedDept === "Executive Leadership") && (
        <section className="team_spotlight_section">
          <div className="team_spotlight_card">
            <div className="team_spotlight_image_box">
              <img
                src={founder.image}
                alt={founder.name}
                className="team_spotlight_image"
              />
              <div className="team_spotlight_badge">Group Founder</div>
            </div>

            <div className="team_spotlight_content">
              <div className="team_spotlight_role">{founder.role}</div>
              <h2 className="team_spotlight_name">{founder.name}</h2>
              <blockquote className="team_spotlight_quote">
                {founder.quote}
              </blockquote>
              <p className="team_spotlight_bio">{founder.bio}</p>

              <div className="team_spotlight_tags">
                {founder.highlights.map((h, idx) => (
                  <span key={idx} className="team_spotlight_tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2391cf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {h}
                  </span>
                ))}
              </div>

              <div className="team_spotlight_actions">
                <WebflowButton
                  text="Read Full Journey"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMember(founder);
                  }}
                />
                <a
                  href={`mailto:${founder.email}`}
                  className="team_member_social_link"
                  title={`Email ${founder.name}`}
                  aria-label={`Email ${founder.name}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- TEAM MEMBERS GRID --- */}
      <section className="team_grid_section">
        <div className="team_section_header">
          <h2 className="team_section_title">
            {selectedDept === "All Leaders" ? "Executive & Department Leadership" : selectedDept}
          </h2>
          <p className="team_section_subtitle">
            Dedicated professionals committed to delivering unmatched living, architectural precision, and community well-being.
          </p>
        </div>

        <div className="team_cards_grid">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="team_member_card"
              onClick={() => setSelectedMember(member)}
            >
              <div className="team_member_image_wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team_member_image"
                  loading="lazy"
                />
                <span className="team_member_dept_badge">{member.department}</span>
              </div>

              <div className="team_member_content">
                <h3 className="team_member_name">{member.name}</h3>
                <div className="team_member_title">{member.role}</div>
                <p className="team_member_tagline">{member.tagline}</p>

                <div className="team_member_footer">
                  <button
                    type="button"
                    className="team_member_bio_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                  >
                    <span>Read Bio</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="team_member_social_row">
                    <a
                      href={`mailto:${member.email}`}
                      className="team_member_social_link"
                      onClick={(e) => e.stopPropagation()}
                      title={`Email ${member.name}`}
                      aria-label={`Email ${member.name}`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="team_member_social_link"
                      onClick={(e) => e.stopPropagation()}
                      title={`${member.name} on LinkedIn`}
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- OUR VALUES & CULTURE SECTION --- */}
      <section className="team_values_section">
        <div className="team_values_container">
          <div className="team_values_header">
            <span className="team_values_badge">Our Core Principles</span>
            <h2 className="team_values_title">What drives our leadership every single day</h2>
            <p className="team_values_subtitle">
              We believe a home is much more than a structure. It is the fertile soil where
              aspirations take flight, families thrive, and lifelong memories are forged.
            </p>
          </div>

          <div className="team_values_grid">
            <div className="team_value_card">
              <div className="team_value_icon_wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="team_value_heading">Resident-First Empathy</h3>
              <p className="team_value_text">
                Every architectural layout, expansive balcony, and community amenity is designed around
                what families need to thrive comfortably and peacefully.
              </p>
            </div>

            <div className="team_value_card">
              <div className="team_value_icon_wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <h3 className="team_value_heading">Architectural Distinction</h3>
              <p className="team_value_text">
                We craft spaces with natural daylight, superior acoustic soundproofing, and biophilic landscaped courtyards
                that encourage deep relaxation and tranquil family living.
              </p>
            </div>

            <div className="team_value_card">
              <div className="team_value_icon_wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="team_value_heading">IGBC Green Standards</h3>
              <p className="team_value_text">
                Committed to environmental stewardship with high-yield solar rooftop arrays, rainwater recycling,
                and energy-efficient smart climate controls.
              </p>
            </div>

            <div className="team_value_card">
              <div className="team_value_icon_wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="team_value_heading">Safety & Peace of Mind</h3>
              <p className="team_value_text">
                Multi-tier security access, 24/7 onsite surveillance professionals, and dedicated resident concierge
                give homeowners and families total peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* --- INTERACTIVE MEMBER DETAIL MODAL --- */}
      {selectedMember && (
        <div
          className="team_modal_backdrop"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="team_modal_content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="team_modal_close_btn"
              onClick={() => setSelectedMember(null)}
              aria-label="Close profile modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="team_modal_left">
              <div className="team_modal_avatar_box">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="team_modal_avatar"
                />
              </div>

              <div className="team_modal_contact_box">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="team_modal_contact_link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>{selectedMember.email}</span>
                </a>

                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="team_modal_contact_link"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="team_modal_right">
              <span className="team_modal_dept">{selectedMember.department}</span>
              <h2 className="team_modal_name">{selectedMember.name}</h2>
              <div className="team_modal_role">{selectedMember.role}</div>

              <blockquote className="team_modal_quote">
                {selectedMember.quote}
              </blockquote>

              <p className="team_modal_bio">{selectedMember.bio}</p>

              <div>
                <div className="team_modal_highlights_title">Key Specializations & Leadership Roles</div>
                <div className="team_modal_highlights_list">
                  {selectedMember.highlights.map((h, i) => (
                    <div key={i} className="team_modal_highlight_item">
                      <span className="team_modal_highlight_dot" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
