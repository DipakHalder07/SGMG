import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PillButton from "../components/PillButton";
import FaqAccordionItem from "../components/FaqAccordionItem";
import confetti from "canvas-confetti";
import {
  MapPin,
  ExternalLink,
  Calendar,
  Check,
} from "lucide-react";
import "../contact.css";

// Office Location: Jeevan Deep Complex, Siliguri, West Bengal
const OFFICE_COORDS = {
  lat: 26.764918,
  lng: 88.44281,
  name: "SGMG Corporate Office",
  address: "2nd Floor, Jeevandeep Tower, Jeevan Deep Complex, Siliguri, West Bengal 734001, India",
  googleMapsUrl:
    "https://www.google.com/maps/place/Jeevan+Deep+Complex/@26.764918,88.44281,17z",
};

// Official SGMG FAQs
const CONTACT_PAGE_FAQS = [
  {
    q: "How do I schedule a site visit or book a residence?",
    a: "You can schedule a private site visit through our online tour scheduler or connect directly with our sales advisors. Our team will guide you through master plans, model residences, and complete booking formalities.",
  },
  {
    q: "Are SGMG residential projects RERA approved and compliant?",
    a: "Yes, all SGMG developments are fully compliant with West Bengal HIRA / RERA guidelines, with transparent approvals, clear land titles, and verified legal clearances.",
  },
  {
    q: "What financing and home loan assistance is available?",
    a: "SGMG is partnered with leading public and private banks (including SBI, HDFC, ICICI, and Axis Bank) to facilitate competitive interest rates, pre-approved loans, and seamless loan documentation.",
  },
  {
    q: "What is the construction quality and warranty provided by SGMG?",
    a: "With a 40-year legacy of engineering excellence in Siliguri, SGMG utilizes Grade-A structural materials, earthquake-resistant RCC framing, premium waterproofing, and dedicated post-possession maintenance.",
  },
  {
    q: "What are the possession timelines and payment structures?",
    a: "We offer flexible, milestone-linked construction payment plans with strict adherence to scheduled delivery dates. Possession dates are explicitly guaranteed in your agreement.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) purchase properties with SGMG?",
    a: "Yes. We offer end-to-end dedicated NRI concierge assistance, including virtual 3D walkthroughs, digital documentation, NRE/NRO banking facilitation, and property management.",
  },
  {
    q: "What amenities and community features are included?",
    a: "Every project features world-class residential amenities: multi-tier 24/7 security, landscaped central courtyards, swimming pools, high-speed elevators, wellness gymnasiums, and uninterrupted power backup.",
  },
];

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Setup theme mode & page title
  useEffect(() => {
    document.title = "Contact Us • SGMG | Sushil Gangadhar Mittal Group Siliguri";
    document.body.classList.remove("is-hero");
    document.body.classList.add("is-light");
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove("is-light");
    };
  }, []);

  // Copy to clipboard handler
  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(label);

    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#2391cf", "#292929", "#ffffff"],
        });
      } catch (_) {
        // ignore
      }
    }, 800);
  };

  return (
    <div className="contact_page_wrapper">
      <Header />

      {/* Main 21Oaks Contact Section (1:1 Live DOM) */}
      <main data-section="light" className="contact">
        <div className="wrapper_general gen_f">
          <div className="contact_h1">
            <h1 className="h1 black">Contact</h1>
          </div>

          <div className="flex_contact">
            {/* Left Contact Boxes */}
            <div className="left_contact">
              {/* Call Us */}
              <div className="contact_box">
                <div className="title_contact">
                  <div className="title_cap">Call us</div>
                  <div
                    className={`icon_contact ${copiedKey === "phone" ? "copied" : ""}`}
                    onClick={() => handleCopy("+91 97330 02244", "phone", "Phone number copied!")}
                    title="Copy phone number"
                    role="button"
                    tabIndex={0}
                    aria-label="Copy phone number"
                  />
                </div>
                <div>
                  <a href="tel:+919733002244" className="link_contact">
                    +91 97330 02244
                  </a>
                </div>
              </div>

              {/* Write to Us */}
              <div className="contact_box">
                <div className="title_contact">
                  <div className="title_cap">Write to us</div>
                  <div
                    className={`icon_contact ${copiedKey === "email" ? "copied" : ""}`}
                    onClick={() => handleCopy("sales@sgmg.in", "email", "E-mail copied!")}
                    title="Copy email address"
                    role="button"
                    tabIndex={0}
                    aria-label="Copy email address"
                  />
                </div>
                <div>
                  <a href="mailto:sales@sgmg.in" className="link_contact">
                    sales@sgmg.in
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="contact_box">
                <div className="title_contact">
                  <div className="title_cap">Office hours</div>
                </div>
                <div className="list_contact">
                  <div className="link_contact">Mon - Sat: 10:00 AM - 7:00 PM</div>
                  <div className="link_contact">Sunday: 10:00 AM - 5:00 PM</div>
                  <div className="link_contact">Site Visits: Available 7 Days</div>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact_box">
                <div className="title_contact">
                  <div className="title_cap">Social media</div>
                </div>
                <div className="list_contact socials_icons">
                  <a
                    aria-label="Our Instagram"
                    href="https://www.instagram.com/sgmgrealestate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_contact w-inline-block"
                  >
                    <div className="social_icon ig_white" />
                  </a>
                  <a
                    aria-label="Our Facebook"
                    href="https://www.facebook.com/SGMGRealEstate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_contact w-inline-block"
                  >
                    <div className="social_icon fb_white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="right_form">
              <div className="form_box w-form">
                {isSubmitted ? (
                  <div className="success_message w-form-done">
                    <div className="form_title">
                      <div>You’re in. Message sent.</div>
                    </div>
                    <div className="success_txt">
                      <div>
                        We’ve got your message and we’re already on it. Give us a moment, we’ll get back to you soon. In
                        the meantime, feel free to explore or just relax. You did your part.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form
                    id="wf-form-Contact-Form"
                    name="wf-form-Contact-Form"
                    onSubmit={handleSubmit}
                    className="form_inner"
                  >
                    <div className="form_title">
                      <div>Tell us what you’re looking for and we’ll help you find the right fit, fast.</div>
                    </div>

                    <div className="form_grid">
                      <div className="field_box">
                        <label htmlFor="first-name" className="title">
                          First name*
                        </label>
                        <input
                          className="input_field w-input"
                          maxLength={256}
                          name="name"
                          placeholder="Enter first name"
                          type="text"
                          id="first-name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>

                      <div className="field_box">
                        <label htmlFor="last-name" className="title">
                          Last name*
                        </label>
                        <input
                          className="input_field w-input"
                          maxLength={256}
                          name="Last-Name"
                          placeholder="Enter last name"
                          type="text"
                          id="last-name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>

                      <div className="field_box">
                        <label htmlFor="email" className="title">
                          E-mail address*
                        </label>
                        <input
                          className="input_field w-input"
                          maxLength={256}
                          name="E-mail-address"
                          placeholder="Enter e-mail address"
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="field_box">
                        <label htmlFor="phone" className="title">
                          Phone number (optional)
                        </label>
                        <input
                          className="input_field w-input"
                          maxLength={256}
                          name="Phone-number"
                          placeholder="(545) 123-4567"
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="field_box full_width">
                        <label htmlFor="subject" className="title">
                          Subject*
                        </label>
                        <input
                          className="input_field w-input"
                          maxLength={256}
                          name="Subject"
                          placeholder="Enter a subject"
                          type="text"
                          id="subject"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                      <div className="field_box full_width">
                        <label htmlFor="message" className="title">
                          Message (optional)
                        </label>
                        <textarea
                          placeholder="Enter message"
                          maxLength={5000}
                          id="message"
                          name="Message"
                          className="input_field areabox_sp w-input"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                      <div className="last_form full_width">
                        <div className="captcha_caption">
                          <div>
                            This site is protected by reCAPTCHA. The Google Privacy Policy and Terms of Service related
                            to reCAPTCHA apply.
                          </div>
                        </div>
                        <input
                          type="submit"
                          className="submit_button w-button"
                          value={isSubmitting ? "Please wait..." : "Submit"}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Hand-drawn Pathway Illustration */}
          <div className="contact_gap">
            <div className="contact_ill">
              <img
                src="/assets/svg/ill_contact.svg"
                loading="lazy"
                alt="Apartment with pathway, svg, black"
                className="image"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Map Section with Official Google Maps Embed for SGMG Office */}
      <section data-section="dark" className="map_sec">
        <div id="map" className="map_box">
          {/* Floating Bottom Info & Tour Booking Card */}
          <div className="map_sec_bottom_card">
            <div className="map_card_info">
              <div className="map_card_title_row">
                <MapPin size={20} className="map_pin_icon" />
                <div>
                  <div className="map_card_name">SGMG Corporate Office</div>
                  <div className="map_card_addr">2nd Floor, Jeevandeep Tower, Jeevan Deep Complex, Siliguri, West Bengal 734001</div>
                </div>
              </div>
            </div>
            <div className="map_card_buttons">
              <a
                href="https://calendly.com/dipakh810/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="map_card_btn_tour"
              >
                <Calendar size={16} />
                <span>Schedule a Tour</span>
              </a>
              <a
                href={OFFICE_COORDS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map_card_btn_dir"
              >
                <ExternalLink size={16} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Official Google Maps Embed for Jeevan Deep Complex */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.3560523453234!2d88.44281034500854!3d26.76491809204512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441398913b655%3A0x700a582fbb4ee411!2sJeevan%20Deep%20Complex!5e0!3m2!1sen!2sin!4v1790425056054!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, width: "100%", height: "100%", minHeight: "100%", display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="SGMG Corporate Office - Jeevan Deep Complex Siliguri"
          />
        </div>
      </section>

      {/* Frequently Asked Questions Section (Exact 1:1 Live Webflow) */}
      <section data-section="dark">
        <section className="faqs black">
          <div className="wrapper_general basic">
            <div className="faq_heading white_ver">
              <h2 className="h2 smaller">Frequently asked questions</h2>
            </div>

            <div className="sides_faq">
              <div className="short_left">
                <div className="caption_faq white_ver">
                  <div>Everything you might want to know before purchasing your home.</div>
                </div>
                <div className="bottom_faq">
                  <div className="p_gen caption_cta white_ver">
                    Didn’t find what you were
                    <br />
                    looking for?
                  </div>
                  <div>
                    <PillButton to="/faq" text="Explore FAQ" variant="default" />
                  </div>
                </div>
              </div>

              <div className="faq_general">
                <div className="collection_faq white_ver">
                  {CONTACT_PAGE_FAQS.map((faq, index) => (
                    <FaqAccordionItem
                      key={index}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openFaqIndex === index}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="white_ver"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="copy_toast" role="status" aria-live="polite">
          <Check size={18} color="#34c759" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
