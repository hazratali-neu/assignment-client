import RoomCard from "@/components/RoomCard";

// ডেটা ফেচিং ফাংশন (Next.js Server Component)
const getAllRooms = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allrooms`);
  return res.json();
};

const RoomsPage = async () => {
  const allrooms = await getAllRooms();
  const staticAmenities = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

  return (
    <div className="min-h-screen bg-[#070d07] text-white py-10 px-4 sm:px-6 lg:px-12 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Text */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-1">Browse Rooms</h1>
          <p className="text-gray-400 text-sm">Browse the full catalog. Filter by amenity, price, or search by name.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="bg-[#111c11] border border-gray-800/80 p-5 rounded-xl h-fit sticky top-24">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold tracking-wide">Refine</h2>
              <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition">
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
                  placeholder="e.g. Quiet Pod" 
                  className="w-full bg-[#070d07] border border-gray-700/60 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-yellow-600 text-gray-200"
                />
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="mb-5">
              <label className="block text-xs text-gray-400 mb-2 font-medium">Amenities</label>
              <div className="space-y-2">
                {staticAmenities.map((amenity, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer hover:text-white transition">
                    <input 
                      type="checkbox" 
                      className="accent-[#cca43b] rounded bg-transparent border-gray-600 h-4 w-4"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            {/* Hourly Rate Filter */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Hourly rate ($)</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full bg-[#070d07] border border-gray-700/60 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-yellow-600 text-gray-200"
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full bg-[#070d07] border border-gray-700/60 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-yellow-600 text-gray-200"
                />
              </div>
            </div>
          </div>


          {/* ================= RIGHT SIDE: ROOMS GRID ================= */}
          <div className="lg:col-span-3">
            {/* Top Info Bar */}
            <div className="mb-4 text-sm text-gray-400">
              Showing <span className="text-white font-semibold">{allrooms?.length || 0}</span> of <span className="text-white font-semibold">{allrooms?.length || 0}</span> rooms
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {allrooms?.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>

            {allrooms?.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No rooms found matching your criteria.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default RoomsPage;
