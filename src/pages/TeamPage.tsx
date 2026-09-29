import React, { useState, useEffect } from "react";
import Header from "../components/Header";
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

  return (
    <div className="team_page" data-section="light">
      {/* Brand Header */}
      <Header />

      {/* --- HERO --- */}
      <section className="team_hero" data-section="light">
        <div className="team_wrap">
          <h1 className="team_hero_title">
            Crafting spaces that{" "}
            <span className="accent_scribble">inspire &amp; elevate</span>
          </h1>

          <p className="team_hero_desc">
            The architects, engineers and advisors behind every SGMG home in
            Siliguri.
          </p>
        </div>
      </section>

      {/* --- LEADERSHIP --- */}
      <section className="team_section">
        <div className="team_wrap">
          <h2 className="team_section_title">Leadership</h2>
          <p className="team_section_subtitle">
            {TEAM_MEMBERS.length} people, based at Jeevandeep Tower.
          </p>

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
                  {dept}
                  <span className="team_tab_count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="team_cards_grid">
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                className="team_member_card"
                onClick={() => setSelectedMember(member)}
              >
                <span className="team_member_image_wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team_member_image"
                    loading="lazy"
                  />
                </span>
                <span className="team_member_name">{member.name}</span>
                <span className="team_member_role">{member.role}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT WE BUILD FOR --- */}
      <section className="team_section">
        <div className="team_wrap">
          <h2 className="team_section_title">What we build for</h2>
          <p className="team_section_subtitle">
            The four things every project is measured against.
          </p>

          <div className="team_values_grid">
            <div>
              <h3 className="team_value_heading">Residents first</h3>
              <p className="team_value_text">
                Layouts are planned around how families actually live, not around
                what fits on a drawing.
              </p>
            </div>
            <div>
              <h3 className="team_value_heading">Daylight and air</h3>
              <p className="team_value_text">
                Cross ventilation, deep balconies and landscaped courtyards on
                every project.
              </p>
            </div>
            <div>
              <h3 className="team_value_heading">Green standards</h3>
              <p className="team_value_text">
                Rainwater harvesting, solar provision and efficient services,
                built to IGBC guidance.
              </p>
            </div>
            <div>
              <h3 className="team_value_heading">Safety</h3>
              <p className="team_value_text">
                Multi-tier access control, round-the-clock surveillance and
                on-site facility staff.
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

            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="team_modal_avatar"
            />

            <h2 className="team_modal_name">{selectedMember.name}</h2>
            <p className="team_modal_role">{selectedMember.role}</p>

            <p className="team_modal_bio">{selectedMember.bio}</p>

            <div className="team_modal_highlights_title">Focus areas</div>
            <ul className="team_modal_list">
              {selectedMember.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <div className="team_modal_contact_box">
              <a
                href={`mailto:${selectedMember.email}`}
                className="team_modal_contact_link"
              >
                {selectedMember.email}
              </a>
              <a
                href={selectedMember.linkedin}
                target="_blank"
                rel="noreferrer"
                className="team_modal_contact_link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
