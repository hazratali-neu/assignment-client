export const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Ahmed",
      review:
        "StudyNook helped me prepare for my exams in a quiet and comfortable environment.",
    },
    {
      name: "Rahim Uddin",
      review:
        "Booking was simple and the study rooms were clean and well equipped.",
    },
    {
      name: "Nusrat Jahan",
      review:
        "Perfect place for group study sessions with reliable WiFi and facilities.",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            What Students Say
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Trusted by students who value productive study spaces.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:-translate-y-1 hover:border-yellow-500/40 transition-all duration-300 shadow-lg"
            >
              {/* Stars */}
              <div className="text-yellow-400 text-lg mb-3">
                ⭐⭐⭐⭐⭐
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {review.review}
              </p>

              {/* Name */}
              <h4 className="font-semibold text-white">
                {review.name}
              </h4>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Testimonials;