import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FaqLamp from "../components/FaqLamp";
import FaqAccordionItem from "../components/FaqAccordionItem";
import "../faq.css";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  anchorId: string;
  title: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    "id": "general",
    "anchorId": "general",
    "title": "General",
    "items": [
      {
        "q": "Can I schedule a site visit to SGMG properties in Siliguri?",
        "a": "Yes. We welcome prospective homebuyers and investors for private site walkthroughs. You can schedule a visit through our website or contact our Siliguri sales desk to tour model residences, assess construction progress, and explore the neighborhood."
      },
      {
        "q": "How can I contact the SGMG sales and advisory team?",
        "a": "You can reach our corporate desk at +91 97330 02244 or email sales@sgmg.in. Our office at 2nd Floor, Jeevandeep Tower, Siliguri is open Monday through Saturday from 10:00 AM to 7:00 PM."
      },
      {
        "q": "Can I choose my preferred floor, tower, or orientation?",
        "a": "Yes, subject to availability at the time of booking. Our sales advisors will guide you through available inventory, including floor heights, corner configurations, and directional orientations."
      },
      {
        "q": "Are SGMG projects located in prime Siliguri neighborhoods?",
        "a": "All SGMG developments are strategically situated along Siliguri's high-growth corridors—such as Sevoke Road, Matigara, and Salugara—offering swift transit to premier schools, multi-specialty hospitals, retail destinations, and Bagdogra International Airport."
      }
    ]
  },
  {
    "id": "apply-leasing",
    "anchorId": "apply-leasing",
    "title": "Booking & Allotment",
    "items": [
      {
        "q": "What is the procedure for booking a residential unit?",
        "a": "To book an apartment, complete an Expression of Interest (EOI) or application form, submit the required KYC documentation (PAN card, Aadhaar, address proof), and provide the initial booking advance."
      },
      {
        "q": "Are SGMG residential developments RERA registered?",
        "a": "Yes. All SGMG residential and commercial projects strictly adhere to Real Estate Regulatory Authority (RERA) statutory guidelines, with approved municipal sanctions, environmental clearances, and legal compliances."
      },
      {
        "q": "Can Non-Resident Indians (NRIs) purchase residential property in Siliguri?",
        "a": "Yes. NRIs and Persons of Indian Origin (PIOs) can invest in residential real estate across Siliguri in full compliance with FEMA and RBI regulations. Our dedicated desk assists overseas clients with end-to-end documentation."
      },
      {
        "q": "What documents are required to initiate property purchase?",
        "a": "Primary documents include self-attested copies of PAN card, Aadhaar/Passport, recent passport-sized photographs, and bank account details for transaction verification."
      },
      {
        "q": "What is the timeline for allotment letter issuance?",
        "a": "Upon verification of documentation and receipt of the booking amount, formal allotment letters and the Agreement for Sale (AFS) are executed within 7 to 14 business days."
      },
      {
        "q": "Can a unit booking be transferred to a family member?",
        "a": "Yes, nominations and transfers to immediate family members (parents, spouse, children) are permitted subject to management approval, requisite documentation, and statutory administrative guidelines."
      },
      {
        "q": "Is joint ownership permitted for residential units?",
        "a": "Yes, co-ownership with a spouse, parent, sibling, or business partner is permitted. All co-owners must submit their respective KYC documents at the time of booking."
      },
      {
        "q": "What is the cancellation and refund policy?",
        "a": "Cancellation policies conform to RERA norms and the terms detailed in the Booking Application. In case of cancellation prior to agreement execution, the booking amount is refunded after standard administrative deductions."
      }
    ]
  },
  {
    "id": "rent-payments-fees",
    "anchorId": "pricing-payments",
    "title": "Pricing, Loans & Payments",
    "items": [
      {
        "q": "What payment schedules are available for homebuyers?",
        "a": "We offer flexible payment structures including Construction-Linked Payment Plans (CLP), down payment plans, and customized milestone-linked schedules designed to align with construction progress."
      },
      {
        "q": "Are home loans available from leading financial institutions?",
        "a": "Yes. SGMG projects are pre-approved by major nationalized and private banks including SBI, HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda, providing competitive interest rates and expedited processing."
      },
      {
        "q": "Are there additional charges beyond the base apartment price?",
        "a": "In addition to base unit value, statutory charges include applicable GST, stamp duty and registration fees, advance maintenance corpus, car parking allocation, and utility connection charges."
      },
      {
        "q": "What payment modes are accepted for installments?",
        "a": "Payments can be remitted securely via RTGS, NEFT, IMPS, authorized wire transfers (for NRI buyers), or crossed account payee cheques drawn in favor of the designated project RERA escrow account."
      },
      {
        "q": "How are construction milestones verified before payment requests?",
        "a": "Each milestone demand is accompanied by an official architect certification and structural engineer progress report verifying that the specific construction stage has been completed."
      }
    ]
  },
  {
    "id": "how-to-apply",
    "anchorId": "move-in-move-out",
    "title": "Purchasing & Possession",
    "items": [
      {
        "q": "Step 1: Choose Your Residence & Floor Plan",
        "a": "Explore our range of curated residential floor plans. Select your preferred layout, tower, and unit specifications based on your family's lifestyle preferences and spatial requirements."
      },
      {
        "q": "Step 2: Submit Booking Application & KYC",
        "a": "Fill out the formal application form, choose your preferred parking space and unit orientation, and submit verified KYC credentials along with the booking token."
      },
      {
        "q": "Step 3: Verification & Allotment",
        "a": "Our customer management desk reviews your application, executes the formal Allotment Letter, and issues your project documentation detailing installment milestones."
      },
      {
        "q": "Step 4: Agreement for Sale & Home Loan Sanction",
        "a": "Execute the RERA-compliant Agreement for Sale. Our dedicated finance desk coordinates with partner banks to secure home loan approvals and timely disbursements."
      },
      {
        "q": "Step 5: Construction Updates & Milestone Visits",
        "a": "Receive periodic photographic and technical progress reports from our engineering team. You are invited to milestone site inspections as structural stages are completed."
      },
      {
        "q": "Step 6: Handover, Registration & Key Handover",
        "a": "Upon receipt of the Completion Certificate (CC) and final clearance, property registration and stamp duty execution are concluded, followed by key handover and possession orientation."
      }
    ]
  },
  {
    "id": "living-support",
    "anchorId": "living-support",
    "title": "Amenities & Community",
    "items": [
      {
        "q": "What residential amenities are included within SGMG developments?",
        "a": "Residences feature landscaped podium courtyards, modern fitness centers, multipurpose resident lounges, children's play areas, dedicated walking tracks, and 24/7 multi-tier security with CCTV coverage."
      },
      {
        "q": "How is post-possession maintenance and facility management handled?",
        "a": "SGMG facilitates professional facility management for common areas, security, water treatment, backup power generators, and landscaping until the handover to the elected Resident Welfare Association (RWA)."
      },
      {
        "q": "Is 24/7 power backup and water supply provided?",
        "a": "Yes. All projects are equipped with 100% DG backup for essential common services and designated home points, alongside dual-source purified water supply systems and rainwater harvesting infrastructure."
      }
    ]
  }
];

export default function FaqPage() {
  // Set of opened question keys: "categoryId-itemIndex"
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const anchorsRef = useRef<HTMLDivElement>(null);

  // Toggle question open/close
  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Set document title
  useEffect(() => {
    document.title = "Frequently Asked Questions • SGMG Luxury Real Estate Siliguri";
  }, []);

  // Scrollspy to track active section
  useEffect(() => {
    const handleScroll = () => {
      for (let i = FAQ_DATA.length - 1; i >= 0; i--) {
        const cat = FAQ_DATA[i];
        const el = document.getElementById(cat.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll active mobile chip into view
  useEffect(() => {
    if (!anchorsRef.current) return;
    const activeChip = anchorsRef.current.querySelector(".chip_btn.is-active") as HTMLElement;
    if (activeChip && window.innerWidth <= 991) {
      const container = anchorsRef.current;
      const left = activeChip.offsetLeft - 16;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeCategory]);

  const handleChipClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveCategory(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isLampOn = openItems.size > 0;

  return (
    <>
      <Header />

      <main data-section="light" className="faq">
        <div className="wrapper_general base_ab">
          <div>
            <h1 className="h1 black gen_h">
              Frequently asked
              <br />
              questions
            </h1>
          </div>

          <div className="faq_sides">
            {/* Left Sticky Sidebar: Category Pills & Animated Lamp */}
            <div className="tabs_ill">
              <div className="sticky_side">
                <div ref={anchorsRef} className="anchors">
                  <div className="list_anchors">
                    {FAQ_DATA.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <a
                          key={cat.id}
                          href={`#${cat.anchorId}`}
                          onClick={(e) => handleChipClick(e, cat.id)}
                          className={`chip_btn ${isActive ? "is-active w--current" : ""}`}
                        >
                          <div>{cat.title}</div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="ill_lamp">
                  <div className="lamp_box">
                    <FaqLamp isOn={isLampOn} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Categories and Accordion Questions */}
            <div className="faq_list">
              <div className="faq_l">
                {FAQ_DATA.map((cat) => (
                  <div
                    key={cat.id}
                    id={cat.id}
                    className="item_box"
                  >
                    <div className="faq_title">
                      <div className="title_faq">
                        <div>{cat.title}</div>
                      </div>
                      <div className="count">
                        <div>{cat.items.length}</div>
                      </div>
                    </div>

                    <div className="q_list">
                      {cat.items.map((item, idx) => {
                        const itemKey = `${cat.id}-${idx}`;
                        return (
                          <FaqAccordionItem
                            key={idx}
                            question={item.q}
                            answer={item.a}
                            isOpen={openItems.has(itemKey)}
                            onToggle={() => toggleItem(itemKey)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
