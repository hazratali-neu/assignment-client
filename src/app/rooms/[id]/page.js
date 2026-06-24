"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; 
import { toast } from "react-toastify";
import {
  MapPin,
  Calendar,
  DollarSign,
  Layers,
  Users,
  ShieldCheck,
  Edit,
  Trash2,
  ArrowLeft,
  CheckSquare,
  Square,
  X
} from "lucide-react";
import { getRoomDetails } from "@/lib/data"; 

const ALL_AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning"
];

export default function RoomDetailsPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // মডালগুলো ওপেন/ক্লোজ করার স্টেট
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // বাটনের লোডিং স্টেট
  const [bookingLoading, setBookingLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // বুকিং ফর্মের স্টেট
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  // এডিট ফর্মের স্টেট (ইনপুট ফিল্ডের ডাটা রাখার জন্য)
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editFloor, setEditFloor] = useState("");
  const [editCapacity, setEditCapacity] = useState("");
  const [editHourlyRate, setEditHourlyRate] = useState("");
  const [editTotalSlot, setEditTotalSlot] = useState("");
  const [editAmenities, setEditAmenities] = useState([]);

  const todayLocal = new Date().toLocaleDateString('en-CA'); 

  // ডাটাবেজ থেকে রুমের তথ্য লোড করার ফাংশন
  const fetchRoom = async () => {
    try {
      const resolvedParams = await params;
      const data = await getRoomDetails(resolvedParams.id);
      setRoom(data);
      
      // রুমের ডাটা লোড হওয়ার পর এডিট ফর্মের ইনপুটে ডিফল্ট ভ্যালু বসানো
      if (data) {
        setEditName(data.name || "");
        setEditDescription(data.description || "");
        setEditImage(data.image || "");
        setEditFloor(data.floor || "");
        setEditCapacity(data.capacity || "");
        setEditHourlyRate(data.hourlyRate || "");
        setEditTotalSlot(data.totalSlot || "");
        setEditAmenities(data.amenities || []);
      }
    } catch (err) {
      toast.error("Failed to load room details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading room details engine...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Room not found!
      </div>
    );
  }

  const isLoggedIn = !!session?.user;
  const isOwner = session?.user?.id === room.createdBy; // অনার কিনা চেক

  const startHour = startTime ? parseInt(startTime.split(":")[0]) : 0;
  const endHour = endTime ? parseInt(endTime.split(":")[0]) : 0;
  const totalCost = startTime && endTime ? (endHour - startHour) * room.hourlyRate : 0;

  // এডিট করার সময় অ্যামেনিটিজে ক্লিক করলে টিক দেওয়া বা তোলার ফাংশন
  const handleEditAmenityToggle = (amenity) => {
    setEditAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // ৪.৪ রুম আপডেট সাবমিট করার ফাংশন (PATCH)
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allrooms/${room._id}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id, // অনার ভেরিফিকেশনের জন্য আইডি পাঠানো হচ্ছে
          name: editName,
          description: editDescription,
          image: editImage,
          floor: editFloor,
          capacity: editCapacity,
          hourlyRate: editHourlyRate,
          totalSlot: editTotalSlot,
          amenities: editAmenities
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update room");

      toast.success("Room updated successfully");
      setIsEditModalOpen(false); // মডাল বন্ধ করা
      fetchRoom(); // পেজের ডাটা নতুন করে রিলোড করা
    } catch (err) {
      toast.error(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // ৪.৫ রুম ডিলিট করার ফাংশন
  const handleDeleteRoom = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allrooms/${room._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user?.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete room");

      toast.success("Room deleted successfully");
      router.push("/my-listings"); // ডিলিট শেষে মাই লিস্টিং পেজে নিয়ে যাবে
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  // বুকিং সাবমিট করার ফাংশন
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room._id,
          userId: session?.user?.id,
          date: bookingDate,
          startTime,
          endTime,
          totalCost, 
          specialNote
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      toast.success("Room booked successfully!");
      setIsBookModalOpen(false);
      setBookingDate("");
      setStartTime("");
      setEndTime("");
      setSpecialNote("");

      setRoom(prev => ({ ...prev, bookingCount: (prev.bookingCount || 0) + 1 }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/rooms" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* রুমের মূল কার্ড */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-72 md:h-96 w-full bg-gray-950 overflow-hidden">
            <Image
              src={room.image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
              alt={room.name}
              fill
              unoptimized
              className="w-full h-full object-cover"
            />
            <span className="absolute top-6 right-6 bg-gray-950/80 backdrop-blur-md text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-800 flex items-center gap-1.5">
              <Users size={13} /> Max Seats: {room.capacity} Persons
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight capitalize">{room.name}</h1>
                <p className="text-xs font-medium text-blue-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Verified Resource Node
                </p>
              </div>

              {/* শুধু অনার হলে এই বাটন দুটি দেখা যাবে */}
              {isOwner && (
                <div className="flex items-center gap-2 bg-gray-950/50 p-1.5 rounded-xl border border-gray-800">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 text-red-400 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>

            <hr className="border-gray-800" />

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-300">Description</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{room.description}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300">Selected Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_AMENITIES_OPTIONS.map((option) => {
                  const isSelected = room.amenities?.includes(option);
                  return (
                    <div key={option} className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs transition-all ${isSelected ? "bg-blue-950/20 border-blue-900/50 text-blue-300 font-medium" : "bg-gray-950/10 border-gray-900/40 text-gray-600 line-through decoration-gray-950"}`}>
                      {isSelected ? <CheckSquare size={14} className="text-blue-500 shrink-0" /> : <Square size={14} className="text-gray-800 shrink-0" />}
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-950/40 p-4 rounded-2xl border border-gray-800/60 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500 shrink-0" /> <span className="truncate capitalize">{room.floor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-gray-500 shrink-0" /> <span>{room.totalSlot || 0} Active Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500 shrink-0" /> <span className="text-emerald-400 font-medium">Total Bookings: {room.bookingCount || 0}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-800/60">
              <div>
                <p className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Hourly Cost</p>
                <p className="text-2xl font-black text-white flex items-center">
                  <DollarSign size={20} className="text-emerald-500 -ml-1" /> <span>{room.hourlyRate}<span className="text-sm text-gray-500 font-normal"> /hr</span></span>
                </p>
              </div>

              {isLoggedIn ? (
                <button onClick={() => setIsBookModalOpen(true)} className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/10">
                  Book Now
                </button>
              ) : (
                <Link href={`/login?redirect=/rooms/${room._id}`} className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-[0.98] border border-gray-700">
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          মডাল ১: এডিট রুম ফর্ম মডাল (Edit Room Modal - PATCH)
         ========================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#1a1f2e] border border-gray-800 w-full max-w-xl rounded-2xl p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Edit size={18} className="text-blue-500"/> Update Room Info</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition"><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateRoom} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Room Name</label>
                  <input type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Floor No</label>
                  <input type="text" required value={editFloor} onChange={(e) => setEditFloor(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description</label>
                <textarea rows={2} required value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Image URL (Optional Change)</label>
                <input type="url" value={editImage} onChange={(e) => setEditImage(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Capacity</label>
                  <input type="number" required value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Hourly Rate ($)</label>
                  <input type="number" required value={editHourlyRate} onChange={(e) => setEditHourlyRate(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Total Slots</label>
                  <input type="number" required value={editTotalSlot} onChange={(e) => setEditTotalSlot(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_AMENITIES_OPTIONS.map((item) => (
                    <label key={item} className="flex items-center gap-2 bg-[#252b3b] p-2 rounded-lg border border-[#2d3548] text-xs text-gray-300 cursor-pointer hover:text-white transition">
                      <input type="checkbox" checked={editAmenities.includes(item)} onChange={() => handleEditAmenityToggle(item)} className="accent-blue-500 h-3.5 w-3.5" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2.5 rounded-xl text-sm transition">Cancel</button>
                <button type="submit" disabled={editLoading} className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl text-sm transition disabled:opacity-50">
                  {editLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          মডাল ২: রুম বুকিং ফর্ম মডাল (Booking Modal)
         ========================================================= */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1f2e] border border-gray-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Book: {room.name}</h2>
              <button onClick={() => setIsBookModalOpen(false)} className="text-gray-400 hover:text-white transition"><X size={20} /></button>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Select Date</label>
                <input type="date" required min={todayLocal} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Start Time</label>
                  <select required value={startTime} onChange={(e) => { setStartTime(e.target.value); setEndTime(""); }} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition">
                    <option value="">Select</option>
                    {Array.from({ length: 13 }, (_, i) => { const hour = 8 + i; const fHour = hour < 10 ? `0${hour}:00` : `${hour}:00`; return <option key={hour} value={fHour}>{fHour}</option>; })}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">End Time</label>
                  <select required disabled={!startTime} value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition disabled:opacity-40">
                    <option value="">Select</option>
                    {Array.from({ length: 14 }, (_, i) => 8 + i).filter((hour) => startTime && hour > parseInt(startTime.split(":")[0])).map((hour) => { const fHour = hour < 10 ? `0${hour}:00` : `${hour}:00`; return <option key={hour} value={fHour}>{fHour}</option>; })}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Special Note (Optional)</label>
                <textarea value={specialNote} onChange={(e) => setSpecialNote(e.target.value)} placeholder="Any special requirements..." rows={2} className="w-full bg-[#252b3b] border border-[#2d3548] rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none" />
              </div>
              <div className="bg-gray-950/40 p-4 rounded-xl border border-gray-800 text-sm text-gray-400 space-y-1">
                <div className="flex justify-between"><span>Hourly Rate:</span><span className="text-white">${room.hourlyRate} / hr</span></div>
                <div className="flex justify-between border-t border-gray-800/60 pt-1 mt-1 font-semibold text-base"><span className="text-gray-300">Total Cost:</span><span className="text-emerald-400">${totalCost}</span></div>
              </div>
              <button type="submit" disabled={bookingLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
                {bookingLoading ? "Checking Availability..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          মডাল ৩: ডিলিট কনফার্মেশন মডাল (Delete Modal)
         ========================================================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1f2e] border border-red-900/30 w-full max-w-sm rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-red-950/50 border border-red-900/50 text-red-400 rounded-full flex items-center justify-center mx-auto"><Trash2 size={22} /></div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Are you absolutely sure?</h2>
              <p className="text-xs text-gray-400">This action cannot be undone. The room data will be permanently deleted from our assets server.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-xl text-sm transition">Cancel</button>
              <button onClick={handleDeleteRoom} disabled={deleteLoading} className="w-1/2 bg-red-600 hover:bg-red-500 text-white font-medium py-2.5 rounded-xl text-sm transition disabled:opacity-50">
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}