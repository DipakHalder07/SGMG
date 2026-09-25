import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PillButton from "../components/PillButton";
import FaqAccordionItem from "../components/FaqAccordionItem";
import confetti from "canvas-confetti";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapPin,
  ExternalLink,
  Calendar,
  Check,
} from "lucide-react";
import "../contact.css";

// Office Location Coordinates: Siliguri, West Bengal, India
const OFFICE_COORDS = {
  lat: 26.7271,
  lng: 88.4353,
  name: "21Oaks Siliguri Office",
  address: "Hill Cart Road, Siliguri, West Bengal 734001, India",
  googleMapsUrl: "https://maps.google.com/?q=Siliguri,+West+Bengal",
};

// 7 exact FAQs directly from https://21oaks.org/contact
const CONTACT_PAGE_FAQS = [
  {
    q: "How do I apply for an apartment?",
    a: "Click “Apply Now,” choose your lease term and floor plan, and complete the online application. If applying with roommates, make sure everyone selects the same floor plan.",
  },
  {
    q: "What does by-the-bed leasing mean?",
    a: "Each resident signs an individual lease and is only responsible for their portion of the rent.",
  },
  {
    q: "What do I need to apply?",
    a: "To guarantee your bed space, you’ll need a signed lease agreement. Leases are generated once your application is complete and your screening has been approved.",
  },
  {
    q: "Do I need a guarantor?",
    a: "Most applicants require a guarantor to meet the income requirement and ensure monthly installment payments can be made. If you do not have a guarantor, you may self-qualify using your own income or apply through a third-party guarantor service. Contact the onsite team for more information.",
  },
  {
    q: "How long does approval take?",
    a: "Typically 24–48 hours, depending on how quickly your guarantor submits their application.",
  },
  {
    q: "Can I apply if I’m not a student?",
    a: "Yes. All applicants who meet the qualifying criteria are welcome.",
  },
  {
    q: "How is rent paid?",
    a: "Rent is divided into 12 equal installments and is due on the 1st of each month. Additional fees, such as pet rent or parking, are billed separately.",
  },
];

export default function ContactPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

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
    document.title = "Contact • 21 Oaks";
    document.body.classList.remove("is-hero");
    document.body.classList.add("is-light");
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove("is-light");
    };
  }, []);

  // Initialize Official Google Maps in Leaflet for Siliguri
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [OFFICE_COORDS.lat, OFFICE_COORDS.lng],
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom controls in top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Official Google Maps Roadmap Tile Layer
      const googleTileLayer = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          attribution: "© Google Maps",
        }
      ).addTo(map);

      tileLayerRef.current = googleTileLayer;

      // Custom 21Oaks Lilac Marker Pin
      const customPin = L.divIcon({
        className: "custom-pin",
        html: `<div class="custom-leaflet-marker"><svg viewBox="0 0 24 24"><path d="M12 3.2 3.5 10v10.2h6.2v-5.6h4.6v5.6h6.2V10L12 3.2zm7 15.5h-3.2v-5.6H8.2v5.6H5V10.7l7-5.6 7 5.6v8z"/></svg></div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -20],
      });

      const marker = L.marker([OFFICE_COORDS.lat, OFFICE_COORDS.lng], {
        icon: customPin,
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 230px; font-family: inherit; padding: 2px 0;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 4px; color: #ffffff;">21Oaks Siliguri Office</div>
          <div style="font-size: 13px; color: rgba(255,255,255,0.75); margin-bottom: 12px; line-height: 1.4;">Hill Cart Road, Siliguri, West Bengal 734001</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="https://calendly.com/dipakh810/30min" target="_blank" rel="noopener noreferrer" style="display: inline-block; font-size: 12px; background: #2391cf; color: #ffffff; padding: 6px 12px; border-radius: 999px; font-weight: 600; text-decoration: none;">Schedule a Tour &rarr;</a>
            <a href="${OFFICE_COORDS.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; font-size: 12px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); padding: 5px 12px; border-radius: 999px; font-weight: 500; text-decoration: none;">Directions &rarr;</a>
          </div>
        </div>
      `);

      setTimeout(() => {
        map.invalidateSize();
      }, 250);

      const handleResize = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } catch (e) {
      console.error("Google Maps initialization error:", e);
    }
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
                    onClick={() => handleCopy("+1 (803) 937-2431", "phone", "Phone number copied!")}
                    title="Copy phone number"
                    role="button"
                    tabIndex={0}
                    aria-label="Copy phone number"
                  />
                </div>
                <div>
                  <a href="tel:+18039372431" className="link_contact">
                    +1 (803) 937-2431
                  </a>
                </div>
              </div>

              {/* Write to Us */}
              <div className="contact_box">
                <div className="title_contact">
                  <div className="title_cap">Write to us</div>
                  <div
                    className={`icon_contact ${copiedKey === "email" ? "copied" : ""}`}
                    onClick={() => handleCopy("21oaks@bhom.com", "email", "E-mail copied!")}
                    title="Copy email address"
                    role="button"
                    tabIndex={0}
                    aria-label="Copy email address"
                  />
                </div>
                <div>
                  <a href="mailto:21oaks@bhom.com" className="link_contact">
                    21oaks@bhom.com
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="contact_box">
                <div className="title_contact">
                  <div className="title_cap">Office hours</div>
                </div>
                <div className="list_contact">
                  <div className="link_contact">Mon - Fri: 10am - 6pm</div>
                  <div className="link_contact">Sat: 10am - 5pm</div>
                  <div className="link_contact">Sun: 1pm - 5pm</div>
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
                    href="https://www.instagram.com/21_oaks/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_contact w-inline-block"
                  >
                    <div className="social_icon ig_white" />
                  </a>
                  <a
                    aria-label="Our Facebook"
                    href="https://www.facebook.com/live21oaks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_contact w-inline-block"
                  >
                    <div className="social_icon fb_white" />
                  </a>
                  <a
                    aria-label="Our TikTok"
                    href="https://www.tiktok.com/@21oaks5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_contact w-inline-block"
                  >
                    <div className="social_icon tiktok_white" />
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

      {/* Map Section matching 21oaks.org 1:1 with Full-Width Full-Section Google Map */}
      <section data-section="dark" className="map_sec">
        <div id="map" className="map_box">
          {/* Floating Bottom Info & Tour Booking Card */}
          <div className="map_sec_bottom_card">
            <div className="map_card_info">
              <div className="map_card_title_row">
                <MapPin size={20} className="map_pin_icon" />
                <div>
                  <div className="map_card_name">21Oaks Siliguri Office</div>
                  <div className="map_card_addr">Hill Cart Road, Siliguri, West Bengal 734001, India</div>
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

          {/* Google Map of Siliguri */}
          <div ref={mapContainerRef} className="office_leaflet_map full_width" />
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
                  <div>Everything you might want to know before moving in.</div>
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
