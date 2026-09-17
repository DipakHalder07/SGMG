import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const assets = {
  hero: "/__l5e/assets-v1/7c7891ba-66b4-45ea-8321-415616b6042a/00-hero-1.avif",
  lounge: "/__l5e/assets-v1/4007da14-b7d3-4254-b5b3-ab2e92bc51e8/01-image-2.avif",
  cinema: "/__l5e/assets-v1/8b316e41-ba0b-485b-ade0-169d61814f5e/02-image-3.avif",
  entry: "/__l5e/assets-v1/26dff71b-e437-435a-a1c1-7f0cbdd53355/03-2.avif",
  aerial: "/__l5e/assets-v1/5d59d808-a506-4c4b-8c74-2801a86cd4ae/04-1.avif",
  pool: "/__l5e/assets-v1/32a60dd3-daf3-46b1-a4fa-322ff798b673/06-4.avif",
  bed: "/__l5e/assets-v1/1f3f8102-62fb-4c8b-a481-de996943190b/08-6.avif",
  smallBed: "/__l5e/assets-v1/fdca1142-750b-49c2-8bdc-c3cd82c28270/09-small-image-left.avif",
  bigBed: "/__l5e/assets-v1/8817c3b0-0e08-4885-a31a-e9e420d0c11a/10-side-right.avif",
  community: "/__l5e/assets-v1/e386325a-f447-45ef-af20-6335dcbefe69/11-side-left.avif",
  smallPool: "/__l5e/assets-v1/19a43f63-86e1-4159-b244-e78a4f0f6ce5/12-small-image-right.avif",
  map: "/__l5e/assets-v1/0965a376-88b5-41d6-800b-c528286cc0ab/19-fs-image.avif",
};

const gallery = [assets.hero, assets.lounge, assets.cinema, assets.entry, assets.aerial, assets.pool];
const plans = [
  ["D1", "$695.00", "/__l5e/assets-v1/99fd06dd-6afa-4b67-abf8-39ede97c7f0c/13-D1-Gen.avif"],
  ["D1 Premium", "$730.00", "/__l5e/assets-v1/acd690d1-5688-4922-bb11-74d7b9907009/14-D1-Hero.avif"],
  ["D2", "$760.00", "/__l5e/assets-v1/f754fa92-f595-4bb8-b37d-ee32ca51f8f6/15-D2-Gen.avif"],
  ["D2 Premium", "$820.00", "/__l5e/assets-v1/005428ee-de9a-4d26-8b99-1b654aea0707/16-D2-Hero.avif"],
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "21Oaks Student Apartments • USC & Williams-Brice" },
    { name: "description", content: "Freshly renovated student apartments minutes from Williams-Brice and USC." },
    { property: "og:title", content: "21Oaks Student Apartments" },
    { property: "og:description", content: "Modern student living close to USC and Williams-Brice." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Home,
});

function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header">
      <a href="#top" className="wordmark">21OAKS</a>
      <div className="header-center">
        <Button variant="nav" size="nav" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />} <span>{open ? "Close" : "Menu"}</span>
        </Button>
        <a className="tour-button" href="#contact">Schedule a Tour</a>
      </div>
      <a className="apply-button" href="#contact">Apply Now <ArrowDownRight /></a>
    </header>
    {open && <nav className="menu-panel" aria-label="Main navigation">
      {['Home','Apartments','Amenities','Location','How to Apply','Gallery','FAQ','Contact'].map(x => <a key={x} href={`#${x.toLowerCase().replaceAll(' ','-')}`} onClick={() => setOpen(false)}>{x}<ArrowUpRight /></a>)}
    </nav>}
  </>;
}

function Home() {
  return <main id="top">
    <Header />
    <section className="hero">
      <img src={assets.hero} alt="Bright furnished 21Oaks bedroom" />
      <div className="hero-shade" />
      <div className="hero-copy reveal">
        <h1>Live better,<br />closer to USC</h1>
        <p>Freshly renovated and upgraded. Minutes from Williams-Brice. Designed for focused mornings, long nights, and balanced student living.</p>
      </div>
      <div className="hero-thumbs">{gallery.slice(0,4).map((src,i)=><img key={src} src={src} alt={`21Oaks view ${i+1}`} />)}</div>
      <a href="#apartments" className="scroll-cue" aria-label="Scroll to apartments"><ArrowDownRight /></a>
    </section>

    <section className="intro" id="apartments">
      <h2>Everything student<br />living should be</h2><span className="scribble" />
    </section>

    <section className="scatter" aria-label="Life at 21Oaks">
      {gallery.map((src,i)=><figure key={src} className={`scatter-${i+1}`}><img src={src} alt="21Oaks community lifestyle" /><figcaption>{['Within reach','Designed to recharge','Built for focus','Comfort in every corner','Movie nights ready','Spaces meant to connect'][i]}</figcaption></figure>)}
    </section>

    <section className="living" id="gallery">
      <div className="living-title"><h2>Made for<br />everyday living</h2><span className="scribble" /></div>
      <figure className="living-small"><img src={assets.smallBed} alt="Sunlit bedroom detail" /><figcaption><b>Private space</b><br />Your space to reset and focus</figcaption></figure>
      <img className="living-large" src={assets.bigBed} alt="Comfortable furnished bedroom" />
      <img className="living-community" src={assets.community} alt="Aerial view of the 21Oaks community" />
      <figure className="living-pool"><img src={assets.smallPool} alt="21Oaks resort-style pool" /><figcaption><b>Shared spaces</b><br />Room to connect, relax, and live beyond your apartment</figcaption></figure>
    </section>

    <section className="plans" aria-label="Available apartments">
      <div className="plans-pin"><h2>Where student life<br />feels balanced</h2><span className="dark-scribble" /></div>
      <div className="plan-track">{plans.map(([name,price,img],i)=><article className={`plan-card tilt-${i}`} key={name}>
        <div className="plan-photo"><img src={img} alt={`${name} apartment`} /><span>Available</span></div>
        <div className="plan-facts"><small>4 Bed</small><small>2 Baths</small><small>1,108 ft²</small></div>
        <div className="plan-name"><h3>{name}</h3><b>{price}</b></div>
        <p>A spacious 4-bedroom layout that gives everyone their own space to unwind, recharge, and stay focused.</p>
        <a href="#contact">Explore Details <ArrowDownRight /></a>
      </article>)}</div>
    </section>

    <section className="location" id="location">
      <div className="location-photo"><img src={assets.map} alt="Aerial view of 21Oaks near Columbia" /><h2>Closer than<br />you think</h2><div className="clouds">☁︎　☁︎　☁︎</div></div>
      <h2 className="reach">Everything you<br />need, within reach</h2><span className="scribble left" />
      <div className="location-grid">
        <div><p>From campus to everyday essentials — everything is closer than you think.</p>{[['Campus','3 min'],['Daily Essentials','5 min'],['Food & Social Spots','10 min']].map(([a,b])=><div className="distance" key={a}><span>{a}</span><span>{b}</span></div>)}</div>
        <p className="location-lead">Designed around your routine, so everything feels easy and connected. From campus to everyday essentials, you’re always close to what matters — without the hassle of long commutes or planning around distance.</p>
      </div>
    </section>

    <section className="amenities" id="amenities"><h2>Just outside<br />your door</h2><div className="amenity-grid">{[['Grilling Courtyard',assets.lounge],['Resort-Style Pool',assets.pool],['Study Spaces',assets.cinema]].map(([n,img])=><article key={n}><img src={img} alt={n}/><h3>{n}</h3><p>Thoughtful spaces designed for your everyday rhythm.</p></article>)}</div><a href="#amenities">Discover Amenities <ArrowDownRight /></a></section>

    <section className="steps" id="how-to-apply"><p>Simple Move-In</p><h2>How it Works</h2><div className="steps-grid">{[['01','Find your space'],['02','Apply in minutes'],['03','Move in, settle fast']].map(([n,t])=><article key={n}><b>{n}</b><h3>{t}</h3><p>Choose what feels right, complete your application, and we’ll help with the rest.</p></article>)}</div><div className="fit"><h3>Sounds like a fit?</h3><p>Apply now or book a tour.</p><a href="#contact">Schedule a Tour <ArrowUpRight /></a></div></section>

    <section className="testimonials"><h2>Real student<br />experiences</h2><blockquote>“The renovations made the apartments feel brand new. The location is quiet, but everything I need is still close.”<footer>— Emily Carter, Resident</footer></blockquote></section>

    <section className="faq" id="faq"><h2>Frequently asked<br />questions</h2><div>{['How do I apply?','Are leases by the bed?','What is required to apply?','Do I need a guarantor?','How long does approval take?'].map((q,i)=><details key={q} open={i===0}><summary>{q}<ChevronDown /></summary><p>{i===0?'Click “Apply Now,” choose your lease term and floor plan, and complete the online application.':'Our leasing team will guide you through every step and answer any questions.'}</p></details>)}</div></section>

    <section className="final-cta" id="contact"><h2>Find your place.<br />Make it yours.</h2><a href="mailto:21oaks@bhom.com">Schedule a Tour <ArrowUpRight /></a></section>
    <footer className="footer"><div><h2>21OAKS</h2><p>Your space. Still on.</p></div><div><b>Discover</b><a href="#apartments">Apartments</a><a href="#amenities">Amenities</a><a href="#location">Location</a><a href="#gallery">Gallery</a></div><div><b>Contact</b><p>21 National Guard Rd<br/>Columbia, SC 29201</p><a href="tel:+18039372431">+1 (803) 937-2431</a><a href="mailto:21oaks@bhom.com">21oaks@bhom.com</a></div><div><b>Office Hours</b><p>Mon–Fri 10am–6pm<br/>Sat 10am–5pm<br/>Sun 1pm–5pm</p></div><a className="back-top" href="#top">Back to top ↑</a></footer>
  </main>;
}