"use client";

import { X, XCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function CancelBookingModal({
booking,
onConfirm,
onClose,
isLoading,
}) {
if (!booking) return null;

return ( <div
   className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
   onClick={onClose}
 >
<div
className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5"
onClick={(e) => e.stopPropagation()}
> <button
       onClick={onClose}
       className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
     > <X size={18} /> </button>

```
    <div className="flex flex-col items-center text-center gap-3 pt-2">
      <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center">
        <AlertTriangle size={22} className="text-red-400" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white">
          Cancel Booking?
        </h2>

        <p className="text-sm text-gray-400">
          This action cannot be undone. Your reservation
          will be permanently cancelled.
        </p>
      </div>
    </div>

    <div className="bg-gray-950/60 border border-gray-800 rounded-xl px-4 py-3 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">Room</span>
        <span className="text-gray-200 font-medium">
          {booking.roomName}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Date</span>
        <span className="text-gray-200">
          {booking.date}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Time</span>
        <span className="text-gray-200">
          {booking.startTime} - {booking.endTime}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Total</span>
        <span className="text-emerald-400 font-semibold">
          ${booking.totalCost}
        </span>
      </div>
    </div>

    <div className="flex gap-3">
      <button
        onClick={onClose}
        disabled={isLoading}
        className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-xl"
      >
        Keep Booking
      </button>

      <button
        onClick={() => onConfirm(booking._id)}
        disabled={isLoading}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl"
      >
        {isLoading ? (
          <>
            <Loader2
              size={15}
              className="animate-spin"
            />
            Cancelling...
          </>
        ) : (
          <>
            <XCircle size={15} />
            Yes, Cancel
          </>
        )}
      </button>
    </div>
  </div>
</div>


);
}
