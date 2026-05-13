export default function Home() {
  return (
    <>
      
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">
            <img src="/logo1.png" className="w-40 md:w-48 h-auto object-contain" />
            <div className="text-white leading-tight">
  <p className="text-sm md:text-base font-bold tracking-wide">
    (249) 535-7501
  </p>

  <p className="text-xs text-zinc-400">
    info@kowalskicc.ca
  </p>
</div>
          </div>

<div className="hidden md:flex gap-8 text-white uppercase text-sm font-semibold">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <a
            href="#contact"
            className="border border-white px-3 py-2 text-white font-bold uppercase text-xs md:text-sm whitespace-nowrap hover:bg-white hover:text-black transition"
  >
            Get Quote
          </a>

        </div>
      </nav>
     <main className="min-h-screen bg-zinc-100 text-zinc-900">
    <section
  className="relative min-h-screen bg-cover bg-center text-white"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/hero.jpg')",
  }}
  >
        <div className="max-w-7xl mx-auto px-6 pt-48 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="bg-black/45 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-white">
              BUILT ON STRENGTH.
              <span className="block text-amber-400">FINISHED WITH PRIDE.</span>
            </h1>
    <p className="mt-6 text-lg md:text-2xl text-white italic">
  Transforming ideas into lasting concrete craftsmanship.
</p>
    <p className="mt-6 text-sm md:text-lg uppercase tracking-[0.3em] text-amber-400 font-semibold">
  Serving Simcoe County & Surrounding Areas
</p>

            <p className="mt-8 text-lg md:text-2xl text-zinc-200 leading-relaxed max-w-2xl">
              Over 20 years of professional concrete experience with attention to detail,
              durability, and craftsmanship that sets us apart.
            </p>

            <a
              href="#contact"
              className="inline-block mt-10 bg-amber-600 hover:bg-amber-500 transition px-8 py-4 rounded-2xl font-bold"
            >
              GET A FREE QUOTE
            </a>
          </div>

      
        </div>
      </section>

      <section
  className="py-24 bg-cover bg-center"
  style={{ backgroundImage: "url('/rebar-bg.jpg')" }}
>
  <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-black leading-tight">
              EXPERIENCE YOU CAN BUILD ON.
            </h2>

            <p className="mt-8 text-lg text-white/90 leading-relaxed drop-shadow-lg">
              Kowalski Concrete Contracting provides high-quality concrete solutions
              for residential and commercial projects throughout Ontario.
            </p>

            <p className="mt-6 text-lg text-white/90 leading-relaxed drop-shadow-lg">
              We take pride in every project and believe attention to detail is what
              separates good work from exceptional craftsmanship.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-zinc-900 text-white rounded-3xl p-8">
              <h3 className="text-3xl font-black">20+ Years Experience</h3>
            </div>

            <div className="bg-amber-600 text-white rounded-3xl p-8">
              <h3 className="text-3xl font-black">Attention To Detail</h3>
            </div>

            <div className="bg-zinc-800 text-white rounded-3xl p-8">
              <h3 className="text-3xl font-black">Pride In Our Work</h3>
            </div>
          </div>
        </div>
      </section>

                <section
  className="text-white py-24 bg-cover bg-center relative"
  style={{ backgroundImage: "url('/services-bg.jpg')" }}
>
  <div className="absolute inset-0 bg-black/25"></div>
         <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center">
            CONCRETE SOLUTIONS FOR EVERY PROJECT
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              "Driveways",
              "Garage Floors",
              "Patios",
              "Foundations",
              "Steps & Landings",
              "Decorative Concrete",
            ].map((service) => (
              <div
                key={service}
                className="bg-zinc-800 border border-zinc-700 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold">{service}</h3>

              <p className="mt-4 text-zinc-400">
  {service === "Driveways" &&
    "High-performance driveways built for durability, function, and standout curb appeal."}

  {service === "Garage Floors" &&
    "Heavy-duty concrete garage floors finished for durability and a clean modern look."}

  {service === "Patios" &&
    "Beautiful outdoor concrete spaces designed for entertaining, relaxing, and everyday living."}

  {service === "Foundations" &&
    "Precision-built foundations engineered for strength, stability, and lasting reliability."}

  {service === "Steps & Landings" &&
    "Modern concrete entrances designed to combine safety with clean architectural style."}

  {service === "Decorative Concrete" &&
    "Premium decorative finishes that bring texture, elegance, and personality to your space."}
</p>
              </div>
            ))}
          </div>
        </div>
      </section>
              
                <section className="py-24 bg-zinc-900 text-white">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-black text-center">
      MUNICIPAL & INFRASTRUCTURE EXPERIENCE
    </h2>

    <p className="text-zinc-400 text-center mt-6 text-xl max-w-4xl mx-auto">
      Experienced in bridge rehabilitation, municipal structural repairs,
      sidewalks, curbs, and large-scale concrete infrastructure projects.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-16">

      <img
        src="/bridge1.jpg"
        className="rounded-3xl h-80 w-full object-cover"
      />

      <img
        src="/bridge2.jpg"
        className="rounded-3xl h-80 w-full object-cover"
      />

      <img
        src="/bridge3.jpg"
        className="rounded-3xl h-80 w-full object-cover"
      />

    </div>

  </div>
</section>
<section className="py-24 bg-zinc-900 text-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">
      <h2 className="text-5xl md:text-6xl font-black tracking-tight">
        MUNICIPAL EXPERIENCE
      </h2>

      <div className="w-32 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>

      <p className="mt-8 text-zinc-300 text-xl max-w-4xl mx-auto leading-relaxed">
        Extensive experience working on municipal and infrastructure concrete
        projects including bridge rehabilitation, sidewalks, curbs, structural
        repairs, and large-scale public works.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mt-20">

      <div className="group overflow-hidden rounded-3xl bg-zinc-800">
        <img
          src="/bridge1.jpg"
          alt="Bridge rehabilitation concrete work"
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold">
            Bridge Rehabilitation
          </h3>

          <p className="mt-3 text-zinc-400 leading-relaxed">
            Structural concrete repairs and rehabilitation work on municipal
            bridge infrastructure projects.
          </p>
        </div>
      </div>

      <div className="group overflow-hidden rounded-3xl bg-zinc-800">
        <img
          src="/bridge2.jpg"
          alt="Municipal sidewalk and curb concrete work"
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold">
            Municipal Concrete
          </h3>

          <p className="mt-3 text-zinc-400 leading-relaxed">
            Professional concrete workmanship for sidewalks, curbs, and public
            infrastructure projects.
          </p>
        </div>
      </div>

      <div className="group overflow-hidden rounded-3xl bg-zinc-800">
        <img
          src="/bridge3.jpg"
          alt="Infrastructure concrete forming and finishing"
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold">
            Infrastructure Projects
          </h3>

          <p className="mt-3 text-zinc-400 leading-relaxed">
            Experience with large-scale infrastructure concrete forming,
            finishing, and structural work.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
      <section id="contact" className="bg-[linear-gradient(to_bottom_right,#292524,#111827)] text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black">
            LET'S BUILD SOMETHING STRONG TOGETHER.
          </h2>
            <form
  action="https://formsubmit.co/info@kowalskicc.ca"
  method="POST"
  className="space-y-6 mt-12 max-w-3xl mx-auto"
>

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl"
  />

  <input
    type="tel"
    name="phone"
    placeholder="Phone Number"
    required
    className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl"
  />
<input
  type="text"
  name="address"
  placeholder="Project Address"
  className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl"
/>
  <input
    type="email"
    name="email"
    placeholder="Email Address"
    required
    className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl"
  />

  <input
    type="text"
    name="project"
    placeholder="Project Type"
    className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl"
  />

  <textarea
    name="message"
    placeholder="Tell us about your project"
    rows="6"
    required
    className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl"
  ></textarea>

  <button
    type="submit"
    className="bg-amber-500 text-black font-black px-10 py-4 rounded-xl hover:bg-amber-400 transition"
  >
    SUBMIT REQUEST
  </button>

</form>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-zinc-900 rounded-3xl p-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm">Phone</h3>
              <a
  href="tel:2495357501"
  className="mt-4 text-2xl font-bold block hover:text-amber-400 transition"
>
  249-535-7501
</a>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm">Email</h3>
              <a
  href="mailto:krisk@kowalskicc.ca"
  className="mt-4 text-xl font-bold block hover:text-amber-400 transition"
>
  krisk@kowalskicc.ca
</a>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm">Website</h3>
              <p className="mt-4 text-xl font-bold break-words">
                kowalskicc.ca
              </p>
            </div>
          </div>

          <p className="mt-10 text-zinc-400">
            2060 Lea Rd, Innisfil ON L9S 1T3
          </p>
        </div>
      </section>
    </main>
      </>
  )
}
