"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AMENITIES = [
  "Whiteboard", "Projector", "Wi-Fi",
  "Power Outlets", "Quiet Zone", "Air Conditioning",
];

export default function AddRoomPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first");
      return router.push("/login");
    }

    // FormData থেকে সরাসরি নাও
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("imageUrl");
    const floor = formData.get("floor");
    const capacity = formData.get("capacity");
    const hourlyRate = formData.get("hourlyRate");
    const totalSlot = formData.get("totalSlot");      // নতুন ফিল্ড গ্র্যাব
    const bookingCount = formData.get("bookingCount");  // নতুন ফিল্ড গ্র্যাব

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allrooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          image,
          floor,
          capacity: Number(capacity),
          hourlyRate: Number(hourlyRate),
          totalSlot: Number(totalSlot || 0),        // ডাটাবেজে পাঠানোর লজিক
          bookingCount: Number(bookingCount || 0),  // ডাটাবেজে পাঠানোর লজিক
          amenities,
          createdBy: session?.user?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Room added successfully!");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-[#1a1f2e] rounded-2xl p-8">

        <h1 className="text-2xl font-semibold text-slate-200 mb-7">Add a new room</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Room Name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
              Room name <span className="text-amber-400">*</span>
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Free Zone Hangout"
              className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
              Description <span className="text-amber-400">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the room..."
              className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
              Image URL
            </label>
            <input
              name="imageUrl"
              placeholder="https://example.com/room.jpg"
              className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Floor + Capacity + Hourly Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Floor", name: "floor", type: "text", placeholder: "e.g. 3rd Floor" },
              { label: "Capacity", name: "capacity", type: "number", placeholder: "e.g. 5" },
              { label: "Hourly rate ($)", name: "hourlyRate", type: "number", placeholder: "e.g. 5" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  min={field.type === "number" ? "0" : undefined}
                  className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            ))}
          </div>

          {/* Total Slots + Booking Count (নতুন ইনপুট ফিল্ড রো) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                Total Slots
              </label>
              <input
                name="totalSlot"
                type="number"
                placeholder="e.g. 5"
                min="0"
                className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                Initial Booking Count
              </label>
              <input
                name="bookingCount"
                type="number"
                placeholder="e.g. 12"
                min="0"
                className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2.5 uppercase tracking-wide">
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES.map((item) => {
                const active = amenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition text-left
                      ${active
                        ? "border-amber-400 bg-amber-400/10 text-amber-300"
                        : "border-[#2d3548] bg-[#252b3b] text-slate-400 hover:border-slate-500"
                      }`}
                  >
                    <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition
                      ${active ? "bg-amber-400 border-amber-400" : "border-slate-600"}`}
                    >
                      {active && (
                        <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="#1a1100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Publishing..." : "Publish Room"}
          </button>

        </form>
      </div>
    </div>
  );
}