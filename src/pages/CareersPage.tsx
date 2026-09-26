import React, { useState, useEffect, useRef } from "react";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import "../careers.css";

export interface JobOpening {
  id: string;
  title: string;
  department: "Architecture & Design" | "Engineering & Green Tech" | "Resident Experience" | "Sales & Advisory" | "Operations & Tech";
  location: "Siliguri HQ" | "North Bengal" | "Kolkata" | "Remote";
  type: "Full-time" | "Hybrid" | "Onsite";
  experience: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: "lead-project-architect",
    title: "Senior Project Architect (Residential Developments)",
    department: "Architecture & Design",
    location: "Siliguri HQ",
    type: "Onsite",
    experience: "5 - 8 Years",
    salaryRange: "₹18 - ₹25 LPA",
    description: "Lead architectural conceptualization, schematic design, and execution of multi-storey luxury residential towers with biophilic and acoustic excellence in Siliguri.",
    responsibilities: [
      "Drive architectural master planning and spacious floor plan layouts for luxury residential developments.",
      "Coordinate with structural, MEP, and green-building consultants to achieve IGBC Gold/Platinum ratings.",
      "Supervise on-site design fidelity, structural detailing, and premium material finishes across Siliguri sites.",
      "Mentor junior architects and represent SGMG at architectural forums and municipal presentations.",
    ],
    requirements: [
      "B.Arch or M.Arch from a recognized institute (CEPT, SPA, or equivalent preferred).",
      "Proficiency in Revit, AutoCAD, Rhino, Lumion, and BIM workflows.",
      "Proven track record delivering large-scale residential or luxury hospitality projects.",
      "Deep understanding of local building bylaws, fire safety codes, and sustainability compliances.",
    ],
    benefits: [
      "Competitive executive salary with performance bonuses.",
      "Comprehensive health insurance for employee and immediate family.",
      "Annual architecture research and design symposium travel stipend.",
      "Collaborative, modern design studio at Jeevandeep Tower, Siliguri.",
    ],
  },
  {
    id: "biophilic-interior-designer",
    title: "Biophilic Residential Interior Designer",
    department: "Architecture & Design",
    location: "Siliguri HQ",
    type: "Hybrid",
    experience: "3 - 6 Years",
    salaryRange: "₹12 - ₹18 LPA",
    description: "Shape the tactile, aesthetic, and ergonomic environment of luxury apartment suites, clubhouse lounges, and residential wellness spaces.",
    responsibilities: [
      "Design restorative interior spaces integrating natural daylight, indoor greenery, and acoustic isolation.",
      "Select sustainable, low-VOC materials, bespoke woodwork, and energy-efficient ambient lighting.",
      "Develop photorealistic 3D renders, material mood boards, and detailed FF&E schedules.",
      "Collaborate with procurement teams to source premium materials and artisanal Indian craftsmanship.",
    ],
    requirements: [
      "Degree in Interior Design, Environmental Design, or Architecture.",
      "Portfolio demonstrating contemporary residential or luxury boutique hospitality work.",
      "Fluency in 3ds Max, SketchUp, Enscape/V-Ray, and Adobe Creative Suite.",
      "Passionate interest in biophilic residential architecture and ergonomic living environments.",
    ],
    benefits: [
      "Generous health & dental insurance coverage.",
      "Flexible hybrid working schedule.",
      "Ergonomic workstation setup allowance.",
      "Continuous design mentorship under Chief Architect Priya Sharma.",
    ],
  },
  {
    id: "green-building-mep-lead",
    title: "Green Building & Sustainable MEP Lead",
    department: "Engineering & Green Tech",
    location: "Siliguri HQ",
    type: "Onsite",
    experience: "6 - 10 Years",
    salaryRange: "₹16 - ₹22 LPA",
    description: "Direct sustainable engineering systems including rooftop solar arrays, zero-waste rainwater harvesting, and intelligent energy management across Siliguri projects.",
    responsibilities: [
      "Design and monitor energy-efficient HVAC, plumbing, electrical, and fire safety systems.",
      "Spearhead IGBC Green Building certification audits and structural safety inspections.",
      "Implement smart energy metering and water recycling infrastructure across residential developments.",
      "Manage contractor performance and ensure stringent safety protocols across all engineering works.",
    ],
    requirements: [
      "B.Tech/M.Tech in Mechanical, Electrical, or Environmental Engineering.",
      "Certified IGBC AP or LEED AP credentials required.",
      "Hands-on experience with solar microgrids, STP plants, and Building Management Systems (BMS).",
      "Strong analytical mind with fluency in energy modeling and structural analysis tools.",
    ],
    benefits: [
      "Comprehensive medical cover for family including parents.",
      "Annual engineering innovation bonus tied to group sustainability metrics.",
      "Company transit assistance and executive wellness facilities.",
      "Direct collaboration with VP of Sustainable Infrastructure Dr. Rajesh Verma.",
    ],
  },
  {
    id: "community-experience-manager",
    title: "Clubhouse & Resident Experience Manager",
    department: "Resident Experience",
    location: "Siliguri HQ",
    type: "Onsite",
    experience: "3 - 5 Years",
    salaryRange: "₹9 - ₹14 LPA",
    description: "Foster an active, welcoming community atmosphere across SGMG gated residences through curated lifestyle events, sports tournaments, and clubhouse amenities.",
    responsibilities: [
      "Plan and execute annual community celebrations: cultural festivals, sports tournaments, and wellness retreats.",
      "Act as the primary relationship contact for homeowners, resident committees, and lifestyle club members.",
      "Oversee clubhouse fitness facilities, banquet lounges, and children's recreational zones.",
      "Analyze monthly homeowner feedback to continuously elevate facility management standards.",
    ],
    requirements: [
      "Bachelor's or Master's degree in Hospitality, Communications, or Event Management.",
      "Charismatic, empathetic personality with high emotional intelligence and customer service flair.",
      "Experience in luxury residential communities, club management, or hospitality.",
      "Comfortable coordinating resident communications and digital community newsletters.",
    ],
    benefits: [
      "Subsidized executive residential accommodation option.",
      "Clubhouse wellness & fitness membership fully sponsored.",
      "Customer relationship excellence and hospitality leadership training.",
      "Vibrant daily environment working with distinguished homeowner families.",
    ],
  },
  {
    id: "luxury-leasing-specialist",
    title: "Luxury Residential Sales & Advisory Specialist",
    department: "Sales & Advisory",
    location: "Siliguri HQ",
    type: "Onsite",
    experience: "2 - 5 Years",
    salaryRange: "₹8 - ₹14 LPA + Attractive Incentives",
    description: "Engage prospective homebuyers and investors through personalized property tours, floor plan consultations, and transparent sales assistance.",
    responsibilities: [
      "Conduct in-person site walkthroughs of luxury sample apartments and project amenities in Siliguri.",
      "Guide homebuyers through unit configurations, pricing structures, bank loan tie-ups, and allotment paperwork.",
      "Coordinate with digital marketing teams to manage high-intent buyer inquiries and private viewings.",
      "Maintain strong client relationships while upholding SGMG's 40-year legacy of trust and transparency.",
    ],
    requirements: [
      "Proven sales or advisory background in luxury residential real estate or high-end hospitality.",
      "Exceptional verbal and written communication skills in English, Hindi, and Bengali.",
      "Customer-centric mindset with strong consultative sales and negotiation capabilities.",
      "Familiarity with CRM platforms (Salesforce, LeadSquared) and real estate documentation.",
    ],
    benefits: [
      "Industry-leading quarterly sales commissions and performance incentives.",
      "Fast-track career advancement to Sales Director / Regional Head.",
      "Comprehensive medical and term life insurance coverage.",
      "Professional luxury real estate advisory masterclasses.",
    ],
  },
  {
    id: "resident-portal-engineer",
    title: "Full-Stack Homeowner Platform Engineer",
    department: "Operations & Tech",
    location: "Remote",
    type: "Hybrid",
    experience: "3 - 6 Years",
    salaryRange: "₹15 - ₹24 LPA + ESOPs",
    description: "Build and scale our modern homeowner mobile and web applications powering smart access, maintenance requests, payment tracking, and community updates.",
    responsibilities: [
      "Develop responsive React/React Native frontend interfaces and resilient Node.js microservices.",
      "Integrate smart access systems, automated payment gateways (UPI, NetBanking), and concierge ticketing.",
      "Ensure bank-grade data security, low-latency API performance, and clean UI/UX flows.",
      "Partner directly with CEO Aryan Mittal and operations leaders to deploy features homeowners love.",
    ],
    requirements: [
      "Strong proficiency in TypeScript, React, Node.js, PostgreSQL/MongoDB, and cloud infrastructure.",
      "Experience building production-grade mobile applications or customer portal web platforms.",
      "Familiarity with payment gateways and modern responsive design best practices.",
      "Passionate about clean code, unit testing, and intuitive user experiences.",
    ],
    benefits: [
      "Generous group ESOP equity plan.",
      "Top-tier MacBook Pro and home work setup allowance.",
      "Flexible hybrid work environment.",
      "Comprehensive family health insurance including mental wellness benefits.",
    ],
  },
];

const DEPARTMENTS = [
  "All Roles",
  "Architecture & Design",
  "Engineering & Green Tech",
  "Resident Experience",
  "Sales & Advisory",
  "Operations & Tech",
] as const;

const LOCATIONS = [
  "All Locations",
  "Siliguri HQ",
  "North Bengal",
  "Kolkata",
  "Remote",
] as const;

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All Roles");
  const [selectedLoc, setSelectedLoc] = useState<string>("All Locations");
  const [activeJobModal, setActiveJobModal] = useState<JobOpening | null>(null);

  // Application Form State
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantLinkedIn, setApplicantLinkedIn] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantNote, setApplicantNote] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Careers & Open Positions | SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  // Keyboard accessibility (ESC closes modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeModal = () => {
    setActiveJobModal(null);
    setFormSubmitted(false);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantPhone("");
    setApplicantLinkedIn("");
    setApplicantPortfolio("");
    setApplicantNote("");
  };

  const scrollToJobs = () => {
    jobsListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 850);
  };

  // Filter jobs
  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchDept = selectedDept === "All Roles" || job.department === selectedDept;
    const matchLoc = selectedLoc === "All Locations" || job.location === selectedLoc;
    return matchDept && matchLoc;
  });

  return (
    <div className="careers_page">
      {/* Brand Navigation Header */}
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="careers_hero">
        <div className="careers_hero_container">
          <h1 className="careers_hero_title">
            Build the <span className="accent_scribble">future of living</span> with us
          </h1>

          <p className="careers_hero_desc">
            We are architects, client advisors, green engineers, and technologists united by a shared mission:
            crafting elevated, tranquil residential living in Siliguri and North Bengal. Join our family.
          </p>

          <div className="careers_hero_actions">
            <WebflowButton
              text="Explore Open Positions"
              onClick={(e) => {
                e.preventDefault();
                scrollToJobs();
              }}
            />
            <WebflowButton
              text="Meet Our Leadership Team"
              href="/team"
            />
          </div>

          {/* Stats Bar */}
          <div className="careers_stats_grid">
            <div className="careers_stat_item">
              <span className="careers_stat_num">4.8 ★</span>
              <span className="careers_stat_label">Team Satisfaction & Culture Rating</span>
            </div>
            <div className="careers_stat_item">
              <span className="careers_stat_num">6+</span>
              <span className="careers_stat_label">Current Open Strategic Roles</span>
            </div>
            <div className="careers_stat_item">
              <span className="careers_stat_num">HQ</span>
              <span className="careers_stat_label">Corporate Studio • Jeevandeep Tower, Siliguri</span>
            </div>
            <div className="careers_stat_item">
              <span className="careers_stat_num">98%</span>
              <span className="careers_stat_label">Annual Employee Retention & Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CULTURE & STUDIO SHOWCASE --- */}
      <section className="careers_culture_section">
        <div className="careers_culture_card">
          <div className="careers_culture_media">
            <img
              src="/images/careers-studio.jpg"
              alt="SGMG Corporate Studio in Siliguri"
              className="careers_culture_img"
            />
            <div className="careers_culture_badge">SGMG Studio • Siliguri HQ</div>
          </div>

          <div className="careers_culture_content">
            <span className="careers_culture_tag">Life at SGMG</span>
            <h2 className="careers_culture_title">Where craftsmanship meets architectural distinction</h2>
            <p className="careers_culture_desc">
              At SGMG, you will never be just a number. You will have a direct hand in shaping
              physical living sanctuaries that house generations of families across Siliguri and North Bengal.
            </p>

            <div className="careers_culture_bullets">
              <div className="careers_bullet_item">
                <span className="careers_bullet_icon">✓</span>
                <span><strong>Radical Ownership:</strong> Lead projects from blueprint concept to homeowner key handover with autonomy.</span>
              </div>
              <div className="careers_bullet_item">
                <span className="careers_bullet_icon">✓</span>
                <span><strong>Purpose-Driven Impact:</strong> Create green, biophilic environments that foster tranquil family living and enduring value.</span>
              </div>
              <div className="careers_bullet_item">
                <span className="careers_bullet_icon">✓</span>
                <span><strong>Cross-Disciplinary Excellence:</strong> Architects, structural engineers, and relationship advisors shaping communities together.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PERKS & BENEFITS --- */}
      <section className="careers_perks_section">
        <div className="careers_perks_container">
          <div className="careers_section_header">
            <span className="careers_section_badge">Why You'll Love It Here</span>
            <h2 className="careers_section_title">Thoughtfully designed for your thriving life</h2>
            <p className="careers_section_subtitle">
              We look after our people with the same attention, care, and quality that we pour into our residential properties.
            </p>
          </div>

          <div className="careers_perks_grid">
            <div className="careers_perk_card">
              <div className="careers_perk_icon_wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="careers_perk_title">Competitive Pay & ESOPs</h3>
              <p className="careers_perk_desc">
                Top-of-market compensation packages, milestone performance incentives, and long-term equity participation in our growth.
              </p>
            </div>

            <div className="careers_perk_card">
              <div className="careers_perk_icon_wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="careers_perk_title">Complete Family Healthcare</h3>
              <p className="careers_perk_desc">
                Comprehensive health, accidental, and term life insurance covering you, your spouse, children, and dependent parents.
              </p>
            </div>

            <div className="careers_perk_card">
              <div className="careers_perk_icon_wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <h3 className="careers_perk_title">Learning & Research Grants</h3>
              <p className="careers_perk_desc">
                Annual budget for international architectural tours, sustainability certifications (LEED/IGBC), and university courses.
              </p>
            </div>

            <div className="careers_perk_card">
              <div className="careers_perk_icon_wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 14 14" />
                </svg>
              </div>
              <h3 className="careers_perk_title">Work-Life Harmony</h3>
              <p className="careers_perk_desc">
                Hybrid flexibility, generous paid time off, mental health recharge days, and paid parental leave for new parents.
              </p>
            </div>

            <div className="careers_perk_card">
              <div className="careers_perk_icon_wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="careers_perk_title">Sunlit Modern Studios</h3>
              <p className="careers_perk_desc">
                State-of-the-art biophilic workspaces with ergonomic workstations, modern meeting suites, and creative design spaces in Siliguri.
              </p>
            </div>

            <div className="careers_perk_card">
              <div className="careers_perk_icon_wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="careers_perk_title">Wellness & Gym Access</h3>
              <p className="careers_perk_desc">
                Unlimited access to our onsite fitness studios, heated swimming pools, weekly yoga sessions, and nutritious daily snacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- JOB OPENINGS SECTION --- */}
      <section className="careers_jobs_section" ref={jobsListRef} id="openings">
        <div className="careers_section_header">
          <span className="careers_section_badge">Join Our Team</span>
          <h2 className="careers_section_title">Current Strategic Openings</h2>
          <p className="careers_section_subtitle">
            Find the role where your skills, passion, and aspirations can make a profound difference.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="careers_filters_wrap">
          {/* Department Tabs */}
          <div className="careers_dept_tabs" role="tablist">
            {DEPARTMENTS.map((dept) => {
              const count =
                dept === "All Roles"
                  ? JOB_OPENINGS.length
                  : JOB_OPENINGS.filter((j) => j.department === dept).length;
              const isActive = selectedDept === dept;

              return (
                <button
                  key={dept}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`careers_dept_tab ${isActive ? "is-active" : ""}`}
                  onClick={() => setSelectedDept(dept)}
                >
                  <span>{dept}</span>
                  <span className="careers_dept_count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Location Filters */}
          <div className="careers_location_filter_row">
            <div className="careers_location_pills">
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666" }}>Filter by City:</span>
              {LOCATIONS.map((loc) => {
                const isActive = selectedLoc === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    className={`careers_loc_btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setSelectedLoc(loc)}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            <div className="careers_jobs_count_label">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? "Opening" : "Openings"}
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="careers_jobs_grid">
          {filteredJobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#ffffff", borderRadius: "18px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", color: "#292929", marginBottom: "0.5rem" }}>
                No active openings in this filter
              </h3>
              <p style={{ color: "#666666", marginBottom: "1.5rem" }}>
                Try selecting "All Roles" or "All Locations", or submit a spontaneous application below.
              </p>
              <button
                type="button"
                className="careers_apply_btn"
                onClick={() => {
                  setSelectedDept("All Roles");
                  setSelectedLoc("All Locations");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <article
                key={job.id}
                className="careers_job_card"
                onClick={() => setActiveJobModal(job)}
              >
                <div className="careers_job_info">
                  <div className="careers_job_badges">
                    <span className="careers_job_badge dept">{job.department}</span>
                    <span className="careers_job_badge loc">{job.location}</span>
                    <span className="careers_job_badge type">{job.type}</span>
                  </div>

                  <h3 className="careers_job_title">{job.title}</h3>
                  <p className="careers_job_desc">{job.description}</p>

                  <div className="careers_job_meta_row">
                    <div className="careers_job_meta_item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <span>Experience: {job.experience}</span>
                    </div>

                    <div className="careers_job_meta_item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <span>Compensation: {job.salaryRange}</span>
                    </div>
                  </div>
                </div>

                <div className="careers_job_actions">
                  <button
                    type="button"
                    className="careers_view_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveJobModal(job);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="careers_apply_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveJobModal(job);
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* --- SPONTANEOUS TALENT POOL BANNER --- */}
      <section className="careers_talent_section">
        <div className="careers_talent_banner">
          <div>
            <h2 className="careers_talent_title">
              Don’t see your exact role? Join our Talent Network
            </h2>
            <p className="careers_talent_desc">
              We are constantly growing and hiring exceptional people who share our passion. Send us your CV
              and a short note about your superpowers, and our talent team will reach out when the right match arises.
            </p>
          </div>

          <WebflowButton
            text="Send General Application"
            href="mailto:careers@sgmg.in?subject=Spontaneous%20Application%20-%20SGMG%20Residences"
          />
        </div>
      </section>

      {/* --- INTERACTIVE JOB DETAIL & APPLICATION MODAL --- */}
      {activeJobModal && (
        <div
          className="careers_modal_backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="careers_modal_content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="careers_modal_close_btn"
              onClick={closeModal}
              aria-label="Close job details"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="careers_modal_badges">
              <span className="careers_job_badge dept">{activeJobModal.department}</span>
              <span className="careers_job_badge loc">{activeJobModal.location}</span>
              <span className="careers_job_badge type">{activeJobModal.type}</span>
            </div>

            <h2 className="careers_modal_title">{activeJobModal.title}</h2>

            <div className="careers_modal_meta_grid">
              <div className="careers_modal_meta_box">
                <span className="careers_modal_meta_title">Location</span>
                <span className="careers_modal_meta_val">{activeJobModal.location}</span>
              </div>
              <div className="careers_modal_meta_box">
                <span className="careers_modal_meta_title">Experience Required</span>
                <span className="careers_modal_meta_val">{activeJobModal.experience}</span>
              </div>
              <div className="careers_modal_meta_box">
                <span className="careers_modal_meta_title">Compensation Tier</span>
                <span className="careers_modal_meta_val">{activeJobModal.salaryRange}</span>
              </div>
            </div>

            <p style={{ fontSize: "1.05rem", lineHeight: "1.7", color: "#555" }}>
              {activeJobModal.description}
            </p>

            <div className="careers_modal_section_heading">Key Responsibilities</div>
            <div className="careers_modal_list">
              {activeJobModal.responsibilities.map((r, i) => (
                <div key={i} className="careers_modal_list_item">
                  <span className="careers_modal_list_dot" />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="careers_modal_section_heading">Qualifications & Skills</div>
            <div className="careers_modal_list">
              {activeJobModal.requirements.map((req, i) => (
                <div key={i} className="careers_modal_list_item">
                  <span className="careers_modal_list_dot" />
                  <span>{req}</span>
                </div>
              ))}
            </div>

            <div className="careers_modal_section_heading">Perks for this Role</div>
            <div className="careers_modal_list">
              {activeJobModal.benefits.map((b, i) => (
                <div key={i} className="careers_modal_list_item">
                  <span className="careers_modal_list_dot" style={{ backgroundColor: "#a2cd3a" }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="careers_app_form">
              <div className="careers_modal_section_heading" style={{ marginTop: 0 }}>
                Apply for this Position
              </div>

              {formSubmitted ? (
                <div className="careers_success_box">
                  <div className="careers_success_icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="careers_success_title">Application Received!</h3>
                  <p className="careers_success_desc">
                    Thank you, {applicantName || "Candidate"}! Our People & Talent team has received your application
                    for <strong>{activeJobModal.title}</strong>. We review every profile carefully and will be in touch
                    via email within 48 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit}>
                  <div className="careers_form_grid">
                    <div className="careers_form_group">
                      <label className="careers_label">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="careers_input"
                        placeholder="e.g. Aryan Mehra"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                      />
                    </div>

                    <div className="careers_form_group">
                      <label className="careers_label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="careers_input"
                        placeholder="e.g. aryan@example.com"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                      />
                    </div>

                    <div className="careers_form_group">
                      <label className="careers_label">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="careers_input"
                        placeholder="e.g. +91 98765 43210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                      />
                    </div>

                    <div className="careers_form_group">
                      <label className="careers_label">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        className="careers_input"
                        placeholder="https://linkedin.com/in/username"
                        value={applicantLinkedIn}
                        onChange={(e) => setApplicantLinkedIn(e.target.value)}
                      />
                    </div>

                    <div className="careers_form_group full_width">
                      <label className="careers_label">Portfolio / Resume Drive Link *</label>
                      <input
                        type="url"
                        required
                        className="careers_input"
                        placeholder="https://drive.google.com/... or portfolio URL"
                        value={applicantPortfolio}
                        onChange={(e) => setApplicantPortfolio(e.target.value)}
                      />
                    </div>

                    <div className="careers_form_group full_width">
                      <label className="careers_label">Brief Cover Note / Why SGMG?</label>
                      <textarea
                        className="careers_textarea"
                        placeholder="Tell us about yourself and what excites you about this role..."
                        value={applicantNote}
                        onChange={(e) => setApplicantNote(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="careers_submit_btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
