import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, useLocation } from 'react-router-dom';
import './styles.css';

const clinic = {
  name: 'Houzemedics Medical Centre',
  address: 'Drysdale Rd & Elnita Ave, Northwold, Randburg, 2188',
  // PLACEHOLDER: Temporary contact number supplied during build; replace with the clinic number before launch.
  phone: '076 797 9215',
  phoneLink: 'tel:+27767979215',
  whatsapp: 'https://wa.me/27767979215',
};

const services = [
  ['Weight Loss Clinic', 'Practical, doctor-led support to help you work toward sustainable health goals.'],
  ['IV Drip Therapy', 'Tailored IV wellness support in a calm, clinically guided lounge setting.'],
  ['Tele-Consultations', 'Convenient consultations from wherever you are when an in-person visit is not needed.'],
  ['Chronic Disease Management', 'Ongoing care and monitoring for long-term health conditions.'],
  ['Medical Assessments', 'Thorough health evaluations for your personal, work, or medical needs.'],
  ['Corporate Wellness', 'Flexible wellness support designed for healthy, productive teams.'],
  ['Home Visits', 'Compassionate medical care in the comfort of your home, where appropriate.'],
  ["Women's and Men's Health", 'Sensitive, preventative, and ongoing care for every stage of adult health.'],
  ['Family Medicine', 'Everyday primary care for individuals and families.'],
  ['Minor Surgical Procedures', 'Selected minor procedures performed with professional clinical care.'],
];

const pageMeta = {
  '/': ['Houzemedics Medical Centre | GP & IV Drip Lounge', 'General practitioner and IV Drip Lounge in Northwold, Randburg. Your path to optimal health.'],
  '/about': ['About | Houzemedics Medical Centre', 'Learn more about Houzemedics Medical Centre in Northwold, Randburg.'],
  '/services': ['Services | Houzemedics Medical Centre', 'Explore GP, IV drip, tele-consultation, wellness and family medicine services.'],
  '/gallery': ['Gallery | Houzemedics Medical Centre', 'A look inside Houzemedics Medical Centre.'],
  '/booking': ['Book an Appointment | Houzemedics Medical Centre', 'Book an in-person appointment or tele-consultation with Houzemedics.'],
  '/contact': ['Contact | Houzemedics Medical Centre', 'Contact Houzemedics Medical Centre in Northwold, Randburg.'],
};

function Brand({ compact = false }) {
  return <Link className="brand" to="/" aria-label="Houzemedics Medical Centre home">
    {/* PLACEHOLDER: Replace this CSS logo mark with the supplied Houzemedics logo file. */}
    <span className="logo-mark" aria-hidden="true"><span>+</span></span>
    {!compact && <span><strong>Houzemedics</strong><small>Medical Centre</small></span>}
  </Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/gallery', 'Gallery'], ['/booking', 'Booking'], ['/contact', 'Contact']];
  return <header className="site-header"><div className="header-inner">
    <Brand />
    <button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}><span className="sr-only">Toggle menu</span><span></span><span></span><span></span></button>
    <nav id="site-nav" className={open ? 'nav-open' : ''} aria-label="Main navigation">
      {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <Link className="button button-small" to="/booking" onClick={() => setOpen(false)}>Book Now</Link>
    </nav>
  </div></header>;
}

function Footer() { return <footer className="site-footer"><div className="footer-grid">
  <div><Brand /><p>Your Path to Optimal Health.</p></div>
  <div><h2>Visit us</h2><address>{clinic.address}</address><a href={clinic.phoneLink}>{clinic.phone}</a></div>
  <div><h2>Hours</h2><p>Mon–Fri: 14:30–20:00<br/>Sat: 09:00–16:00<br/>Sun & public holidays: by appointment</p></div>
  <div><h2>Quick links</h2><Link to="/services">Services</Link><Link to="/booking">Book now</Link><Link to="/contact">Contact</Link></div>
  </div><div className="footer-bottom">© {new Date().getFullYear()} Houzemedics Medical Centre. All rights reserved.</div></footer>; }

function Layout({ children }) { const location = useLocation(); useEffect(() => { const [title, description] = pageMeta[location.pathname] || pageMeta['/']; document.title = title; document.querySelector('meta[name="description"]').setAttribute('content', description); window.scrollTo(0, 0); }, [location.pathname]); return <><Header/><main>{children}</main><Footer/></>; }
function PageHero({ eyebrow, title, text }) { return <section className="page-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p>{text}</p>}</div></section>; }
function ServiceCard({ service }) { return <article className="service-card"><div className="service-icon" aria-hidden="true">+</div><h3>{service[0]}</h3><p>{service[1]}</p>{/* PLACEHOLDER: Client to provide service pricing. */}<span>Contact for pricing</span></article>; }

function Home() { return <>
  <section className="home-hero"><div className="container hero-grid"><div><p className="eyebrow">General Practitioner & IV Drip Lounge</p><h1>Your Path to <em>Optimal Health</em></h1><p className="hero-copy">Personal, accessible medical care for you and your family — right here in Northwold.</p><div className="button-row"><Link className="button" to="/booking">Book Now</Link><a className="button button-outline" href={clinic.phoneLink}>Call Us</a></div></div><div className="hero-panel"><div className="hero-cross">+</div><p>Care that meets you where you are.</p><strong>GP care · Wellness · IV Therapy</strong></div></div></section>
  <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">How we can help</p><h2>Care centred around you</h2></div><Link className="text-link" to="/services">View all services <span>→</span></Link></div><div className="services-grid preview-grid">{services.slice(0, 6).map((service) => <ServiceCard key={service[0]} service={service}/>)}</div></div></section>
  <section className="hours-strip"><div className="container"><div><p className="eyebrow">Opening hours</p><h2>Here when you need us</h2></div><div><strong>Monday–Friday</strong><span>14:30–20:00</span></div><div><strong>Saturday</strong><span>09:00–16:00</span></div><Link className="button button-light" to="/contact">Contact us</Link></div></section>
  </>; }
function About() { return <><PageHero eyebrow="About Houzemedics" title="A place for thoughtful, personal care"/><section className="section"><div className="container narrow content"><p className="placeholder-note">[PLACEHOLDER — replace with client copy]</p><h2>Health care with a human touch</h2><p>Houzemedics Medical Centre provides professional primary health care in a welcoming setting. We believe good health starts with being heard, understood, and supported.</p><p>Our clinic brings together everyday GP care, wellness services, and practical treatment options to help patients make confident decisions about their health.</p><p className="placeholder-note">[PLACEHOLDER — add the clinic story, practitioner bio, qualifications, and mission here.]</p><Link className="button" to="/booking">Book an appointment</Link></div></section></>; }
function Services() { return <><PageHero eyebrow="Our services" title="Practical care for every stage of life" text="Explore our range of medical and wellness services. Get in touch to discuss your needs and pricing."/><section className="section"><div className="container"><div className="services-grid">{services.map(service => <ServiceCard key={service[0]} service={service}/>)}</div><div className="center-cta"><h2>Ready to take the next step?</h2><p>Book your appointment or contact us to find the right service for you.</p><Link className="button" to="/booking">Book now</Link></div></div></section></>; }
function Gallery() { const images = ['Clinic reception', 'Consultation room', 'IV drip lounge', 'Care details', 'Wellness space', 'Medical centre exterior']; return <><PageHero eyebrow="Our space" title="A calm, welcoming clinic" text="A glimpse of the Houzemedics experience."/><section className="section"><div className="container"><p className="placeholder-note">[PLACEHOLDER — replace these images with approved clinic and staff photography.]</p><div className="gallery-grid">{images.map((alt, i) => <figure key={alt} className={`gallery-item gallery-${i + 1}`}><img loading="lazy" src={`https://placehold.co/900x${i % 2 ? '700' : '1000'}/e9f1f4/0d3b4f?text=Houzemedics+Photo`} alt={`${alt} placeholder`} /><figcaption>{alt}</figcaption></figure>)}</div></div></section></>; }
function Booking() { return <><PageHero eyebrow="Book an appointment" title="Make time for your health" text="Choose the appointment type that works best for you."/><section className="section"><div className="container booking-layout"><div><div className="notice"><strong>Please note</strong><p>Sunday & Public Holiday appointments must be booked at least 1 day in advance. Same-day Sunday requests are Tele-Consultation only.</p></div><div className="appointment-types"><article><span>01</span><h2>In-Person Appointment</h2><p>Visit us at our Northwold medical centre for a consultation or service.</p></article><article><span>02</span><h2>Tele-Consultation</h2><p>Speak with a medical professional remotely from a convenient location.</p></article></div></div><div className="booking-embed">{/* PLACEHOLDER: Paste the Cal.com iframe embed code here and replace this placeholder. */}<h2>Appointment booking</h2><p>[PLACEHOLDER — Cal.com booking widget]</p><iframe title="Cal.com booking placeholder" src="about:blank" loading="lazy" aria-label="Cal.com booking widget placeholder"></iframe></div></div></section></>; }
function Contact() { const [sent, setSent] = useState(false); function submit(e) { e.preventDefault(); if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; } setSent(true); /* PLACEHOLDER: Replace with a secure form handler or email service. */ } return <><PageHero eyebrow="Contact us" title="We’re here to help" text="Reach out to book, ask a question, or find our clinic."/><section className="section"><div className="container contact-grid"><div className="contact-details"><h2>Contact details</h2><address>{clinic.address}</address><a href={clinic.phoneLink}>{clinic.phone}</a><a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a><h3>Clinic hours</h3><p>Monday–Friday: 14:30–20:00<br/>Saturday: 09:00–16:00<br/>Sunday & Public Holidays: by prior appointment (minimum 1 day ahead) or same-day Tele-Consultation only</p><iframe className="map" title="Map to Houzemedics Medical Centre" loading="lazy" src="https://www.google.com/maps?q=Drysdale%20Rd%20%26%20Elnita%20Ave%2C%20Northwold%2C%20Randburg%2C%202188&output=embed"></iframe></div><form className="contact-form" onSubmit={submit}><h2>Send a message</h2>{sent && <p className="success" role="status">Thank you — your message is ready to be connected to a form handler.</p>}<label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name"/><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email"/><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" required autoComplete="tel"/><label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" required></textarea>{/* PLACEHOLDER: Wire this form to a secure form handler or mailto flow. */}<button className="button" type="submit">Send message</button></form></div></section></>; }
function App() { const path = useLocation().pathname; const pages = {'/': <Home/>, '/about': <About/>, '/services': <Services/>, '/gallery': <Gallery/>, '/booking': <Booking/>, '/contact': <Contact/>}; return <Layout>{pages[path] || <Home/>}</Layout>; }
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
