import React, { useState } from 'react';
import { Calendar, Terminal, Edit2, Trash2, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function EventItem({ event, onEdit, onRequestDelete }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleRequestDelete = () => {
		// ask parent to open a confirm modal
		if (typeof onRequestDelete === 'function') onRequestDelete(event);
	};

	// Helper to format ISO timestamp to date and time strings
	const formatTimestamp = (isoString) => {
		if (!isoString) return { date: '', time: '' };
		const date = new Date(isoString);
		const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
		const timeStr = date.toTimeString().split(' ')[0].slice(0, 5); // HH:mm
		return { date: dateStr, time: timeStr };
	};

	// Get created and updated timestamps
	const createdTs = formatTimestamp(event.createdAt);
	const updatedTs = formatTimestamp(event.updatedAt);

	return (
		<div className={`bg-white rounded-xl shadow-md transition-all ${isExpanded ? 'shadow-lg' : 'hover:shadow-lg'}`}>
			{/* Header / Toggle Row */}
			<div className="flex items-center gap-2 p-5">
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0 transition-colors"
					title={isExpanded ? 'Riduci' : 'Espandi'}
				>
					{isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
				</button>

				<div className="flex items-center gap-4 flex-1 min-w-0">
					<div
						className={`p-3 rounded-lg flex-shrink-0 ${event.type === 'meeting' ? 'bg-orange-200' : 'bg-purple-200'
							}`}
					>
						{event.type === 'meeting' ? (
							<Calendar className="text-orange-600" size={24} />
						) : (
							<Terminal className="text-green-600" size={24} />
						)}
					</div>

					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-lg text-gray-800 truncate">{event.title}</h3>
						<div className="flex gap-4 text-sm text-gray-500 leading-tight flex-wrap">
							<span className="flex items-center gap-1 whitespace-nowrap">
								<Calendar size={14} />
								{new Date(event.date).toLocaleDateString('it-IT')}
							</span>
							<span className="flex items-center gap-1 whitespace-nowrap">
								<Clock size={14} />
								{event.time}
							</span>
							<span
								className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${event.type === 'meeting'
									? 'bg-orange-200 text-orange-700'
									: 'bg-purple-200 text-green-700'
									}`}
							>
								{event.type === 'meeting' ? 'Evento' : 'Colloquio'}
							</span>
						</div>

					</div>
				</div>

				<div className="flex gap-2 flex-shrink-0">
					<button
						onClick={() => onEdit(event)}
						className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-all"
						title="Modifica evento"
					>
						<Edit2 size={20} />
					</button>
					<button
						onClick={handleRequestDelete}
						className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
						title="Elimina evento"
					>
						<Trash2 size={20} />
					</button>
				</div>
			</div>

			{/* Expanded Details */}
			{isExpanded && (
				<div className="border-t border-gray-200 px-5 py-4 bg-gray-50 space-y-4">
					<div className="bg-white p-3 rounded-lg border border-gray-200">
						<p className="text-sm font-semibold text-gray-700 mb-2">Dettagli</p>
						{/* Partecipanti */}
						{(event.type === 'interview' && event.stakeholder) || event.recruiterName || event.companyName ? (
							<div className="flex gap-3 text-xs text-gray-600 mt-1 leading-tight flex-wrap">
								{event.type === 'interview' && event.stakeholder && (
									<span className="whitespace-nowrap">
										<strong>Partecipante:</strong> {event.stakeholder}
									</span>
								)}
								{event.recruiterName && (
									<span className="whitespace-nowrap">
										<strong>Recruiter:</strong> {event.recruiterName}
									</span>
								)}
								{event.companyName && (
									<span className="whitespace-nowrap">
										<strong>Azienda:</strong> {event.companyName}
									</span>
								)}
							</div>
						) : null}
						{/* Timestamps */}

						<div className="flex gap-3 text-xs text-gray-600 mt-1 leading-tight flex-wrap">
							{createdTs.date && createdTs.time && (
								<span className="whitespace-nowrap">
									<span className="font-semibold">Creato:</span> {createdTs.date} {createdTs.time}
								</span>
							)}
							{updatedTs.date && updatedTs.time && (
								<span className="whitespace-nowrap">
									<span className="font-semibold">Ultimo aggiornamento:</span> {updatedTs.date} {updatedTs.time}
								</span>
							)}
						</div>
					</div>
					{/* Notes */}
					{event.notes && (
						<div className="bg-white p-4 rounded-lg border border-gray-200">
							<p className="text-sm font-semibold text-gray-700 mb-2">Note</p>
							<div className="prose prose-sm max-w-none">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{event.notes}
								</ReactMarkdown>
							</div>
						</div>
					)}
					{!event.notes && event.type === 'meeting' && (
						<p className="text-sm text-gray-500 italic">Nessuna nota aggiunta</p>
					)}
				</div>
			)}
		</div>
	);
}
