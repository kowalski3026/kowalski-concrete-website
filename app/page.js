"use client";
import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    title: "Driveways",
    icon: "🛣",
    desc: "High-performance driveways built for durability, function, and standout curb appeal that holds up through every Canadian winter.",
  },
  {
    title: "Garage Floors",
    icon: "🏗",
    desc: "Heavy-duty concrete garage floors finished for maximum durability, easy cleaning, and a clean modern look that lasts decades.",
  },
  {
    title: "Patios",
    icon: "🌿",
    desc: "Beautiful outdoor concrete spaces designed for entertaining, relaxing, and everyday living — from simple slabs to decorative finishes.",
  },
  {
    title: "Foundations",
    icon: "⚙",
    desc: "Precision-built foundations engineered for strength, stability, and lasting reliability. The base everything else depends on.",
  },
  {
    title: "Steps & Landings",
    icon: "🔲",
    desc: "Modern concrete entrances combining safety with clean architectural style. First impressions that last.",
  },
  {
    title: "Decorative Concrete",
    icon: "✦",
    desc: "Premium decorative finishes that bring texture, elegance, and personality to your space — stamped, exposed, brushed, or coloured.",
  },
];

const STATS = [
  { number: "20+", label: "Years of Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "100%", label: "Licensed & Insured" },
];

const GALLERY = [
  "/gallery/photo1.jpg",
  "/gallery/photo2.jpg",
  "/gallery/photo3.jpg",
  "/gallery/photo4.jpg",
  "/gallery/photo5.jpg",
  "/gallery/photo6.jpg",
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.7s ease ${el.dataset.delay || "0s"}, transform 0.7s ease ${el.dataset.delay || "0s"}`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ─── NAV ─────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(20,20,20,0.97)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#about" onClick={closeMenu}>
            <img
              src="/logo1.png"
              alt="Kowalski Concrete Contracting"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex items-center gap-10"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
          >
            {["About", "Services", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link text-white uppercase text-sm font-semibold tracking-widest opacity-90 hover:opacity-100 transition"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black px-5 py-2.5 transition-all duration-200"
              style={{
                background: "var(--color-amber)",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FBBF24")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-amber)")}
            >
              Free Quote
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className="hamburger-line"
                style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}
              />
              <span
                className="hamburger-line"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="hamburger-line"
                style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            background: "rgba(14,14,14,0.98)",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-5 border-t border-white/10">
            {["About", "Services", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="text-white uppercase font-bold tracking-widest text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:2495357501"
              className="text-amber-400 font-bold tracking-wide text-base mt-2"
              onClick={closeMenu}
            >
              (249) 535-7501
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-block text-center text-black font-bold py-3 uppercase tracking-widest text-sm"
              style={{ background: "var(--color-amber)", fontFamily: "var(--font-display)" }}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section
          id="about"
          className="relative min-h-screen flex items-end"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%), url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
              opacity: 0.4,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 pt-40 w-full">
            <div className="max-w-3xl">
              <span className="tag-pill mb-6 inline-block">Simcoe County & Surrounding Areas</span>

              <h1
                className="text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.92,
                }}
              >
                BUILT TO
                <br />
                <span style={{ color: "var(--color-amber)" }}>LAST.</span>
              </h1>

              <p
                className="mt-8 text-white/80 leading-relaxed max-w-xl"
                style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300 }}
              >
                Over 20 years of professional concrete experience — delivering
                driveways, foundations, patios, and infrastructure that hold up
                through every Canadian season.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-black px-8 py-4 transition-all duration-200"
                  style={{
                    background: "var(--color-amber)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.12em",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FBBF24")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-amber)")}
                >
                  Get a Free Quote
                </a>
                <a
                  href="tel:2495357501"
                  className="inline-flex items-center gap-2 font-semibold text-white/90 px-8 py-4 border border-white/25 hover:border-white/60 transition"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  (249) 535-7501
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 opacity-50">
            <span
              className="text-white text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-display)", writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
            <div
              className="w-px bg-white"
              style={{
                height: "48px",
                background: "linear-gradient(to bottom, white, transparent)",
              }}
            />
          </div>
        </section>

        {/* ─── STATS BAR ───────────────────────────────────── */}
        <section style={{ background: "var(--color-charcoal)" }}>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10">
              {STATS.map(({ number, label }, i) => (
                <div
                  key={label}
                  className="text-center px-8 py-2"
                  data-reveal
                  data-delay={`${i * 0.1}s`}
                >
                  <div className="stat-number">{number}</div>
                  <div
                    className="mt-1 text-white/50 uppercase tracking-widest text-xs"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "0.18em" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ABOUT / EXPERIENCE ──────────────────────────── */}
        <section
          id="services"
          className="py-28"
          style={{ background: "#F5F3F0" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-reveal>
                <span className="tag-pill" style={{ color: "#141414", borderColor: "#141414" }}>
                  Experience You Can Build On
                </span>
                <h2
                  className="mt-6 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 5vw, 5rem)",
                    color: "var(--color-charcoal)",
                    lineHeight: 0.93,
                  }}
                >
                  CONCRETE SOLUTIONS FOR EVERY PROJECT
                </h2>
                <span className="amber-rule" />
                <p className="text-zinc-600 leading-relaxed text-lg" style={{ maxWidth: "480px" }}>
                  Kowalski Concrete Contracting delivers high-quality concrete for
                  residential and commercial projects throughout Ontario. Every pour
                  is backed by two decades of hands-on expertise.
                </p>
                <p className="mt-4 text-zinc-600 leading-relaxed text-lg" style={{ maxWidth: "480px" }}>
                  We believe attention to detail is what separates good work from
                  exceptional craftsmanship — and that every project deserves both.
                </p>
              </div>

              {/* Stacked image composition */}
              <div className="relative h-96 md:h-[520px]" data-reveal data-delay="0.15s">
                <img
                  src="/hero2.jpg"
                  className="absolute right-0 top-0 w-4/5 h-80 object-cover"
                  style={{ borderRadius: "2px" }}
                  alt="Concrete work"
                />
                <img
                  src="/rebar-bg.jpg"
                  className="absolute left-0 bottom-0 w-2/3 h-52 object-cover border-4 border-white"
                  style={{ borderRadius: "2px" }}
                  alt="Rebar"
                />
                {/* Label card */}
                <div
                  className="absolute bottom-8 right-0 px-6 py-4 text-white"
                  style={{ background: "var(--color-amber)", borderRadius: "2px" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "2rem",
                      lineHeight: 1,
                      color: "#141414",
                    }}
                  >
                    20+ YRS
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest mt-0.5"
                    style={{ fontFamily: "var(--font-display)", color: "rgba(0,0,0,0.65)" }}
                  >
                    In Business
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICE CARDS ───────────────────────────────── */}
        <section
          className="py-28"
          style={{ background: "var(--color-charcoal)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16" data-reveal>
              <span className="tag-pill">What We Do</span>
              <h2
                className="mt-5 text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 0.95,
                }}
              >
                OUR SERVICES
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.title}
                  className="service-card p-8 border border-white/8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "2px",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                  data-reveal
                  data-delay={`${i * 0.07}s`}
                >
                  <div
                    className="text-3xl mb-5"
                    style={{ color: "var(--color-amber)", lineHeight: 1 }}
                  >
                    {svc.icon}
                  </div>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.6rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <span className="amber-rule" style={{ margin: "0.75rem 0" }} />
                  <p className="text-white/50 leading-relaxed text-sm">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INFRASTRUCTURE ──────────────────────────────── */}
        <section className="py-28" style={{ background: "#F5F3F0" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div data-reveal>
                <span className="tag-pill" style={{ color: "#141414", borderColor: "#141414" }}>
                  Infrastructure & Public Works
                </span>
                <h2
                  className="mt-6 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
                    color: "var(--color-charcoal)",
                    lineHeight: 0.93,
                  }}
                >
                  STRUCTURAL CONCRETE AT SCALE
                </h2>
                <span className="amber-rule" />
                <p className="text-zinc-600 leading-relaxed text-lg max-w-xl">
                  Beyond residential work, Kowalski has the expertise to handle
                  large-scale public infrastructure — bridge rehabilitation,
                  structural concrete repairs, sidewalks, curbs, and municipal
                  projects built for Canadian conditions.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Bridge Rehabilitation",
                    "Structural Concrete Repairs",
                    "Sidewalks & Curbs",
                    "Municipal Infrastructure",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-zinc-700 font-medium"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--color-amber)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2x2 grid */}
              <div
                className="grid grid-cols-2 gap-3"
                data-reveal
                data-delay="0.15s"
              >
                {["/bridge.jpg", "/sidewalk.jpg", "/curb.jpg", "/infrastructure.jpg"].map(
                  (src, i) => (
                    <div key={i} className="gallery-item" style={{ borderRadius: "2px", aspectRatio: "1/1" }}>
                      <img
                        src={src}
                        alt="Infrastructure project"
                        className="w-full h-full object-cover"
                      />
                      <div className="gallery-overlay" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─────────────────────────────────────── */}
        <section
          id="projects"
          className="py-28"
          style={{ background: "var(--color-stone)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16" data-reveal>
              <span className="tag-pill">Our Work</span>
              <h2
                className="mt-5 text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 0.95,
                }}
              >
                PROJECT GALLERY
              </h2>
              <p className="mt-5 text-white/40 text-base max-w-md mx-auto">
                Real projects. Real craftsmanship. Built to last.
              </p>
            </div>

            {/* Asymmetric gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GALLERY.map((src, i) => (
                <div
                  key={i}
                  className="gallery-item"
                  style={{
                    borderRadius: "2px",
                    gridRow: i === 0 ? "span 2" : "span 1",
                    aspectRatio: i === 0 ? "auto" : "4/3",
                    minHeight: i === 0 ? "100%" : "220px",
                  }}
                  data-reveal
                  data-delay={`${i * 0.07}s`}
                >
                  <img
                    src={src}
                    alt={`Project ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "220px" }}
                  />
                  <div className="gallery-overlay" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─────────────────────────────────────── */}
        <section
          id="contact"
          className="py-28"
          style={{
            background: "linear-gradient(135deg, #0D0D0D 0%, #1A1108 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left col */}
              <div data-reveal>
                <span className="tag-pill">Get in Touch</span>
                <h2
                  className="mt-6 text-white leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 5vw, 5rem)",
                    lineHeight: 0.92,
                  }}
                >
                  LET'S BUILD
                  <br />
                  SOMETHING
                  <br />
                  <span style={{ color: "var(--color-amber)" }}>STRONG.</span>
                </h2>
                <span className="amber-rule" />
                <p className="text-white/50 leading-relaxed max-w-sm">
                  Ready to start your project? Fill out the form and we'll get
                  back to you within 24 hours with a free, no-obligation quote.
                </p>

                <div className="mt-10 space-y-5">
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-amber)", fontFamily: "var(--font-display)" }}
                    >
                      Phone
                    </div>
                    <a
                      href="tel:2495357501"
                      className="text-white text-xl font-semibold hover:text-amber-400 transition"
                    >
                      (249) 535-7501
                    </a>
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-amber)", fontFamily: "var(--font-display)" }}
                    >
                      Email
                    </div>
                    <a
                      href="mailto:info@kowalskicc.ca"
                      className="text-white text-xl font-semibold hover:text-amber-400 transition"
                    >
                      info@kowalskicc.ca
                    </a>
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-amber)", fontFamily: "var(--font-display)" }}
                    >
                      Location
                    </div>
                    <p className="text-white/70">2060 Lea Rd, Innisfil ON L9S 1T3</p>
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-amber)", fontFamily: "var(--font-display)" }}
                    >
                      Social
                    </div>
                    <a
                      href="https://facebook.com/KowalskiContracting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-amber-400 transition font-medium"
                    >
                      Facebook →
                    </a>
                  </div>
                </div>
              </div>

              {/* Right col — form */}
              <div data-reveal data-delay="0.15s">
                <form
                  action="https://formsubmit.co/info@kowalskicc.ca"
                  method="POST"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="form-input col-span-2 md:col-span-1"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      className="form-input col-span-2 md:col-span-1"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Project Address"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="project"
                    placeholder="Project Type (e.g. Driveway, Patio, Foundation)"
                    className="form-input"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project — size, timeline, any specifics..."
                    rows="5"
                    required
                    className="form-input resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 font-bold uppercase tracking-widest text-black transition-all duration-200"
                    style={{
                      background: "var(--color-amber)",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      letterSpacing: "0.14em",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FBBF24")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-amber)")}
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ──────────────────────────────────────── */}
        <footer
          className="border-t"
          style={{
            background: "#0A0A0A",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <img
              src="/logo1.png"
              alt="Kowalski Concrete"
              className="h-10 w-auto object-contain opacity-80"
            />
            <p
              className="text-white/30 text-xs text-center"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
            >
              © {new Date().getFullYear()} Kowalski Concrete Contracting — Simcoe County, Ontario
            </p>
            <a
              href="https://facebook.com/KowalskiContracting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-amber-400 transition text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Facebook
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
