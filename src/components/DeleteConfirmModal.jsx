"use client";

import React from 'react';
import { Modal, Button } from "@heroui/react";

export default function DeleteConfirmModal({ isOpen, onClose, roomId }) {
  const handleDelete = () => {
    alert(`Room ${roomId} permanently deleted.`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" className="bg-[#1A1212] text-white border border-red-900/30 max-w-md mx-auto rounded-2xl">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-red-400">Confirm Permanent Deletion</h3>
        </div>

        <div>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Are you absolutely sure you want to delete this room? This action cannot be undone and all data will be permanently removed from the system.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="flat" className="bg-neutral-800 text-white rounded-xl" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" className="rounded-xl" onClick={handleDelete}>
            Permanently Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}