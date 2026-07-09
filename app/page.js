"use client";
import { useState, useEffect } from "react";

const SERVICES = [
  {
    title: "Driveways",
    desc: "High-performance driveways built for durability, function, and standout curb appeal that holds up through every Canadian winter.",
  },
  {
    title: "Garage Floors",
    desc: "Heavy-duty concrete garage floors finished for maximum durability, easy cleaning, and a clean modern look that lasts decades.",
  },
  {
    title: "Patios",
    desc: "Beautiful outdoor concrete spaces designed for entertaining, relaxing, and everyday living — from simple slabs to decorative finishes.",
  },
  {
    title: "Foundations",
    desc: "Precision-built foundations engineered for strength, stability, and lasting reliability. The base everything else depends on.",
  },
  {
    title: "Steps & Landings",
    desc: "Modern concrete entrances combining safety with clean architectural style. First impressions that last.",
  },
  {
    title: "Decorative Concrete",
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
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
backdropFilter: "none",
borderBottom: "none",
        }}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <a href="#about" onClick={closeMenu} className="flex-shrink-0">
              <img
                src="/logo3.png"
                alt="Kowalski Concrete Contracting"
                className="h-28 sm:h-32 md:h-36 w-auto object-contain"
                style={{ maxWidth: "340px" }}
              />
            </a>

            <div
              className="hidden md:flex items-center gap-8 lg:gap-10"
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
              <a
                href="/concrete-cost-guide-simcoe-county.html"
                className="nav-link text-white uppercase text-sm font-semibold tracking-widest opacity-90 hover:opacity-100 transition"
              >
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-widest text-black px-5 py-2.5 transition-all duration-200"
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

              <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 flex-shrink-0"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span
                  className="hamburger-line"
                  style={{
                    transform: menuOpen ? "rotate(45deg) translate(0, 8px)" : "none",
                    transformOrigin: "center",
                  }}
                />
                <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
                <span
                  className="hamburger-line"
                  style={{
                    transform: menuOpen ? "rotate(-45deg) translate(0, -8px)" : "none",
                    transformOrigin: "center",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "420px" : "0",
            background: "rgba(14,14,14,0.98)",
          }}
        >
          <div className="px-4 py-6 flex flex-col gap-5 border-t border-white/10 w-full">
            {["About", "Services", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="text-white uppercase font-bold tracking-widest text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item}
              </a>
            ))}
            <a
              href="/concrete-cost-guide-simcoe-county.html"
              onClick={closeMenu}
              className="text-white uppercase font-bold tracking-widest text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pricing
            </a>
            <a
              href="tel:2495357501"
              className="font-bold tracking-wide text-base mt-1"
              style={{ color: "var(--color-amber)" }}
              onClick={closeMenu}
            >
              (249) 535-7501
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="block text-center text-black font-bold py-3.5 uppercase tracking-widest text-sm w-full"
              style={{ background: "var(--color-amber)", fontFamily: "var(--font-display)" }}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden w-full">

        <section
          id="about"
          className="relative min-h-screen flex items-end w-full"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%), url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.4 }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-28 pt-36 sm:pt-40">
            <div className="max-w-3xl">
              <span className="tag-pill mb-6 inline-block">Simcoe County &amp; Surrounding Areas</span>

              <h1
                className="text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 12vw, 7.5rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.92,
                }}
              >
                BUILT TO
                <br />
                <span style={{ color: "var(--color-amber)" }}>LAST.</span>
              </h1>

              <p
                className="mt-6 sm:mt-8 text-white/80 leading-relaxed"
                style={{
                  fontSize: "clamp(0.95rem, 3.5vw, 1.2rem)",
                  fontWeight: 300,
                  maxWidth: "480px",
                }}
              >
                Over 20 years of professional concrete experience — delivering
                driveways, foundations, patios, and infrastructure that hold up
                through every Canadian season.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center font-bold uppercase tracking-widest text-black px-6 py-4 transition-all duration-200 text-center"
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
                  className="inline-flex items-center justify-center font-semibold text-white/90 px-6 py-4 border border-white/25 hover:border-white/60 transition text-center"
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

          <div className="absolute bottom-8 right-6 hidden md:flex flex-col items-center gap-2 opacity-50">
            <span
              className="text-white text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-display)", writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
            <div
              className="w-px"
              style={{ height: "48px", background: "linear-gradient(to bottom, white, transparent)" }}
            />
          </div>
        </section>

        <section className="w-full" style={{ background: "var(--color-charcoal)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/10">
              {STATS.map(({ number, label }, i) => (
                <div
                  key={label}
                  className="text-center px-4 sm:px-8 py-2"
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

        <section
          id="services"
          className="py-16 sm:py-20 lg:py-28 w-full"
          style={{ background: "#F5F3F0" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div data-reveal>
                <span className="tag-pill" style={{ color: "#141414", borderColor: "#141414" }}>
                  Experience You Can Build On
                </span>
                <h2
                  className="mt-5 sm:mt-6 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.2rem, 7vw, 5rem)",
                    color: "var(--color-charcoal)",
                    lineHeight: 0.93,
                  }}
                >
                  CONCRETE SOLUTIONS FOR EVERY PROJECT
                </h2>
                <span className="amber-rule" />
                <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                  Kowalski Concrete Contracting delivers high-quality concrete for
                  residential and commercial projects throughout Ontario. Every pour
                  is backed by two decades of hands-on expertise.
                </p>
                <p className="mt-4 text-zinc-600 leading-relaxed text-base sm:text-lg">
                  We believe attention to detail is what separates good work from
                  exceptional craftsmanship — and that every project deserves both.
                </p>
              </div>

              <div data-reveal data-delay="0.15s">
                <div className="lg:hidden relative">
                  <img
                    src="/hero3.jpg"
                    className="w-full object-cover"
                    style={{ height: "260px", borderRadius: "2px" }}
                    alt="Concrete work"
                  />
                  <div
                    className="absolute bottom-0 right-0 px-5 py-3"
                    style={{ background: "var(--color-amber)" }}
                  >
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.5rem", color: "#141414", lineHeight: 1 }}>
                      20+ YRS
                    </div>
                    <div className="text-xs uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-display)", color: "rgba(0,0,0,0.6)" }}>
                      In the Business
                    </div>
                  </div>
                </div>

                <div
                  className="hidden lg:block relative overflow-hidden"
                  style={{ height: "520px" }}
                >
                  <img
                    src="/hero2.jpg"
                    className="absolute right-0 top-0 object-cover"
                    style={{ width: "80%", height: "320px", borderRadius: "2px" }}
                    alt="Concrete work"
                  />
                  <img
                    src="/rebar-bg.jpg"
                    className="absolute left-0 bottom-0 object-cover border-4 border-white"
                    style={{ width: "62%", height: "208px", borderRadius: "2px" }}
                    alt="Rebar"
                  />
                  <div
                    className="absolute bottom-8 right-0 px-6 py-4"
                    style={{ background: "var(--color-amber)", borderRadius: "2px" }}
                  >
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", lineHeight: 1, color: "#141414" }}>
                      20+ YRS
                    </div>
                    <div className="text-xs uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-display)", color: "rgba(0,0,0,0.65)" }}>
                      In the Business
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-16 sm:py-20 lg:py-28 w-full"
          style={{ background: "var(--color-charcoal)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-16" data-reveal>
              <span className="tag-pill">What We Do</span>
              <h2
                className="mt-5 text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
                  lineHeight: 0.95,
                }}
              >
                OUR SERVICES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.title}
                  className="service-card p-6 sm:p-8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "2px",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  data-reveal
                  data-delay={`${i * 0.07}s`}
                >
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.5rem",
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

        <section className="py-16 sm:py-20 lg:py-28 w-full" style={{ background: "#F5F3F0" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div data-reveal>
                <span className="tag-pill" style={{ color: "#141414", borderColor: "#141414" }}>
                  Infrastructure &amp; Public Works
                </span>
                <h2
                  className="mt-5 sm:mt-6 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
                    color: "var(--color-charcoal)",
                    lineHeight: 0.93,
                  }}
                >
                  STRUCTURAL CONCRETE AT SCALE
                </h2>
                <span className="amber-rule" />
                <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                  Beyond residential work, Kowalski has the expertise to handle
                  large-scale public infrastructure — bridge rehabilitation,
                  structural concrete repairs, sidewalks, curbs, and municipal
                  projects built for Canadian conditions.
                </p>
                <ul className="mt-6 sm:mt-8 space-y-3">
                  {[
                    "Bridge Rehabilitation",
                    "Structural Concrete Repairs",
                    "Sidewalks & Curbs",
                    "Municipal Infrastructure",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-zinc-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-amber)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3" data-reveal data-delay="0.15s">
                {["/bridge.jpg", "/sidewalk.jpg", "/curb.jpg", "/infrastructure.jpg"].map((src, i) => (
                  <div key={i} className="gallery-item" style={{ borderRadius: "2px", aspectRatio: "1/1" }}>
                    <img src={src} alt="Infrastructure project" className="w-full h-full object-cover" />
                    <div className="gallery-overlay" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="py-16 sm:py-20 lg:py-28 w-full"
          style={{ background: "var(--color-stone)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-16" data-reveal>
              <span className="tag-pill">Our Work</span>
              <h2
                className="mt-5 text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
                  lineHeight: 0.95,
                }}
              >
                PROJECT GALLERY
              </h2>
              <p className="mt-4 sm:mt-5 text-white/40 text-sm sm:text-base max-w-md mx-auto">
                Real projects. Real craftsmanship. Built to last.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {GALLERY.map((src, i) => (
                <div
                  key={i}
                  className="gallery-item"
                  style={{ borderRadius: "2px", aspectRatio: "4/3" }}
                  data-reveal
                  data-delay={`${i * 0.07}s`}
                >
                  <img src={src} alt={`Project ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="gallery-overlay" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-16 sm:py-20 lg:py-28 w-full"
          style={{ background: "linear-gradient(135deg, #0D0D0D 0%, #1A1108 100%)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div data-reveal>
                <span className="tag-pill">Get in Touch</span>
                <h2
                  className="mt-5 sm:mt-6 text-white leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 10vw, 5rem)",
                    lineHeight: 0.92,
                  }}
                >
                  LET&apos;S BUILD
                  <br />
                  SOMETHING
                  <br />
                  <span style={{ color: "var(--color-amber)" }}>STRONG.</span>
                </h2>
                <span className="amber-rule" />
                <p className="text-white/50 leading-relaxed max-w-sm text-base">
                  Ready to start your project? Fill out the form and we&apos;ll get
                  back to you within 24 hours with a free, no-obligation quote.
                </p>

                <div className="mt-8 sm:mt-10 space-y-5">
                  {[
                    { label: "Phone", content: <a href="tel:2495357501" className="text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition">(249) 535-7501</a> },
                    { label: "Email", content: <a href="mailto:info@kowalskicc.ca" className="text-white text-base sm:text-xl font-semibold hover:text-amber-400 transition break-all">info@kowalskicc.ca</a> },
                    
                    { label: "Social", content: <a href="https://facebook.com/KowalskiContracting" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-400 transition font-medium">Facebook</a> },
                  ].map(({ label, content }) => (
                    <div key={label}>
                      <div
                        className="text-xs uppercase tracking-widest mb-1"
                        style={{ color: "var(--color-amber)", fontFamily: "var(--font-display)" }}
                      >
                        {label}
                      </div>
                      {content}
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal data-delay="0.15s">
                <form
                  action="https://formsubmit.co/info@kowalskicc.ca"
                  method="POST"
                  className="space-y-4 w-full"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Your Name" required className="form-input" />
                    <input type="tel" name="phone" placeholder="Phone Number" required className="form-input" />
                  </div>
                  <input type="email" name="email" placeholder="Email Address" required className="form-input" />
                  <input type="text" name="address" placeholder="Project Address" className="form-input" />
                  <input type="text" name="project" placeholder="Project Type (e.g. Driveway, Patio, Foundation)" className="form-input" />
                  <textarea name="message" placeholder="Tell us about your project — size, timeline, any specifics..." rows="5" required className="form-input resize-none" />
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

        <footer
          className="border-t w-full"
          style={{ background: "#0A0A0A", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <img
              src="/logo3.png"
              alt="Kowalski Concrete"
              className="h-9 sm:h-10 w-auto object-contain opacity-80"
              style={{ maxWidth: "140px" }}
            />
            <p
              className="text-white/30 text-xs text-center"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
            >
              {`© ${new Date().getFullYear()} Kowalski Concrete Contracting Inc. — Simcoe County, Ontario`}
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
