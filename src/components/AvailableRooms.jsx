
// import RoomCard from './RoomCard'; // পাথ ঠিকঠাক চেক করে নিবেন

import RoomCard from "@/components/RoomCard";

const getData=async()=>{
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`)
    return await res.json();
}
const AvailableRooms =async () => {
  
 const rooms=await getData();
//  console.log(rooms);
  return (
    <section className="bg-[#0b130b] py-16 px-4 sm:px-8 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              Available Study Rooms
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Hand-picked rooms recently added to StudyNook.
            </p>
          </div>
          <button className="border border-gray-600 hover:border-white text-white text-xs md:text-sm px-4 py-2 rounded-lg transition-all">
            View all rooms
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rooms.map(room => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AvailableRooms;