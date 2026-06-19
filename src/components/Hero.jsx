import Image from "next/image";
import Link from "next/link";

const Hero = () => {
return ( 
<section className="overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28"> <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

      {/* Content */}
      <div className="order-2 lg:order-1 text-center lg:text-left">
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-sm font-medium">
          📚 StudyNook Platform
        </span>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
          Find Your Perfect
          <span className="block text-cyan-300">
            Study Room
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Browse and book quiet, private study rooms in your
          library. Discover distraction-free spaces and reserve
          your ideal study environment instantly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="/rooms"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-slate-900 font-semibold shadow-lg hover:bg-cyan-300 transition-all duration-300 text-center"
          >
            Explore Rooms
          </Link>

          <Link
            href="/add-room"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold hover:bg-white/10 transition-all duration-300 text-center"
          >
            List Your Room
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">

          <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full"></div>

          <Image
            src="/hero.avif"
            alt="Study Room"
            width={1000}
            height={800}
            priority
            className="
              relative
              block
              w-full
              h-auto
              rounded-3xl
              object-cover
              shadow-2xl
            "
          />
        </div>
      </div>

    </div>
  </div>
</section>


);
};

export default Hero;
