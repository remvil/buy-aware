import React from 'react';
import { Calendar, X, ChevronDown } from 'lucide-react';

function formatDateISO(date) {
	return date.toISOString().slice(0, 10);
}

function startOfWeek(d) {
	const date = new Date(d);
	const day = date.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1); // monday
	return new Date(date.setDate(diff));
}

export function FilterBar({ filters, onChange, companies = [] }) {
	const { startDate, endDate, type, company } = filters;

	const handleChange = (key, value) => {
		onChange({ ...filters, [key]: value });
	};

	const reset = () => onChange({ startDate: '', endDate: '', type: 'all', company: '' });

	return (
		<div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
			<div className="flex flex-col gap-3">
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
					<div className="flex items-center gap-2">
						<label className="text-sm text-gray-600 mr-2">Date</label>
						<input
							type="date"
							value={startDate || ''}
							onChange={(e) => handleChange('startDate', e.target.value)}
							className="border rounded-lg px-3 py-2 text-sm shadow-sm"
							aria-label="Start date"
						/>
						<span className="text-gray-400">—</span>
						<input
							type="date"
							value={endDate || ''}
							onChange={(e) => handleChange('endDate', e.target.value)}
							className="border rounded-lg px-3 py-2 text-sm shadow-sm"
							aria-label="End date"
						/>
					</div>

					<div className="flex items-center gap-3 sm:ml-auto">
						<div className="flex items-center gap-2">
							<label className="text-sm text-gray-600 mr-2">Tipo</label>
							<select
								value={type}
								onChange={(e) => handleChange('type', e.target.value)}
								className="border rounded-lg px-3 py-2 text-sm shadow-sm"
							>
								<option value="all">Tutti</option>
								<option value="meeting">Meeting</option>
								<option value="interview">Interview</option>
							</select>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={reset}
								className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
							>
								<X size={16} />
								Reset
							</button>
						</div>
					</div>
				</div>

				{type === 'interview' && (
					<div className="flex items-center gap-2">
						<label className="text-sm text-gray-600 mr-2">Azienda</label>
						<select
							value={company || ''}
							onChange={(e) => handleChange('company', e.target.value)}
							className="border rounded-lg px-3 py-2 text-sm shadow-sm"
						>
							<option value="">Tutte</option>
							{companies.map((comp) => (
								<option key={comp} value={comp}>
									{comp}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
		</div>
	);
}

export default FilterBar;
