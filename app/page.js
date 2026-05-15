export default function Home() {
  return (
    <>
      
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent border-b border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <img src="/logo1.png" className="w-40 md:w-48 h-auto object-contain" />
            <div className="flex flex-col items-end text-right">
  <p className="text-sm md:text-base font-bold tracking-wide text-white">
    (249) 535-7501
  </p>

  <p className="text-sm md:text-base text-amber-300">
    info@kowalskicc.ca
  </p>

  <button className="mt-2 border border-zinc-400 px-4 py-2 text-sm font-bold text-white hover:bg-amber-500 hover:text-black transition">
    GET QUOTE
  </button>
</div>
          </div>

<div className="hidden md:flex gap-8 text-white uppercase text-sm font-semibold">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          

        </div>
      </nav>
     <main className="min-h-screen bg-zinc-100 text-zinc-900">
    <section
  className="relative md:min-h-screen bg-cover bg-center text-white"
  style={{
    backgroundImage: "url('/hero.jpg')",
  }}
>


  <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-32">
    <div className="p-8 max-w-xl">
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-white">
              MAKE YOUR DREAMS COME TRUE...
              <span className="block text-amber-400">WITH CONCRETE!</span>
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
  className="text-white py-24 bg-zinc-950 bg-cover bg-center"
  style={{ backgroundImage: "url('/services-bg.jpg')" }}
>

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
                className="bg-zinc-900/90 border border-zinc-700 rounded-3xl p-8"
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
                     
       <section
  className="relative py-24 text-white overflow-hidden"
  style={{
    backgroundImage: "url('/municipal-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="text-center">
  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-none px-4">
    INFRASTRUCTURE EXPERIENCE
  </h2>

      <div className="w-32 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>

      <p className="mt-8 text-white-300 text-xl max-w-4xl mx-auto leading-relaxed">
        Experienced in bridge rehabilitation, structural concrete repairs,
        sidewalks, curbs, and large-scale public infrastructure projects built
        for durability and long-term performance.
      </p>
    </div>

    <div className="mt-20 max-w-5xl mx-auto">
      <div className="bg-black/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-zinc-700">
        <div className="grid md:grid-cols-2 gap-6 p-6">
  <img
    src="/bridge.jpg"
    className="w-full h-[260px] object-cover rounded-2xl"
  />

  <img
    src="/sidewalk.jpg"
    className="w-full h-[260px] object-cover rounded-2xl"
  />

  <img
    src="/curb.jpg"
    className="w-full h-[260px] object-cover rounded-2xl"
  />

  <img
    src="/infrastructure.jpg"
    className="w-full h-[260px] object-cover rounded-2xl"
  />
</div>

        <div className="p-10">
          <h3 className="text-3xl font-bold">
            Public Works & Structural Concrete
          </h3>

          <p className="mt-6 text-zinc-300 text-lg leading-relaxed">
            Skilled in delivering demanding infrastructure projects including
            bridge rehabilitation, concrete restoration, sidewalks, curbs, and
            structural repairs designed to withstand heavy use and harsh
            Canadian conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
              <section
  className="py-24 text-white relative overflow-hidden"
  style={{
    backgroundImage: "url('/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 bg-black/75"></div>
  <div className="relative z-10 max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight">
        PROJECT GALLERY
      </h2>

      <div className="w-32 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>

      <p className="mt-8 text-zinc-300 text-lg max-w-3xl mx-auto">
        Real projects. Real craftsmanship. Built to last.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      <img
        src="/gallery/photo1.jpg"
        className="rounded-3xl object-cover h-80 w-full"
      />

      <img
        src="/gallery/photo2.jpg"
        className="rounded-3xl object-cover h-80 w-full"
      />

      <img
        src="/gallery/photo3.jpg"
        className="rounded-3xl object-cover h-80 w-full"
      />

      <img
        src="/gallery/photo4.jpg"
        className="rounded-3xl object-cover h-80 w-full"
      />

      <img
        src="/gallery/photo5.jpg"
        className="rounded-3xl object-cover h-80 w-full"
      />

      <img
        src="/gallery/photo6.jpg"
        className="rounded-3xl object-cover h-80 w-full"
      />

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
