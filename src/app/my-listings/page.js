import RoomCard from "@/components/RoomCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const metadata = {
  title: "My Listings",
};

const getDataListing = async (userId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/my-rooms/${userId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

const MyListingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ❌ not logged in
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-lg text-gray-400">Please login first</h2>
      </div>
    );
  }

  const listingData = await getDataListing(session.user.id);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          My Listings
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Manage all your rooms from here
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Empty State */}
        {listingData?.rooms?.length === 0 ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <h2 className="text-xl text-gray-500">
              No rooms found
            </h2>
          </div>
        ) : (
          <div className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-3
          ">
            {listingData?.rooms?.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyListingPage;