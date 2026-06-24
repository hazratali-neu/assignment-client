"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { Calendar, Clock, DollarSign, XCircle, ArrowLeft, Loader2 } from "lucide-react";

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // লোকাল আজকের তারিখ (YYYY-MM-DD ফরম্যাটে কম্পেয়ার করার জন্য)
  const todayStr = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to view your bookings");
      router.push("/login?redirect=/my-bookings");
      return;
    }

    async function fetchMyBookings() {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${session.user.id}`);
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.id) {
      fetchMyBookings();
    }
  }, [session, isPending, router]);

  // বুকিং ক্যানসেল হ্যান্ডলার
  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    setCancellingId(bookingId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/cancel/${bookingId}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Cancellation failed");

      toast.success("Booking cancelled successfully!");
      
      // লোকাল স্টেট আপডেট করে স্ট্যাটাস 'cancelled' করে দেওয়া
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status: "cancelled" } : b)
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-sm text-gray-400">Loading your secured reservations...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">My Bookings</h1>
            <p className="text-sm text-gray-400">Manage and track your active workspace nodes.</p>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 text-sm text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-xl transition"
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </Link>
        </div>

        {/* Empty State Requirements */}
        {bookings.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 bg-gray-950 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
              <Calendar size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-200">You have no bookings yet.</h3>
              <p className="text-xs text-gray-500">Explore our available verified workspace rooms and secure your slot today.</p>
            </div>
            <Link
              href="/rooms"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-500/10"
            >
              Browse Rooms
            </Link>
          </div>
        ) : (
          /* Bookings Card List / Table for Desktop */
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-950/60 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Room Node</th>
                    <th className="py-4 px-6">Schedule</th>
                    <th className="py-4 px-6">Costing</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-sm">
                  {bookings.map((booking) => {
                    const isConfirmed = booking.status !== "cancelled";
                    // ক্যানসেল বাটন কন্ডিশন: স্ট্যাটাস confirmed হতে হবে এবং ডেট আজকের বা তার পরের হতে হবে
                    const isFutureBooking = booking.date >= todayStr; 
                    const canCancel = isConfirmed && isFutureBooking;

                    return (
                      <tr key={booking._id} className="hover:bg-gray-950/20 transition-colors">
                        {/* Room Info */}
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-950 border border-gray-800 shrink-0">
                            <Image
                              src={booking.roomImage}
                              alt={booking.roomName}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-200 capitalize truncate max-w-[180px]">
                              {booking.roomName}
                            </p>
                            <p className="text-[11px] text-gray-500 font-mono">ID: {booking.roomId.slice(-6)}</p>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-4 px-6 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-300">
                            <Calendar size={13} className="text-gray-500" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                            <Clock size={13} className="text-gray-500" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                        </td>

                        {/* Total Cost */}
                        <td className="py-4 px-6 font-semibold text-gray-200">
                          <span className="inline-flex items-center text-emerald-400">
                            <DollarSign size={14} className="-mr-0.5" />
                            {booking.totalCost}
                          </span>
                        </td>

                        {/* Status Badges */}
                        <td className="py-4 px-6">
                          {isConfirmed ? (
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-lg">
                              Confirmed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-red-950/40 border border-red-900/50 text-red-400 rounded-lg">
                              Cancelled
                            </span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right">
                          {canCancel ? (
                            <button
                              disabled={cancellingId === booking._id}
                              onClick={() => handleCancelBooking(booking._id)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 text-red-400 px-3 py-1.5 rounded-lg transition disabled:opacity-40"
                            >
                              <XCircle size={14} />
                              {cancellingId === booking._id ? "Processing..." : "Cancel"}
                            </button>
                          ) : (
                            <span className="text-xs text-gray-600 font-medium">No actions available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}