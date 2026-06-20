import React from 'react';

const RoomDetailCard = ({ room }) => {
  const { name, description, image, floor, capacity, hourlyRate, amenities } = room || {};

  return (
    <div className="w-full max-w-5xl bg-[#111c14] text-gray-200 border border-[#223426] shadow-2xl rounded-2xl overflow-hidden mx-auto">
      {/* Flexbox Layout for Responsiveness:
        - Mobile: flex-col (Image upore, Text niche)
        - Tablet/Desktop: lg:flex-row (Side by side)
      */}
      <div className="flex flex-col lg:flex-row min-h-[400px]">
        
        {/* Left Side: Large Preview Image */}
        <div className="lg:w-1/2 relative h-64 sm:h-80 lg:h-auto bg-neutral-800">
          <img
            src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#e4a843] text-black text-sm font-bold px-3 py-1.5 rounded-md shadow-md">
            ${hourlyRate}/hour
          </div>
        </div>

        {/* Right Side: Detailed Specifications */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          {/* Header Info */}
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#62b67d] uppercase bg-[#192a1e] px-2.5 py-1 rounded">
              Room Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize mt-3">
              {name || "Unnamed Premium Room"}
            </h1>
            
            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
              <div className="bg-[#16251b] px-3 py-2 rounded-lg border border-[#23412c]">
                📁 <span className="text-gray-400">Floor:</span> <strong className="text-white">{floor || "N/A"}</strong>
              </div>
              <div className="bg-[#16251b] px-3 py-2 rounded-lg border border-[#23412c]">
                👥 <span className="text-gray-400">Capacity:</span> <strong className="text-white">{capacity || 0} People</strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-md font-semibold text-white mb-2">Description</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {description || "No extensive description text available for this space at the moment."}
            </p>
          </div>

          {/* Amenities Mapping */}
          {amenities && amenities.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-white mb-2">Included Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <span 
                    key={index} 
                    className="bg-[#192a1e] text-xs sm:text-sm text-[#62b67d] px-3 py-1.5 rounded-lg border border-[#23412c] font-medium"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action Button */}
          <div className="pt-4 border-t border-[#223426] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-400">Total rate calculated based on usage</p>
              <p className="text-xl font-bold text-[#e4a843]">${hourlyRate}.00 <span className="text-xs font-normal text-gray-400">/ hr</span></p>
            </div>
            <button className="btn w-full sm:w-auto px-8 bg-[#e4a843] hover:bg-[#c99235] text-black border-none font-bold rounded-xl transition-all duration-200">
              Book This Room Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomDetailCard;