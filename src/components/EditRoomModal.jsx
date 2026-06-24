"use client";

import React, { useState, useEffect } from 'react';
// Textarea এখান থেকে রিমুভ করা হয়েছে যাতে বিল্ড এরর না আসে
import { Modal, Button, Input } from "@heroui/react";

export default function EditRoomModal({ isOpen, onClose, roomData }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (roomData) {
      setFormData({
        name: roomData.name || '',
        price: roomData.price || '',
        description: roomData.description || ''
      });
    }
  }, [roomData]);

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Room successfully updated!");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" className="bg-[#121C1A] text-white border border-neutral-800 max-w-lg mx-auto rounded-2xl">
      <form onSubmit={handleUpdate} className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-neutral-100">Edit Room Details</h3>
          <p className="text-xs text-neutral-400 mt-1">Modify the existing information of your room listing.</p>
        </div>

        <div className="space-y-4">
          <Input 
            label="Room Title" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            labelPlacement="outside" 
            required 
            className="dark"
          />
          <Input 
            type="number" 
            label="Price per Hour ($)" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            labelPlacement="outside" 
            required 
            className="dark"
          />
          
          {/* বিল্ড এরর এড়াতে Tailwind দিয়ে ডিজাইন করা কাস্টম Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-200">Description</label>
            <textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required 
              rows={4}
              className="w-full bg-[#172220] border border-neutral-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors resize-none dark"
              placeholder="Enter room description..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="flat" color="default" onClick={onClose} className="text-white rounded-xl">
            Cancel
          </Button>
          <Button color="success" type="submit" className="text-white rounded-xl">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}