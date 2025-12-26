import React from 'react';
import { X } from 'lucide-react';

export function ConfirmModal({ isOpen, title, message, onCancel, onConfirm }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold">{title || 'Conferma'}</h3>
					<button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
						<X size={20} />
					</button>
				</div>

				<div className="text-sm text-gray-700 mb-6">{message}</div>

				<div className="flex gap-3">
					<button
						onClick={onCancel}
						className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
					>
						Annulla
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
					>
						Elimina
					</button>
				</div>
			</div>
		</div>
	);
}
