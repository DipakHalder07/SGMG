import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FaqLamp from "../components/FaqLamp";
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
        "q": "Can I visit the property before applying?",
        "a": "Yes. We encourage visits whenever possible. You can schedule a tour to explore the space, amenities, and overall atmosphere before making a decision."
      },
      {
        "q": "How can I contact you?",
        "a": "Call our office at (803) 937-2431 or submit a guest card online. A team member will reach out within 24 hours."
      },
      {
        "q": "Can I choose my exact unit?",
        "a": "Yes, depending on availability. During the application process, you’ll be able to select from currently available units or be guided toward the closest match."
      },
      {
        "q": "Is it quiet enough to study and focus?",
        "a": "The space is designed to support both social life and focused work. Dedicated study areas and thoughtful layout help maintain a calm environment when needed."
      }
    ]
  },
  {
    "id": "apply-leasing",
    "anchorId": "apply-leasing",
    "title": "Apply & Leasing",
    "items": [
      {
        "q": "What does by-the-bed leasing mean?",
        "a": "Each resident signs an individual lease and is only responsible for their portion of the rent."
      },
      {
        "q": "How do I apply for an apartment?",
        "a": "Click “Apply Now,” choose your lease term and floor plan, and complete the online application. If applying with roommates, make sure everyone selects the same floor plan."
      },
      {
        "q": "What do I need to apply?",
        "a": "To guarantee your bed space, you’ll need a signed lease agreement. Leases are generated once your application is complete and your screening has been approved."
      },
      {
        "q": "Do I need a guarantor?",
        "a": "Most applicants require a guarantor to meet the income requirement and ensure monthly installment payments can be made. If you do not have a guarantor, you may self-qualify using your own income or apply through a third-party guarantor service. Contact the onsite team for more information."
      },
      {
        "q": "How long does approval take?",
        "a": "Typically 24–48 hours, depending on how quickly your guarantor submits their application."
      },
      {
        "q": "Can I apply if I’m not a student?",
        "a": "Yes. All applicants who meet the qualifying criteria are welcome."
      },
      {
        "q": "Are short-term or summer leases available?",
        "a": "Availability varies. Contact the office for details on short-term leases or summer housing options."
      },
      {
        "q": "Can I sublet my apartment?",
        "a": "No. However, you may relet your apartment by finding a new resident who passes screening and signs a new lease."
      }
    ]
  },
  {
    "id": "rent-payments-fees",
    "anchorId": "pricing-payments",
    "title": "Rent, Payments & Fees",
    "items": [
      {
        "q": "How is rent paid?",
        "a": "Rent is divided into 12 equal installments and is due on the 1st of each month. Additional fees, such as pet rent or parking, are billed separately."
      },
      {
        "q": "What payment methods do you accept?",
        "a": "Bank transfer (eCheck) Debit and credit cards (fees apply; Visa, Mastercard, Discover, and American Express accepted) Recurring payments through the Resident Portal PayPal is not accepted."
      },
      {
        "q": "Can I use student loans to pay rent?",
        "a": "Student loans cannot be used for income verification but may be used to make rent payments."
      },
      {
        "q": "What happens if I don’t pay on time?",
        "a": "Late fees begin on the 4th of the month. Continued non-payment may result in eviction."
      },
      {
        "q": "Can I cancel my lease or change my rent plan?",
        "a": "Leases cannot be canceled. However, you may relet your unit. Rent plans are fixed based on your floor plan and bedroom type."
      }
    ]
  },
  {
    "id": "how-to-apply",
    "anchorId": "move-in-move-out",
    "title": "How to Apply",
    "items": [
      {
        "q": "Create Your Account",
        "a": "Select your lease term and floor plan. If you already know your roommates, everyone should choose the same floor plan. Create an account to complete your application, sign your lease online, and access the Resident Portal in the future."
      },
      {
        "q": "Choose Add-Ons",
        "a": "You can add parking, pets, or renter’s insurance to your application. Parking may be limited, so reserving early is recommended. Renter’s insurance is required, and a low-cost option is available through the community."
      },
      {
        "q": "Enter Your Personal Information",
        "a": "Provide your contact details, address, and any vehicle or pet information if applicable. Upload a copy of your ID for verification purposes."
      },
      {
        "q": "Complete the Questionnaire",
        "a": "Answer questions about your academic focus, study habits, and lifestyle preferences. This information helps with roommate matching and community event planning."
      },
      {
        "q": "Financial Information & Guarantor",
        "a": "Most residents will need a guarantor to meet income qualifications. You’ll provide their information, and they’ll complete their portion separately. If qualifying with your own income, you’ll need to upload proof of income. Student loans cannot be used for income verification."
      },
      {
        "q": "Add Emergency Contacts",
        "a": "Provide the name and contact information of an emergency contact and indicate whether they are authorized to access your apartment in an emergency. Once completed, the team will review your application and contact you with next steps."
      }
    ]
  },
  {
    "id": "living-support",
    "anchorId": "living-support",
    "title": "Living & Support",
    "items": [
      {
        "q": "What amenities are available?",
        "a": "Residents have access to a range of amenities designed for daily living, studying, and socializing. These include shared spaces, study areas, and lifestyle-focused features."
      },
      {
        "q": "How do I request maintenance?",
        "a": "Maintenance requests can be submitted through a dedicated system or support channel, with quick response times to resolve issues."
      },
      {
        "q": "Is there on-site support?",
        "a": "Yes. Our team is available to assist with day-to-day needs, ensuring a smooth and comfortable living experience."
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
                        const isOpen = openItems.has(itemKey);

                        return (
                          <div
                            key={idx}
                            className={`accordion-item ${isOpen ? "is-open" : ""}`}
                            onClick={() => toggleItem(itemKey)}
                          >
                            <div className="accordion_head-wrapper">
                              <div className="item_head">
                                <div className="title_wrapper">
                                  <div className="item_title">{item.q}</div>
                                  <div className="icon_wrapper" />
                                </div>
                              </div>
                            </div>

                            <div className="item_content-wrapper">
                              <div className="accordion_paragraph">
                                <div className="item_paragraph w-richtext">
                                  <p>{item.a}</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
