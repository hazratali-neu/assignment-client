import React from "react";
import Link from "next/link";
import Image from "next/image";

const RoomCard = ({ room }) => {
  const { _id, name, description, floor, capacity, hourlyRate, image, amenities } = room;

  const maxAmenities = 3;
  const displayedAmenities = amenities?.slice(0, maxAmenities) || [];
  const remainingCount = (amenities?.length || 0) - maxAmenities;

  return (
    <div className="bg-[#0f1a0f] rounded-xl overflow-hidden border border-gray-800 flex flex-col h-full">

      {/* Image */}
      <div className="h-48 w-full relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">

        <div>
          {/* Title + Price */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-lg font-serif font-bold tracking-wide line-clamp-1 text-gray-100">
              {name}
            </h3>

            <span className="bg-[#cca43b] text-black font-semibold text-xs px-2.5 py-1 rounded-full whitespace-nowrap">
              ${hourlyRate}/hr
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-xs md:text-sm mb-4 line-clamp-2 min-h-[40px]">
            {description}
          </p>

          {/* Floor + Capacity */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-4 pb-3 border-b border-gray-800">
            <span>🏢 {floor}</span>
            <span>👥 {capacity}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {displayedAmenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-[#223322] border border-gray-800 text-gray-300 text-[11px] px-2.5 py-0.5 rounded"
              >
                {amenity}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="bg-gray-800/80 text-[#cca43b] text-[11px] px-2 py-0.5 rounded font-medium">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/rooms/${_id}`}
          className="block w-full text-center bg-transparent border border-gray-600 hover:border-white text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm mt-auto"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default RoomCard;