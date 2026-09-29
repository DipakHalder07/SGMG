import React, { useState, useEffect, useRef } from "react";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import "../careers.css";

export interface JobOpening {
  id: string;
  title: string;
  department: "Architecture" | "Engineering" | "Resident Experience" | "Sales & Advisory" | "Technology";
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
    title: "Senior Project Architect",
    department: "Architecture",
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
    title: "Interior Designer",
    department: "Architecture",
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
    title: "MEP & Green Building Lead",
    department: "Engineering",
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
    title: "Resident Experience Manager",
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
    title: "Sales & Advisory Specialist",
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
    title: "Full-Stack Engineer",
    department: "Technology",
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
  "Architecture",
  "Engineering",
  "Resident Experience",
  "Sales & Advisory",
  "Technology",
] as const;

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All Roles");
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
  const filteredJobs = JOB_OPENINGS.filter(
    (job) => selectedDept === "All Roles" || job.department === selectedDept
  );

  return (
    <div className="careers_page" data-section="light">
      {/* Brand Navigation Header */}
      <Header />

      {/* --- HERO --- */}
      <section className="careers_hero" data-section="light">
        <div className="careers_wrap">
          <h1 className="careers_hero_title">
            Build the <span className="accent_scribble">future of living</span> with us
          </h1>

          <p className="careers_hero_desc">
            Architects, engineers and advisors building homes across Siliguri and
            North Bengal.
          </p>

          <div className="careers_hero_actions">
            <WebflowButton
              text="See open roles"
              onClick={(e) => {
                e.preventDefault();
                scrollToJobs();
              }}
            />
          </div>
        </div>
      </section>

      {/* --- STUDIO IMAGE --- */}
      <section>
        <div className="careers_wrap">
          <figure className="careers_figure">
            <ImageWithSkeleton
              src="/images/careers/studio.jpg"
              alt="SGMG design team reviewing drawings and a tower model in the studio"
              loading="lazy"
            />
            <figcaption>The studio &mdash; Jeevandeep Tower, Siliguri</figcaption>
          </figure>
        </div>
      </section>

      {/* --- LIFE AT SGMG --- */}
      <section className="careers_section">
        <div className="careers_wrap">
          <h2 className="careers_section_title">Life at SGMG</h2>
          <p className="careers_section_subtitle">
            A small team, so the work you do is visible.
          </p>

          <div className="careers_values">
            <div>
              <h3 className="careers_value_title">Own the whole project</h3>
              <p className="careers_value_desc">
                From first drawing to handover, with the same team throughout.
              </p>
            </div>
            <div>
              <h3 className="careers_value_title">Work that lasts</h3>
              <p className="careers_value_desc">
                What you design in Siliguri will house families for decades.
              </p>
            </div>
            <div>
              <h3 className="careers_value_title">One team, one floor</h3>
              <p className="careers_value_desc">
                Everyone sits together at Jeevandeep Tower.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECT IMAGE --- */}
      <section>
        <div className="careers_wrap">
          <figure className="careers_figure">
            <ImageWithSkeleton
              src="/images/careers/project.jpg"
              alt="Front elevation of an SGMG residential development in Siliguri"
              loading="lazy"
            />
            <figcaption>What you would be building</figcaption>
          </figure>
        </div>
      </section>

      {/* --- OPEN ROLES --- */}
      <section className="careers_section" ref={jobsListRef} id="openings">
        <div className="careers_wrap">
          <h2 className="careers_section_title">Open roles</h2>
          <p className="careers_section_subtitle">
            {JOB_OPENINGS.length} positions, Siliguri unless noted.
          </p>

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
                  {dept}
                  <span className="careers_dept_count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="careers_jobs_list">
            {filteredJobs.length === 0 ? (
              <p className="careers_empty">No open roles in this team right now.</p>
            ) : (
              filteredJobs.map((job) => (
                <button
                  key={job.id}
                  type="button"
                  className="careers_job_row"
                  onClick={() => setActiveJobModal(job)}
                >
                  <span>
                    <span className="careers_job_title">{job.title}</span>
                    <span className="careers_job_meta">
                      <span>{job.department}</span>
                      <span>{job.location}</span>
                      <span>{job.experience}</span>
                      <span>{job.salaryRange}</span>
                    </span>
                  </span>
                  <span className="careers_job_arrow">View role &rarr;</span>
                </button>
              ))
            )}
          </div>
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

            <h2 className="careers_modal_title">{activeJobModal.title}</h2>

            <p className="careers_modal_meta">
              <span>{activeJobModal.department}</span>
              <span>{activeJobModal.location}</span>
              <span>{activeJobModal.type}</span>
              <span>{activeJobModal.experience}</span>
              <span>{activeJobModal.salaryRange}</span>
            </p>

            <p className="careers_modal_desc">{activeJobModal.description}</p>

            <div className="careers_modal_section_heading">Key Responsibilities</div>
            <ul className="careers_modal_list">
              {activeJobModal.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <div className="careers_modal_section_heading">Qualifications & Skills</div>
            <ul className="careers_modal_list">
              {activeJobModal.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>

            <div className="careers_modal_section_heading">What comes with the role</div>
            <ul className="careers_modal_list">
              {activeJobModal.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {/* Application Form */}
            <div className="careers_app_form">
              <div className="careers_modal_first_heading careers_modal_section_heading">
                Apply for this role
              </div>

              {formSubmitted ? (
                <div>
                  <h3 className="careers_success_title">Application received</h3>
                  <p className="careers_success_desc">
                    Thank you{applicantName ? `, ${applicantName}` : ""}. We have your
                    application for <strong>{activeJobModal.title}</strong> and will be
                    in touch by email within a few working days.
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
