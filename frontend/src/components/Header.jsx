import React from 'react';
import { Calendar, Plus, List } from 'lucide-react';

export function Header({ onNewEvent, currentView = 'list', onViewChange }) {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="bg-indigo-500 p-3 rounded-xl">
						<Calendar className="text-white" size={28} />
					</div>
					<div>
						<h1 className="text-3xl font-bold text-gray-800">My Agenda</h1>
						<p className="text-gray-500 text-sm">Gestisci eventi e colloqui</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					{onViewChange && (
						<div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
							<button
								onClick={() => onViewChange('list')}
								className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${currentView === 'list'
									? 'bg-white shadow-sm text-indigo-600'
									: 'text-gray-600 hover:text-gray-800'
									}`}
							>
								<List size={18} />
								Lista
							</button>
							<button
								onClick={() => onViewChange('calendar')}
								className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${currentView === 'calendar'
									? 'bg-white shadow-sm text-indigo-600'
									: 'text-gray-600 hover:text-gray-800'
									}`}
							>
								<Calendar size={18} />
								Calendario
							</button>
						</div>
					)}
					<button
						onClick={onNewEvent}
						className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
					>
						<Plus size={20} />
						Nuovo
					</button>
				</div>
			</div>
		</div>
	);
}
