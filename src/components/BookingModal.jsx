"use client";

import React from 'react';
import { Modal, Button, Input } from "@heroui/react";

export default function BookingModal({ isOpen, onClose, roomData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Success! Count will increment.");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" className="bg-[#121C1A] text-white border border-neutral-800 max-w-md mx-auto rounded-2xl">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-neutral-100">Book {roomData?.name || "Room"}</h3>
          <p className="text-xs text-neutral-400 mt-1">Fill out the form below to confirm your booking.</p>
        </div>
        
        <div className="space-y-4">
          <Input type="date" label="Select Date" labelPlacement="outside" required className="dark" />
          <Input type="number" label="Number of Guests" min={1} defaultValue={1} labelPlacement="outside" required className="dark" />
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="flat" color="danger" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button className="bg-[#F5C453] text-black font-semibold rounded-xl" type="submit">
            Confirm Booking
          </Button>
        </div>
      </form>
    </Modal>
  );
}