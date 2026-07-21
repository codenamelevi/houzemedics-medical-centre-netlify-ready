import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, useLocation } from 'react-router-dom';
import './styles.css';

const WHATSAPP_NUMBER = '27834069233';

const clinic = {
  name: 'Houzemedics Medical Centre',
  address: 'Drysdale Rd & Elnita Ave, Northwold, Randburg, 2188',
  phone: '083 406 9233',
  phoneLink: 'tel:+27834069233',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};

function whatsappBookLink(serviceName) {
  const text = encodeURIComponent(`Hi Houzemedics, I'd like to book: ${serviceName}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const services = [
  { name: 'Weight Loss Clinic', description: 'Practical, doctor-led support to help you work toward sustainable health goals.' },
  { name: 'IV Drip Therapy', description: 'Tailored IV wellness support in a calm, clinically guided lounge setting.' },
  { name: 'Tele-Consultations', description: 'Convenient consultations from wherever you are when an in-person visit is not needed.' },
  { name: 'Chronic Disease Management', description: 'Ongoing care and monitoring for long-term health conditions.' },
  { name: 'Medical Assessments', description: 'Thorough health evaluations for your personal, work, or medical needs.' },
  { name: 'Corporate Wellness', description: 'Flexible wellness support designed for healthy, productive teams.' },
  { name: 'Home Visits', description: 'Compassionate medical care in the comfort of your home, where appropriate.' },
  { name: "Women's and Men's Health", description: 'Sensitive, preventative, and ongoing care for every stage of adult health.' },
  { name: 'Family Medicine', description: 'Everyday primary care for individuals and families.' },
  { name: 'Minor Surgical Procedures', description: 'Selected minor procedures performed with professional clinical care.' },
];

const galleryImages = [
  { src: '/images/storefront.jpg', alt: 'Houzemedics Medical Centre storefront signage', caption: 'Storefront' },
  { src: '/images/reception.jpg', alt: 'Reception area at Houzemedics Medical Centre', caption: 'Reception' },
  { src: '/images/waiting-room.jpg', alt: 'Waiting room seating', caption: 'Waiting room' },
  { src: '/images/consultation-room.jpg', alt: 'Doctor consultation room', caption: 'Consultation room' },
  { src: '/images/examination-room.jpg', alt: 'Examination and treatment room', caption: 'Examination room' },
  { src: '/images/iv-drip-lounge-wide.jpg', alt: 'IV drip lounge seating area', caption: 'IV drip lounge' },
  { src: '/images/iv-drip-detail.jpg', alt: 'IV drip therapy space', caption: 'IV therapy space' },
  { src: '/images/wellness-chair.jpg', alt: 'Comfortable wellness seating', caption: 'Wellness seating' },
  { src: '/images/roadside-sign.jpg', alt: 'Houzemedics roadside sign with WhatsApp contact', caption: 'Find us' },
  { src: '/images/exterior-sign-close.jpg', alt: 'Houzemedics Medical Centre exterior sign', caption: 'Exterior signage' },
];

const pageMeta = {
  '/': ['Houzemedics Medical Centre | GP & IV Drip Lounge', 'General practitioner and IV Drip Lounge in Northwold, Randburg. Your path to optimal health.'],
  '/about': ['About | Houzemedics Medical Centre', 'Learn more about Houzemedics Medical Centre in Northwold, Randburg.'],
  '/services': ['Services | Houzemedics Medical Centre', 'Explore GP, IV drip, tele-consultation, wellness and family medicine services.'],
  '/gallery': ['Gallery | Houzemedics Medical Centre', 'A look inside Houzemedics Medical Centre.'],
  '/booking': ['Book an Appointment | Houzemedics Medical Centre', 'Book via WhatsApp with Houzemedics Medical Centre.'],
  '/contact': ['Contact | Houzemedics Medical Centre', 'Contact Houzemedics Medical Centre in Northwold, Randburg.'],
};

function Brand({ compact = false }) {
  return <Link className="brand" to="/" aria-label="Houzemedics Medical Centre home">
    <img className="brand-logo" src="/images/houzemedics-logo.jpeg" alt="Houzemedics Medical Centre logo — house, stethoscope and red cross" />
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
  <div><h2>Visit us</h2><address>{clinic.address}</address><a href={clinic.phoneLink}>{clinic.phone}</a><a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a></div>
  <div><h2>Hours</h2><p>Mon–Fri: 14:30–20:00<br/>Sat: 09:00–16:00<br/>Sun & public holidays: by appointment</p></div>
  <div><h2>Quick links</h2><Link to="/services">Services</Link><Link to="/booking">Book now</Link><Link to="/contact">Contact</Link></div>
  </div><div className="footer-bottom">© {new Date().getFullYear()} Houzemedics Medical Centre. All rights reserved.</div></footer>; }

function Layout({ children }) { const location = useLocation(); useEffect(() => { const [title, description] = pageMeta[location.pathname] || pageMeta['/']; document.title = title; document.querySelector('meta[name="description"]').setAttribute('content', description); window.scrollTo(0, 0); }, [location.pathname]); return <><Header/><main>{children}</main><Footer/></>; }
function PageHero({ eyebrow, title, text }) { return <section className="page-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p>{text}</p>}</div></section>; }

function BookingModal({ service, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', notes: '' });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; }
    const lines = [
      `Hi Houzemedics, I'd like to book an appointment.`,
      ``,
      `Service: ${service.name}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.date ? `Preferred date: ${form.date}` : null,
      form.time ? `Preferred time: ${form.time}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter((l) => l !== null);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noreferrer');
    onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Book ${service.name}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        <p className="eyebrow">Book via WhatsApp</p>
        <h2 className="modal-title">{service.name}</h2>
        <p className="modal-sub">Fill in your details and we'll open WhatsApp with everything pre-filled — just hit send.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="b-name">Full name *</label>
          <input id="b-name" type="text" value={form.name} onChange={set('name')} required autoComplete="name" placeholder="e.g. Thabo Nkosi" />
          <label htmlFor="b-phone">Phone number *</label>
          <input id="b-phone" type="tel" value={form.phone} onChange={set('phone')} required autoComplete="tel" placeholder="e.g. 082 123 4567" />
          <label htmlFor="b-date">Preferred date <span className="optional">(optional)</span></label>
          <input id="b-date" type="date" value={form.date} onChange={set('date')} />
          <label htmlFor="b-time">Preferred time <span className="optional">(optional)</span></label>
          <input id="b-time" type="time" value={form.time} onChange={set('time')} />
          <label htmlFor="b-notes">Notes <span className="optional">(optional)</span></label>
          <textarea id="b-notes" rows="3" value={form.notes} onChange={set('notes')} placeholder="Anything else we should know?" />
          <button className="button modal-submit" type="submit">Continue to WhatsApp →</button>
        </form>
      </div>
    </div>
  );
}

function WhatsAppButton({ serviceName, service, className = 'button', children }) {
  const [open, setOpen] = useState(false);
  return <>
    <button className={className} onClick={() => setOpen(true)}>{children || 'Book via WhatsApp'}</button>
    {open && <BookingModal service={service || { name: serviceName }} onClose={() => setOpen(false)} />}
  </>;
}

function ServiceCard({ service, showBook = false }) {
  return <article className="service-card">
    {service.image ? <img className="service-photo" src={service.image} alt="" loading="lazy" /> : <div className="service-icon" aria-hidden="true">+</div>}
    <h3>{service.name}</h3>
    <p>{service.description}</p>
    <span>Contact for pricing</span>
    {showBook && <WhatsAppButton service={service} className="button button-small service-book">Book via WhatsApp</WhatsAppButton>}
  </article>;
}

function Home() { return <>
  <section className="home-hero"><div className="container hero-grid"><div><p className="eyebrow">General Practitioner & IV Drip Lounge</p><h1>Your Path to <em>Optimal Health</em></h1><p className="hero-copy">Personal, accessible medical care for you and your family — right here in Northwold.</p><div className="button-row"><Link className="button" to="/booking">Book Now</Link><a className="button button-outline" href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp Us</a></div></div><div className="hero-photo"><img src="/images/storefront.jpg" alt="Houzemedics Medical Centre storefront" width="900" height="700" /></div></div></section>
  <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">How we can help</p><h2>Care centred around you</h2></div><Link className="text-link" to="/services">View all services <span>→</span></Link></div><div className="services-grid preview-grid">{services.slice(0, 6).map((service) => <ServiceCard key={service.name} service={service}/>)}</div></div></section>
  <section className="hours-strip"><div className="container"><div><p className="eyebrow">Opening hours</p><h2>Here when you need us</h2></div><div><strong>Monday–Friday</strong><span>14:30–20:00</span></div><div><strong>Saturday</strong><span>09:00–16:00</span></div><Link className="button button-light" to="/contact">Contact us</Link></div></section>
  </>; }

function About() { return <><PageHero eyebrow="About Houzemedics" title="A place for thoughtful, personal care"/><section className="section"><div className="container about-grid"><div className="about-photo"><img src="/images/dr-tj-tite.jpg" alt="Dr TJ Tite, General Practitioner at Houzemedics Medical Centre" loading="lazy" /></div><div className="content"><h2>Health care with a human touch</h2><p>Houzemedics Medical Centre provides professional primary health care in a welcoming setting. We believe good health starts with being heard, understood, and supported.</p><p>Led by <strong>Dr TJ Tite</strong>, General Practitioner (PR: 1236814), our clinic brings together everyday GP care, wellness services, and practical treatment options to help patients make confident decisions about their health.</p><p>Open till late on weekdays — book in person, by phone, or through WhatsApp at {clinic.phone}.</p><WhatsAppButton serviceName="General consultation" className="button">Book via WhatsApp</WhatsAppButton></div></div></section></>; }

function Services() { return <><PageHero eyebrow="Our services" title="Practical care for every stage of life" text="Explore our range of medical and wellness services. Book via WhatsApp to discuss your needs and pricing."/><section className="section"><div className="container"><div className="services-grid">{services.map(service => <ServiceCard key={service.name} service={service} showBook />)}</div><div className="center-cta"><h2>Ready to take the next step?</h2><p>Choose a service and message us on WhatsApp — we’ll help you find the right appointment.</p><a className="button" href={clinic.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a></div></div></section></>; }

function Gallery() { return <><PageHero eyebrow="Our space" title="A calm, welcoming clinic" text="A glimpse of the Houzemedics experience."/><section className="section"><div className="container"><div className="gallery-grid">{galleryImages.map((item, i) => <figure key={item.src} className={`gallery-item gallery-${i + 1}`}><img loading="lazy" src={item.src} alt={item.alt} /><figcaption>{item.caption}</figcaption></figure>)}</div></div></section></>; }

function Booking() {
  return <><PageHero eyebrow="Book an appointment" title="Make time for your health" text="Choose the service you need and send us a WhatsApp message. We’ll confirm your booking as soon as possible."/>
  <section className="section"><div className="container">
    <div className="notice booking-notice"><strong>Please note</strong><p>Sunday & Public Holiday appointments must be booked at least 1 day in advance. Same-day Sunday requests are Tele-Consultation only.</p><p>Prefer to call? Reach us on <a href={clinic.phoneLink}>{clinic.phone}</a>.</p></div>
    <div className="booking-services-grid">{services.map((service, index) => <article key={service.name} className="booking-service-card">
      {service.image && <img src={service.image} alt="" loading="lazy" />}
      <span className="booking-number">{String(index + 1).padStart(2, '0')}</span>
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <WhatsAppButton service={service} className="button">Book via WhatsApp</WhatsAppButton>
    </article>)}</div>
  </div></section></>;
}

function Contact() { const [sent, setSent] = useState(false); function submit(e) { e.preventDefault(); if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; } setSent(true); /* PLACEHOLDER: Replace with a secure form handler or email service. */ } return <><PageHero eyebrow="Contact us" title="We’re here to help" text="Reach out to book, ask a question, or find our clinic."/><section className="section"><div className="container contact-grid"><div className="contact-details"><h2>Contact details</h2><address>{clinic.address}</address><a href={clinic.phoneLink}>{clinic.phone}</a><a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a><h3>Clinic hours</h3><p>Monday–Friday: 14:30–20:00<br/>Saturday: 09:00–16:00<br/>Sunday & Public Holidays: by prior appointment (minimum 1 day ahead) or same-day Tele-Consultation only</p><img className="contact-photo" src="/images/roadside-sign.jpg" alt="Houzemedics roadside sign" loading="lazy" /><iframe className="map" title="Map to Houzemedics Medical Centre" loading="lazy" src="https://www.google.com/maps?q=Drysdale%20Rd%20%26%20Elnita%20Ave%2C%20Northwold%2C%20Randburg%2C%202188&output=embed"></iframe></div><form className="contact-form" onSubmit={submit}><h2>Send a message</h2>{sent && <p className="success" role="status">Thank you — your message is ready to be connected to a form handler.</p>}<label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name"/><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email"/><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" required autoComplete="tel"/><label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" required></textarea>{/* PLACEHOLDER: Wire this form to a secure form handler or mailto flow. */}<button className="button" type="submit">Send message</button><p className="contact-whatsapp-note">For faster booking, <a href={clinic.whatsapp} target="_blank" rel="noreferrer">message us on WhatsApp</a>.</p></form></div></section></>; }

function App() { const path = useLocation().pathname; const pages = {'/': <Home/>, '/about': <About/>, '/services': <Services/>, '/gallery': <Gallery/>, '/booking': <Booking/>, '/contact': <Contact/>}; return <Layout>{pages[path] || <Home/>}</Layout>; }
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
