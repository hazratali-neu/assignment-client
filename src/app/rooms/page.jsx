"use client";

import { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";

const STATIC_AMENITIES = [
  "Whiteboard", "Projector", "Wi-Fi", 
  "Power Outlets", "Quiet Zone", "Air Conditioning"
];

export default function RoomsPage() {
  const [allrooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // ফিল্টার ও সার্চ স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // অ্যামেনিটি চেক/আনচেক করার হ্যান্ডলার
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // রিসেট বাটন হ্যান্ডলার
  const handleReset = () => {
    setSearchQuery("");
    setSelectedAmenities([]);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        // কুয়েরি প্যারামিটার বিল্ড করা
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (selectedAmenities.length > 0) {
          params.append("amenities", selectedAmenities.join(","));
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allrooms?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch rooms");
        
        const data = await res.json();
        setAllRooms(data);
      } catch (err) {
        console.error("Error loading rooms:", err.message);
      } finally {
        setLoading(false);
      }
    };

    // ডেবোউন্স ইফেক্ট (টাইপিং শেষ হওয়ার ৪০০ms পর এপিআই কল হবে)
    const delayDebounceFn = setTimeout(() => {
      fetchRooms();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedAmenities]);

  return (
    <div className="min-h-screen bg-[#070d07] text-white py-10 px-4 sm:px-6 lg:px-12 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Text */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-1">Browse Rooms</h1>
          <p className="text-gray-400 text-sm">Browse the full catalog. Filter by amenity, price, or search by name.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ================= LEFT SIDE: FILTERS ================= */}
          <div className="bg-[#111c11] border border-gray-800/80 p-5 rounded-xl h-fit sticky top-24">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold tracking-wide">Refine</h2>
              <button 
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
              >
                ✕ Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-5">
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Search by name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">🔍</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Quiet Pod" 
                  className="w-full bg-[#070d07] border border-gray-700/60 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-yellow-600 text-gray-200"
                />
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="mb-5">
              <label className="block text-xs text-gray-400 mb-2 font-medium">Amenities</label>
              <div className="space-y-2">
                {STATIC_AMENITIES.map((amenity, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer hover:text-white transition">
                    <input 
                      type="checkbox" 
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="accent-[#cca43b] rounded bg-transparent border-gray-600 h-4 w-4"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

          
          </div>


          {/* ================= RIGHT SIDE: ROOMS GRID ================= */}
          <div className="lg:col-span-3">
            {/* Top Info Bar */}
            <div className="mb-4 text-sm text-gray-400">
              Showing <span className="text-white font-semibold">{allrooms?.length || 0}</span> rooms
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-400 flex items-center justify-center gap-2">
                <span className="animate-spin text-xl">⏳</span> Searching active database...
              </div>
            ) : allrooms?.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No rooms found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allrooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}