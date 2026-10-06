import React, { useEffect, useState } from "react";
import { Building2, MapPin } from "lucide-react";
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
  // Upcoming projects have no photo yet and show a "coming soon" tile
  image?: string;
}

// Source: sgmg.in/commercial-retail. Photos are cropped from that page's
// project tiles, so they're SGMG's own but low resolution; swap in the
// originals when SGMG supplies them.
const PROJECTS: CommercialProject[] = [
  { id: "cosmos-connect", name: "Cosmos Connect", location: "Siliguri", status: "ongoing", image: "/images/commercial/cosmos-connect.jpg" },
  { id: "cosmos-prashil-retail", name: "Cosmos Prashil (Retail)", location: "Devidanga", status: "ongoing", image: "/images/commercial/cosmos-prashil-retail.jpg" },
  { id: "vega-circle-mall", name: "Vega Circle Mall", location: "Check Post", status: "completed", image: "/images/commercial/vega-circle-mall.jpg" },
  { id: "cosmos-mall", name: "Cosmos Mall", location: "Sevoke Road", status: "completed", image: "/images/commercial/cosmos-mall.jpg" },
  { id: "jeevandeep-complex", name: "Jeevandeep Complex", location: "Salugara", status: "completed", image: "/images/commercial/jeevandeep-complex.jpg" },
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

const WHATSAPP_NUMBER = "919933321000";

const enquiryUrl = (project: CommercialProject) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello SGMG, I'd like to know more about ${project.name}.`
  )}`;

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

function CommercialCard({ project }: { project: CommercialProject }) {
  return (
    <div role="listitem" className="apartment_item w-dyn-item">
      {/* Same markup as the residence cards' photo area, with one photo */}
      <div className="apart_image grid_apartments">
        <div className="overlay_tags">
          <div className={`tag_available is-${project.status}`}>
            <div className="dot_available" />
            <div className="txt_available">{STATUS_LABEL[project.status]}</div>
          </div>
          <div className="tags_info">
            <div className="tag_info">
              <div className="icon_tag">
                <MapPin size="100%" strokeWidth={2} color="#292929" aria-hidden="true" />
              </div>
              <div>{project.location}</div>
            </div>
          </div>
        </div>

        <div className="carousel_parent_apartments">
          <div className="carousel_list">
            <div className="carousel_item w-dyn-item">
              <div className="carousel_apartments">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="image_carousel"
                    loading="lazy"
                  />
                ) : (
                  <div className="commercial_soon">
                    <Building2 size={32} strokeWidth={1.4} aria-hidden="true" />
                    <span>Details coming soon</span>
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
            <span className="apart_title">{project.name}</span>
          </div>
        </div>

        <div className="explore_button">
          <PillButton
            text="Enquire Now"
            href={enquiryUrl(project)}
            target="_blank"
            rel="noreferrer"
            textBoxClassName="apartments_button"
          />
        </div>
      </div>
    </div>
  );
}

export default function CommercialPage() {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "All">("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProjects =
    selectedStatus === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.status === selectedStatus);

  useEffect(() => {
    document.title = "Retail & Commercial • SGMG - Sushil Gangadhar Mittal Group";
  }, []);

  return (
    <div className="page-wrapper apartments-page-view commercial-page-view">
      <Header />

      <main className="apartments-page-main" data-section="light">
        <section data-section="light">
          <div className="wrapper_general apartments_gen">
            <div className="heading_aparts">
              <div className="heading_aparts_row">
                <h1 className="h1 black spec_amenities">
                  Retail &amp; Commercial<br />
                  in <span data-scribble="2" className="scribble-wrap scribble-visible">Siliguri</span>
                </h1>
                <button
                  type="button"
                  className="heading_filter_btn"
                  onClick={() => setMobileFiltersOpen(true)}
                  aria-label="Filter projects"
                  title="Filters"
                >
                  <div className="icon_filter">
                    <img src="/assets/icons/filter-icon.png" loading="lazy" alt="Filter icon" className="image" />
                  </div>
                  {selectedStatus !== "All" && <span className="filter_indicator_dot" />}
                </button>
              </div>
            </div>

            <div className="apartments_sides">
              {/* Filter Sidebar */}
              <div className={`filters ${mobileFiltersOpen ? "is-open" : ""}`}>
                <div className="filter_heading">
                  <div>Refine your<br />search</div>
                  <div
                    className="close_button"
                    onClick={() => setMobileFiltersOpen(false)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="/assets/icons/close-icon.svg" loading="lazy" alt="Close" className="image" />
                  </div>
                </div>

                <div className="filter_form w-form">
                  <form className="form_filters" onSubmit={(e) => e.preventDefault()}>
                    <div className="filters_flex">
                      <div className="filters_box last_filter">
                        <div className="filter_title"><div>Status</div></div>
                        <div className="filters_wrap">
                          <button
                            type="button"
                            className={`clear_btn w-inline-block ${selectedStatus === "All" ? "is-active" : ""}`}
                            onClick={() => setSelectedStatus("All")}
                          >
                            <div>All</div>
                          </button>
                          <div className="filters_type">
                            {(["ongoing", "completed", "upcoming"] as const).map((status) => (
                              <label
                                key={status}
                                className={`checkbox ${selectedStatus === status ? "is-active" : ""}`}
                                onClick={() =>
                                  setSelectedStatus(selectedStatus === status ? "All" : status)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <span className="checkbox_txt w-form-label">
                                  {STATUS_LABEL[status]}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="buttons_filters">
                      <button
                        type="button"
                        className="show_variants w-button"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        Show Projects
                      </button>
                      <button
                        type="button"
                        className="clear_button w-inline-block"
                        onClick={() => {
                          setSelectedStatus("All");
                          setMobileFiltersOpen(false);
                        }}
                      >
                        <div>Reset All</div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Projects Grid */}
              <div className="apartments_box">
                <div className="apartments_grid">
                  {filteredProjects.map((project) => (
                    <CommercialCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
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
