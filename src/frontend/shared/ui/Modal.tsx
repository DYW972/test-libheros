import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}
export default function Modal({
  title,
  message,
  onCancel,
  onConfirm,
  isOpen,
}: ModalProps & { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 bg-indigo-50/75 flex items-center justify-center z-20"
    >
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 transform scale-110 max-h-[90vh] overflow-y-auto">
        <h4
          id="modal-title"
          className="text-lg font-semibold mb-4 break-words whitespace-normal"
        >
          {title}
        </h4>
        <p
          id="modal-description"
          className="mb-6 break-words whitespace-normal"
        >
          {message}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer"
            aria-label="Cancel action"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 cursor-pointer"
            aria-label="Confirm delete"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
