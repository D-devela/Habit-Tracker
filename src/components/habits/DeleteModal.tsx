'use client';

import React, { useEffect, useRef } from 'react';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Delete Habit</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this habit? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            data-testid="confirm-delete-button"
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}