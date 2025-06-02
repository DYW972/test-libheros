import { TModalProps } from '../../../types/Modal';

export default function Modal({
  title,
  message,
  onCancel,
  onConfirm,
}: TModalProps) {
  return (
    <div className="fixed inset-0 bg-indigo-50/75 flex items-center justify-center z-20">
      <div className="bg-white rounded shadow-lg max-w-sm w-full p-4">
        <h4 className="text-lg font-semibold mb-4">{title}</h4>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700`}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
