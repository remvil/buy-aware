import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function CalendarPage() {
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [selectedDateEvents, setSelectedDateEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch all events on mount
	useEffect(() => {
		fetchAllEvents();
	}, []);

	const fetchAllEvents = async () => {
		try {
			setLoading(true);
			// Fetch events with a large limit to get all events
			const res = await fetch(`${API_BASE}/events?page=1&limit=1000`);
			const data = await res.json();
			setEvents(data.events || []);
		} catch (error) {
			console.error('Errore nel caricamento eventi:', error);
		} finally {
			setLoading(false);
		}
	};

	// Get events for a specific date
	const getEventsForDate = (dateToCheck) => {
		return events.filter((event) => {
			const eventDate = new Date(event.date).toDateString();
			return eventDate === dateToCheck.toDateString();
		});
	};

	// Handle date selection
	const handleDateChange = (selectedDate) => {
		setDate(selectedDate);
		setSelectedDateEvents(getEventsForDate(selectedDate));
	};

	// Tile class for calendar cells
	const getTileClass = ({ date: tileDate }) => {
		const dayEvents = getEventsForDate(tileDate);
		if (dayEvents.length === 0) return '';

		const hasInterview = dayEvents.some((e) => e.type === 'interview');
		const hasMeeting = dayEvents.some((e) => e.type === 'meeting');

		if (hasInterview && hasMeeting) return 'has-both';
		if (hasInterview) return 'has-interview';
		if (hasMeeting) return 'has-meeting';
		return '';
	};

	// Tile content for calendar cells
	const getTileContent = ({ date: tileDate }) => {
		const dayEvents = getEventsForDate(tileDate);
		if (dayEvents.length === 0) return null;

		return (
			<div className="tile-content">
				<div className="event-dots">
					{dayEvents.map((event, idx) => (
						<div
							key={idx}
							className={`dot ${event.type === 'interview' ? 'interview-dot' : 'meeting-dot'}`}
							title={event.title}
						/>
					))}
				</div>
			</div>
		);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-2xl text-indigo-600">Caricamento...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-800 mb-8">Calendario Eventi</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Calendar */}
					<div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
						<Calendar
							value={date}
							onChange={handleDateChange}
							tileClassName={getTileClass}
							tileContent={getTileContent}
							className="custom-calendar"
							navigationLabel={({ date: navDate }) =>
								`${navDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}`
							}
						/>
					</div>

					{/* Events List for Selected Date */}
					<div className="bg-white rounded-2xl shadow-lg p-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							{date.toLocaleDateString('it-IT')}
						</h2>

						{selectedDateEvents.length === 0 ? (
							<p className="text-gray-500 text-center py-8">Nessun evento in questa data</p>
						) : (
							<div className="space-y-3">
								{selectedDateEvents.map((event) => (
									<div
										key={event._id}
										className={`p-3 rounded-lg border-l-4 ${event.type === 'interview'
												? 'bg-purple-50 border-purple-400'
												: 'bg-orange-50 border-orange-400'
											}`}
									>
										<h3 className="font-semibold text-gray-800 truncate">
											{event.title}
										</h3>
										<p className="text-sm text-gray-600">
											{event.time}
										</p>
										{event.type === 'interview' && (
											<>
												{event.stakeholder && (
													<p className="text-xs text-gray-500 mt-1">
														<strong>Partecipante:</strong> {event.stakeholder}
													</p>
												)}
												{event.recruiterName && (
													<p className="text-xs text-gray-500">
														<strong>Recruiter:</strong> {event.recruiterName}
													</p>
												)}
											</>
										)}
										{event.companyName && (
											<p className="text-xs text-gray-500 mt-1">
												<strong>Azienda:</strong> {event.companyName}
											</p>
										)}
										<span
											className={`inline-block text-xs mt-2 px-2 py-0.5 rounded-full ${event.type === 'interview'
													? 'bg-purple-200 text-purple-700'
													: 'bg-orange-200 text-orange-700'
												}`}
										>
											{event.type === 'interview' ? 'Colloquio' : 'Evento'}
										</span>
									</div>
								))}
							</div>
						)}

						<div className="mt-6 pt-4 border-t border-gray-200">
							<h3 className="text-sm font-semibold text-gray-700 mb-3">Legenda</h3>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-purple-400" />
									<span className="text-gray-600">Colloquio</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-orange-400" />
									<span className="text-gray-600">Evento</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarPage;
