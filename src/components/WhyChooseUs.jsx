const WhyChooseUs = () => {
  const features = [
    {
      title: "Quiet Study Environment",
      desc: "Focused and distraction-free rooms designed for productive learning.",
      icon: "📚",
    },
    {
      title: "Flexible Booking",
      desc: "Book rooms hourly according to your study schedule.",
      icon: "⏰",
    },
    {
      title: "Modern Amenities",
      desc: "High-speed WiFi, charging ports, AC and comfortable seating.",
      icon: "💻",
    },
    {
      title: "Affordable Pricing",
      desc: "Budget-friendly rates suitable for students.",
      icon: "💰",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium mb-2">
            ✨ Why Students Love Us
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Why Choose StudyNook?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Experience a productive and comfortable learning environment
            designed specifically for students and professionals.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-3">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;