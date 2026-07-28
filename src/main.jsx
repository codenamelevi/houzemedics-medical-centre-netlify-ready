import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, useLocation } from 'react-router-dom';
import './styles.css';

const WHATSAPP_NUMBER = '27834069233';

const clinic = {
  name: 'Houzemedics Medical Centre & IV Lounge',
  tagline: 'Your Path to Optimal Care',
  address: 'Drysdale Road & Elnita Avenue, Northwold Junction Shopping Centre, Randburg',
  phone: '083 406 9233',
  phoneLink: 'tel:+27834069233',
  email: 'Houzemedics@gmail.com',
  emailLink: 'mailto:Houzemedics@gmail.com',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};

function whatsappBookLink(serviceName) {
  const text = encodeURIComponent(`Hi Houzemedics, I'd like to book: ${serviceName}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const services = [
  {
    name: 'Family Medicine',
    description: 'Comprehensive healthcare for the whole family.',
    includes: ['Acute illnesses', 'Chronic disease management', 'Medical reports', 'Repeat prescriptions', 'Health screening', 'Preventative care'],
    homeShow: true,
  },
  {
    name: 'Teleconsultations',
    description: 'Consult your doctor from anywhere in South Africa.',
    includes: ['Repeat prescriptions', 'Follow-up appointments', 'Chronic disease reviews', 'Minor illnesses', 'Medical advice'],
    includesLabel: 'Ideal for',
    homeShow: true,
  },
  {
    name: 'Home Visits',
    description: 'Receive professional medical care in the comfort of your home.',
    includes: ['Elderly patients', 'Busy professionals', 'Patients with mobility challenges', 'Families', 'Palliative care support'],
    includesLabel: 'Suitable for',
  },
  {
    name: 'Weight Loss Programme',
    description: 'A medically supervised programme designed to support sustainable weight loss.',
    includes: ['Doctor consultations', 'Personalised treatment plans', 'GLP-1 medications', 'Duromine therapy', 'Nutrition guidance', 'Exercise planning', 'Progress monitoring'],
    homeShow: true,
  },
  {
    name: 'Medical Aesthetics',
    description: 'Enhance your natural beauty with doctor-performed treatments.',
    includes: ['Botox', 'Dermal Fillers'],
    includesLabel: 'Services include',
    homeShow: true,
  },
  {
    name: "Women's & Men's Health",
    description: "Comprehensive healthcare tailored to the unique needs of both women and men, with a focus on prevention, wellness, and long-term health.",
    includes: [
      'General health assessments',
      'Preventative health screenings',
      'Hormonal evaluation and management',
      'Sexual and reproductive health',
      'Contraceptive counselling and family planning',
      'Lifestyle and preventative medicine',
      'Chronic disease screening and management',
      'Health education and wellness counselling',
    ],
    homeShow: true,
  },
  {
    name: 'Corporate Wellness',
    description: 'Bring healthcare to your workplace.',
    includes: ['Wellness days', 'Health screening', 'Blood pressure checks', 'Blood glucose testing', 'BMI assessments', 'IV therapy', 'Health talks'],
    includesLabel: 'Services include',
    homeShow: true,
  },
];

const ivDrips = [
  {
    name: 'Glow Drip',
    tagline: 'Radiance from Within',
    description: 'Designed to promote healthier-looking skin, hair, and nails while supporting overall cellular health.',
    benefits: [
      'Promotes brighter, healthier-looking skin',
      'Supports collagen production',
      'Helps reduce oxidative stress',
      'Supports healthy hair and nail growth',
      'Enhances hydration',
      'May improve skin recovery and complexion',
    ],
    bestFor: ['Dull skin', 'Frequent travel', 'Busy professionals', 'Beauty maintenance', 'Pre-event skin preparation'],
    duration: '15–30 minutes',
  },
  {
    name: 'Immune Booster Drip',
    tagline: 'Strengthen Your Natural Defences',
    description: 'Supports your immune system during periods of illness, stress, travel, or seasonal changes.',
    benefits: [
      'Supports immune function',
      'Helps combat fatigue',
      'Promotes recovery after illness',
      'Assists in reducing oxidative stress',
      'Helps maintain hydration',
      'Supports overall wellness',
    ],
    bestFor: ['Frequent infections', 'Flu season', 'Busy lifestyles', 'Recovery from illness', 'Travellers'],
    duration: '15–30 minutes',
  },
  {
    name: 'Detox Drip',
    tagline: 'Refresh. Rehydrate. Restore.',
    description: 'Supports hydration and your body\'s natural metabolic and recovery processes.',
    benefits: [
      'Replenishes fluids',
      'Supports normal liver function',
      'Helps relieve fatigue',
      'Promotes hydration',
      'Supports overall wellbeing',
      'Helps you feel refreshed',
    ],
    bestFor: ['Fatigue', 'Dehydration', 'Busy lifestyles', 'Recovery after strenuous activity'],
    duration: '15–30 minutes',
  },
  {
    name: 'Revitalisation & Hangover Recovery Drip',
    tagline: 'Recover Faster',
    description: 'Designed to rehydrate and replenish fluids and nutrients after alcohol consumption or dehydration.',
    benefits: [
      'Rapid rehydration',
      'Supports electrolyte replacement',
      'Helps relieve fatigue',
      'May reduce nausea associated with hangovers',
      'Supports headache recovery related to dehydration',
      'Promotes quicker recovery',
    ],
    bestFor: ['Hangovers', 'Dehydration', 'Long travel', 'Exhaustion', 'Heat exposure'],
    duration: '15–30 minutes',
  },
  {
    name: 'Brain Booster Drip',
    tagline: 'Support Focus & Mental Performance',
    description: 'Formulated to support mental clarity, hydration, and energy metabolism.',
    benefits: [
      'Supports concentration',
      'Helps reduce mental fatigue',
      'Supports cognitive performance',
      'Assists energy production',
      'Promotes hydration',
      'Supports productivity',
    ],
    bestFor: ['Students', 'Professionals', 'Exam preparation', 'Long working hours', 'Mental fatigue'],
    duration: '15–30 minutes',
  },
  {
    name: 'Iron Infusion',
    tagline: 'Restore Iron Levels',
    description: 'Administered under medical supervision for patients with confirmed iron deficiency when clinically appropriate.',
    benefits: [
      'Helps restore iron stores',
      'Supports healthy red blood cell production',
      'May improve energy levels in iron deficiency',
      'Helps reduce symptoms such as fatigue related to iron deficiency',
      'Supports oxygen transport throughout the body',
    ],
    bestFor: ['Confirmed iron deficiency', 'Iron deficiency anaemia (where appropriate)', 'Patients unable to tolerate oral iron'],
    bestForLabel: 'Suitable for',
    duration: 'Approximately 1 hour',
    note: 'Iron infusions require a medical assessment and may require blood test results before treatment.',
  },
];

const pageMeta = {
  '/': ['Houzemedics Medical Centre & IV Lounge | GP & IV Drip Lounge', 'General practitioner and IV Drip Lounge in Northwold Junction, Randburg. Your path to optimal care.'],
  '/about': ['About | Houzemedics Medical Centre & IV Lounge', 'Learn more about Houzemedics Medical Centre & IV Lounge and Dr TJ Tite in Northwold, Randburg.'],
  '/services': ['Services | Houzemedics Medical Centre & IV Lounge', 'Family medicine, teleconsultations, home visits, weight loss, aesthetics and more.'],
  '/iv-drip-lounge': ['IV Drip Lounge | Houzemedics Medical Centre', 'Restore, rehydrate and rejuvenate with our range of IV therapies in Northwold, Randburg.'],
  '/gallery': ['Gallery | Houzemedics Medical Centre & IV Lounge', 'A look inside Houzemedics Medical Centre & IV Lounge.'],
  '/booking': ['Book an Appointment | Houzemedics Medical Centre', 'Book via WhatsApp with Houzemedics Medical Centre & IV Lounge.'],
  '/contact': ['Contact | Houzemedics Medical Centre & IV Lounge', 'Contact Houzemedics Medical Centre & IV Lounge in Northwold Junction, Randburg.'],
};

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

// ── Shared components ────────────────────────────────────────────────────────

function Brand({ compact = false }) {
  return (
    <Link className="brand" to="/" aria-label="Houzemedics Medical Centre home">
      <img className="brand-logo" src="/images/houzemedics-logo-new.jpeg" alt="Houzemedics Medical Centre logo" />
      {!compact && (
        <span>
          <strong>Houzemedics</strong>
          <small>Medical Centre & IV Lounge</small>
        </span>
      )}
    </Link>
  );
}

function BookingsDropdown({ onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  function close() { setOpen(false); if (onClose) onClose(); }
  return (
    <div className="bookings-dropdown" ref={ref}>
      <button className="button button-small bookings-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="true">
        📅 BOOKINGS
      </button>
      {open && (
        <div className="bookings-menu" role="menu">
          <a className="bookings-menu-item" href={clinic.whatsapp} target="_blank" rel="noreferrer" onClick={close} role="menuitem">
            <span className="bmi-icon">💬</span>
            <span><strong>WhatsApp Us</strong><small>Chat &amp; book via WhatsApp</small></span>
          </a>
          <a className="bookings-menu-item" href={whatsappBookLink('Teleconsultation')} target="_blank" rel="noreferrer" onClick={close} role="menuitem">
            <span className="bmi-icon">📱</span>
            <span><strong>Book a Teleconsultation</strong><small>Remote appointment from anywhere</small></span>
          </a>
        </div>
      )}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/services', 'Services'],
    ['/iv-drip-lounge', 'IV Drip Lounge'],
    ['/gallery', 'Gallery'],
    ['/booking', 'Booking'],
    ['/contact', 'Contact'],
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">Toggle menu</span>
          <span></span><span></span><span></span>
        </button>
        <nav id="site-nav" className={open ? 'nav-open' : ''} aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <div className="nav-ctas">
            <BookingsDropdown onClose={() => setOpen(false)} />
            <a className="button button-small button-outline script-renewal-btn" href="https://forms.gle/om1EtbaobKtTBUDM6" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Script Renewal</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Brand />
          <p>{clinic.tagline}</p>
        </div>
        <div>
          <h2>Visit us</h2>
          <address>{clinic.address}</address>
          <a href={clinic.phoneLink}>{clinic.phone}</a>
          <a href={clinic.emailLink}>{clinic.email}</a>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>
        </div>
        <div>
          <h2>Hours</h2>
          <p>
            <strong>Teleconsultations</strong><br />Mon–Fri: 10:00–13:00
          </p>
          <p>
            <strong>In-person</strong><br />Mon–Fri: 14:30–20:00<br />Sat: 09:00–16:00<br />Sun & public holidays: by appointment
          </p>
        </div>
        <div>
          <h2>Quick links</h2>
          <Link to="/services">Services</Link>
          <Link to="/iv-drip-lounge">IV Drip Lounge</Link>
          <Link to="/booking">Book now</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Houzemedics Medical Centre & IV Lounge. All rights reserved.</div>
    </footer>
  );
}

function Layout({ children }) {
  const location = useLocation();
  useEffect(() => {
    const [title, description] = pageMeta[location.pathname] || pageMeta['/'];
    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute('content', description);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return <><Header /><main>{children}</main><Footer /></>;
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

// ── Booking modal ────────────────────────────────────────────────────────────

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
  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>{children || 'Book via WhatsApp'}</button>
      {open && <BookingModal service={service || { name: serviceName }} onClose={() => setOpen(false)} />}
    </>
  );
}

// ── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, showBook = false, plain = false }) {
  return (
    <article className={`service-card${plain ? ' service-card-plain' : ''}`}>
      {service.image
        ? <img className="service-photo" src={service.image} alt="" loading="lazy" />
        : <div className="service-icon" aria-hidden="true">+</div>}
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      {service.includes && (
        <ul className="service-includes">
          {service.includes.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
      <span>Contact for pricing</span>
      {showBook && (
        <WhatsAppButton service={service} className="button button-small service-book">Book via WhatsApp</WhatsAppButton>
      )}
    </article>
  );
}

// ── Pages ────────────────────────────────────────────────────────────────────

const whyChooseItems = [
  'Family Medical Care',
  'Teleconsultations',
  'Home Visits',
  'IV Drip Lounge',
  'Medical Aesthetics',
  'Weight Loss Programmes',
  'Corporate Wellness',
  'Chronic Disease Management',
];

const whyChooseReasons = [
  'Experienced Medical Doctor',
  'Comprehensive Medical Services',
  'Home Visits',
  'Telemedicine',
  'Same-Day Appointments (subject to availability)',
  'Holistic Wellness Approach',
  'Modern Medical Equipment',
  'Convenient Online Booking',
  'All Medical Aids Accepted',
];

const faqs = [
  { q: 'Do you accept medical aid?', a: 'Yes. We accept patients from all major South African medical aids.' },
  { q: 'Can I book online?', a: 'Yes. You can book online or via WhatsApp.' },
  { q: 'Do you offer home visits?', a: 'Yes. Home visits are available by appointment.' },
  { q: 'Do you offer teleconsultations?', a: 'Yes. Consult your doctor securely from anywhere in South Africa.' },
  { q: 'How long does an IV drip take?', a: 'Most IV drips take between 15 and 30 minutes, while iron infusions take approximately one hour.' },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        {faq.q}
        <span className="faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="faq-answer">{faq.a}</p>}
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">General Practitioner & IV Drip Lounge</p>
            <h1>Your Path to <em>Optimal Care</em></h1>
            <p className="hero-copy">Professional healthcare that comes to you, cares for you, and empowers you to live healthier.</p>
            <div className="button-row">
              <Link className="button" to="/booking">Book an Appointment</Link>
            </div>
          </div>
          <div className="hero-photo">
            <img src="/images/storefront.jpg" alt="Houzemedics Medical Centre storefront" width="900" height="700" />
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">How we can help</p>
              <h2>Care centred around you</h2>
            </div>
            <Link className="text-link" to="/services">View all services <span>→</span></Link>
          </div>
          <div className="services-grid preview-grid">
            {services.filter((s) => s.homeShow).map((service) => <ServiceCard key={service.name} service={service} plain />)}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="promise-section">
        <div className="container">
          <p className="eyebrow">Our commitment</p>
          <h2>Our Promise</h2>
          <p className="promise-text">
            We believe quality healthcare should be accessible, compassionate, and focused on helping every patient achieve optimal health and wellness. Our goal is to make every patient feel calm, relaxed, and at home from the moment they visit us.
          </p>
        </div>
      </section>

      {/* Hours */}
      <section className="hours-strip">
        <div className="container">
          <div>
            <p className="eyebrow">Opening hours</p>
            <h2>Here when you need us</h2>
          </div>
          <div>
            <strong>Teleconsultations</strong>
            <span>Mon–Fri: 10:00–13:00</span>
          </div>
          <div>
            <strong>In-person</strong>
            <span>Mon–Fri: 14:30–20:00</span>
          </div>
          <div>
            <strong>Saturday</strong>
            <span>09:00–16:00</span>
          </div>
          <Link className="button button-light" to="/contact">Contact us</Link>
        </div>
      </section>

      {/* Why Choose Houzemedics — reasons */}
      <section className="section reasons-section">
        <div className="container">
          <p className="eyebrow">The Houzemedics difference</p>
          <h2>Why Choose Houzemedics?</h2>
          <div className="reasons-grid">
            {whyChooseReasons.map((reason) => (
              <div key={reason} className="reason-card">
                <span className="reason-dot" aria-hidden="true"></span>
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <p className="eyebrow">Frequently asked questions</p>
          <h2>Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => <FaqItem key={faq.q} faq={faq} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="About Houzemedics" title="A place for thoughtful, personal care" />
      <section className="section">
        <div className="container about-grid">
          <div className="about-photo">
            <img src="/images/dr-tj-tite.jpg" alt="Dr TJ Tite, General Practitioner at Houzemedics Medical Centre" loading="lazy" />
          </div>
          <div className="content">
            <h2>Health care with a human touch</h2>
            <p>Houzemedics Medical Centre provides professional primary health care in a welcoming setting. We believe good health starts with being heard, understood, and supported.</p>
            <p>Led by <strong>Dr TJ Tite</strong>, General Practitioner, our clinic brings together everyday GP care, wellness services, and practical treatment options to help patients make confident decisions about their health.</p>
            <p>Open till late on weekdays — book in person, by phone, or through WhatsApp at {clinic.phone}.</p>
            <WhatsAppButton serviceName="General consultation" className="button">Book via WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Doctor bio */}
      <section className="section doctor-bio-section">
        <div className="container">
          <p className="eyebrow">Meet the doctor</p>
          <h2>Dr TJ Tite</h2>
          <p className="doctor-credentials">MBChB &nbsp;|&nbsp; General Practitioner</p>
          <div className="doctor-bio-grid">
            <div className="doctor-bio-text">
              <p>Dr TJ Tite is a South African medical doctor with international training and a passion for delivering accessible, patient-centred healthcare. He studied medicine at the Universidad de Ciencias Médicas de La Habana in Cuba before completing his medical training at Sefako Makgatho Health Sciences University (MEDUNSA).</p>
              <p>He completed his internship at Chris Hani Baragwanath Academic Hospital and his community service at Steve Biko Academic Hospital in the Emergency Department, gaining extensive experience in emergency medicine and the management of acute and chronic medical conditions.</p>
              <p>Today, Dr Tite combines evidence-based medicine with a holistic approach to wellness through family medicine, chronic disease management, medical aesthetics, IV nutritional therapy, and weight management.</p>
            </div>
            <div className="doctor-bio-aside">
              <div className="bio-block">
                <h3>Qualifications</h3>
                <ul>
                  {['MBChB', 'Basic Life Support (BLS)', 'Advanced Cardiac Life Support (ACLS)', 'Paediatric Advanced Life Support (PALS)', 'Point-of-Care Ultrasound (POCUS)', 'Dispensing Licence', 'Botox & Dermal Fillers Certification'].map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="bio-block">
                <h3>Languages</h3>
                <ul>
                  {['English', 'isiZulu', 'Sesotho', 'Español'].map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Services() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Practical care for every stage of life" text="Explore our range of medical and wellness services. Book via WhatsApp to discuss your needs and pricing." />
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => <ServiceCard key={service.name} service={service} showBook />)}
          </div>
          <div className="center-cta">
            <h2>Ready to take the next step?</h2>
            <p>Choose a service and message us on WhatsApp — we'll help you find the right appointment.</p>
            <a className="button" href={clinic.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

function IVDripLounge() {
  return (
    <>
      <PageHero eyebrow="IV Drip Lounge" title="Restore. Rehydrate. Rejuvenate." text="Clinically guided IV therapy in a calm, comfortable lounge setting." />
      <section className="section">
        <div className="container">
          <div className="iv-drip-grid">
            {ivDrips.map((drip) => (
              <article key={drip.name} className="iv-drip-card">
                <div className="iv-drip-header">
                  <h2>{drip.name}</h2>
                  <p className="iv-tagline">{drip.tagline}</p>
                </div>
                <p>{drip.description}</p>
                {drip.note && <p className="iv-note"><strong>Note:</strong> {drip.note}</p>}
                <div className="iv-drip-lists">
                  <div>
                    <h4>Benefits</h4>
                    <ul>{drip.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
                  </div>
                  <div>
                    <h4>{drip.bestForLabel || 'Best for'}</h4>
                    <ul>{drip.bestFor.map((b) => <li key={b}>{b}</li>)}</ul>
                  </div>
                </div>
                <div className="iv-drip-footer">
                  <span className="iv-duration">⏱ {drip.duration}</span>
                  <WhatsAppButton service={drip} className="button button-small">Book this drip</WhatsAppButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section iv-pricing-section">
        <div className="container">
          <p className="eyebrow">Transparent pricing</p>
          <h2>IV Drip Pricing</h2>
          <table className="iv-pricing-table">
            <thead>
              <tr><th>Treatment</th><th>Price</th></tr>
            </thead>
            <tbody>
              <tr><td>200 ml IV Drip</td><td>R750</td></tr>
              <tr><td>1 L IV Drip</td><td>R800</td></tr>
              <tr><td>Iron Drip — Low dose</td><td>R900</td></tr>
              <tr><td>Iron Drip — High dose</td><td>R1 200</td></tr>
              <tr><td>Rehydration — 200 ml</td><td>R200</td></tr>
              <tr><td>Rehydration — 1 litre</td><td>R250</td></tr>
            </tbody>
          </table>
          <p className="iv-pricing-note">All IV drip sessions are clinically supervised. Iron infusions require a prior medical assessment.</p>
          <div className="center-cta">
            <WhatsAppButton serviceName="IV Drip Therapy" className="button">Book your IV drip</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}

function Gallery() {
  return (
    <>
      <PageHero eyebrow="Our space" title="A calm, welcoming clinic" text="A glimpse of the Houzemedics experience." />
      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((item, i) => (
              <figure key={item.src} className={`gallery-item gallery-${i + 1}`}>
                <img loading="lazy" src={item.src} alt={item.alt} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Booking() {
  return (
    <>
      <PageHero eyebrow="Book an appointment" title="Make time for your health" text="Choose the service you need and send us a WhatsApp message. We'll confirm your booking as soon as possible." />
      <section className="section">
        <div className="container">
          <div className="notice booking-notice">
            <strong>Please note</strong>
            <p>Sunday & Public Holiday appointments must be booked at least 1 day in advance. Same-day Sunday requests are Tele-Consultation only.</p>
            <p>Prefer to call? Reach us on <a href={clinic.phoneLink}>{clinic.phone}</a>.</p>
          </div>
          <div className="booking-services-grid">
            {services.map((service, index) => (
              <article key={service.name} className="booking-service-card">
                {service.image && <img src={service.image} alt="" loading="lazy" />}
                <span className="booking-number">{String(index + 1).padStart(2, '0')}</span>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <WhatsAppButton service={service} className="button">Book via WhatsApp</WhatsAppButton>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; }
    setSent(true);
    /* PLACEHOLDER: Replace with a secure form handler or email service. */
  }
  return (
    <>
      <PageHero eyebrow="Contact us" title="We're here to help" text="Reach out to book, ask a question, or find our clinic." />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-details">
            <h2>Contact details</h2>
            <address>{clinic.address}</address>
            <a href={clinic.phoneLink}>{clinic.phone}</a>
            <a href={clinic.emailLink}>{clinic.email}</a>
            <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a>
            <h3>Clinic hours</h3>
            <p>
              <strong>Teleconsultations</strong><br />
              Monday–Friday: 10:00–13:00
            </p>
            <p>
              <strong>In-person Consultations</strong><br />
              Monday–Friday: 14:30–20:00<br />
              Saturday: 09:00–16:00<br />
              Sunday & Public Holidays: by prior appointment (minimum 1 day ahead) or same-day Tele-Consultation only
            </p>
            <img className="contact-photo" src="/images/roadside-sign.jpg" alt="Houzemedics roadside sign" loading="lazy" />
            <iframe
              className="map"
              title="Map to Houzemedics Medical Centre"
              loading="lazy"
              src="https://www.google.com/maps?q=Drysdale%20Rd%20%26%20Elnita%20Ave%2C%20Northwold%20Junction%2C%20Randburg%2C%202188&output=embed"
            ></iframe>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <h2>Send a message</h2>
            {sent && <p className="success" role="status">Thank you — your message is ready to be connected to a form handler.</p>}
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required autoComplete="name" />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            {/* PLACEHOLDER: Wire this form to a secure form handler or mailto flow. */}
            <button className="button" type="submit">Send message</button>
            <p className="contact-whatsapp-note">For faster booking, <a href={clinic.whatsapp} target="_blank" rel="noreferrer">message us on WhatsApp</a>.</p>
          </form>
        </div>
      </section>
    </>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

function App() {
  const path = useLocation().pathname;
  const pages = {
    '/': <Home />,
    '/about': <About />,
    '/services': <Services />,
    '/iv-drip-lounge': <IVDripLounge />,
    '/gallery': <Gallery />,
    '/booking': <Booking />,
    '/contact': <Contact />,
  };
  return <Layout>{pages[path] || <Home />}</Layout>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
