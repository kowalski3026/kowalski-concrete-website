export default function Home() {
  return (
    <>
      
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img src="/logo.jpg" className="w-28 h-28 object-contain" />
            <div className="text-white font-bold leading-tight">
              Kowalski Concrete
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
            className="border border-white px-5 py-2 text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition"
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
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
              BUILT ON STRENGTH.
              <span className="block text-amber-500">FINISHED WITH PRIDE.</span>
            </h1>
    <p className="mt-6 text-lg md:text-2xl text-zinc-300 italic">
  Transforming ideas into lasting concrete craftsmanship.
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-black leading-tight">
              EXPERIENCE YOU CAN BUILD ON.
            </h2>

            <p className="mt-8 text-lg text-zinc-700 leading-relaxed">
              Kowalski Concrete Contracting provides high-quality concrete solutions
              for residential and commercial projects throughout Ontario.
            </p>

            <p className="mt-6 text-lg text-zinc-700 leading-relaxed">
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

      <section className="bg-zinc-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
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
                  Professional concrete workmanship completed with precision and durability.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
                <section className="bg-zinc-800 text-white py-24">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-black">
      MUNICIPAL & INFRASTRUCTURE
    </h2>

    <p className="mt-8 text-zinc-300 text-xl max-w-3xl">
      Experienced in bridge rehabilitation, municipal concrete,
      structural repairs, curbs, sidewalks, and public infrastructure projects.
    </p>

  </div>
</section>

      <section id="contact" className="bg-[linear-gradient(to_bottom_right,#292524,#111827)] text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black">
            LET'S BUILD SOMETHING STRONG TOGETHER.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-zinc-900 rounded-3xl p-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm">Phone</h3>
              <p className="mt-4 text-2xl font-bold">249-535-7501</p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm">Email</h3>
              <p className="mt-4 text-xl font-bold break-words">
                krisk@kowalskicc.ca
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm">Website</h3>
              <p className="mt-4 text-xl font-bold break-words">
                www.kowalskicc.ca
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
