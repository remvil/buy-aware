import React, { useRef, useEffect } from 'react';
import { Calendar, Loader } from 'lucide-react';
import { EventItem } from './EventItem';

export function EventList({ events, onEdit, onDelete, onRequestDelete, onLoadMore, isLoadingMore, hasMore }) {
	const endRef = useRef(null);

	useEffect(() => {
		if (!hasMore || isLoadingMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					onLoadMore?.();
				}
			},
			{ threshold: 0.1 }
		);

		if (endRef.current) {
			observer.observe(endRef.current);
		}

		return () => {
			if (endRef.current) observer.unobserve(endRef.current);
		};
	}, [hasMore, isLoadingMore, onLoadMore]);

	if (events.length === 0) {
		return (
			<div className="bg-white rounded-xl shadow-md p-12 text-center">
				<Calendar className="mx-auto text-gray-300 mb-4" size={64} />
				<p className="text-gray-500 text-lg">Nessun evento in agenda</p>
				<p className="text-gray-400 text-sm mt-2">
					Clicca su "Nuovo" per aggiungere un evento
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{events.map((event) => (
				<EventItem
					key={event._id}
					event={event}
					onEdit={onEdit}
					onRequestDelete={onRequestDelete || onDelete}
				/>
			))}

			{/* Infinite scroll trigger */}
			<div ref={endRef} className="py-4 text-center">
				{isLoadingMore && (
					<div className="flex items-center justify-center gap-2 text-indigo-600">
						<Loader size={18} className="animate-spin" />
						<span className="text-sm">Caricamento...</span>
					</div>
				)}
				{!hasMore && events.length > 0 && (
					<p className="text-sm text-gray-500">Fine degli eventi</p>
				)}
			</div>
		</div>
	);
}
