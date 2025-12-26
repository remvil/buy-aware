import React, { useState } from 'react';
import { X, Info, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function EventModal({ isOpen, isEditing, event, onClose, onSave, processes = [], onCreateProcess }) {
	const [showMarkdownTooltip, setShowMarkdownTooltip] = useState(false);
	const [linkToProcess, setLinkToProcess] = useState(!!event?.processId);
	const [showCreateProcessForm, setShowCreateProcessForm] = useState(false);
	const [newProcessForm, setNewProcessForm] = useState({
		started_at: event?.date || '',
		closed_at: '',
		role: '',
		technologies: '',
		notes: '',
	});

	if (!isOpen) return null;

	const handleCreateProcess = async () => {
		if (!newProcessForm.role) {
			alert('Inserisci almeno il ruolo');
			return;
		}

		const processData = {
			started_at: newProcessForm.started_at,
			closed_at: newProcessForm.closed_at || undefined,
			role: newProcessForm.role,
			technologies: newProcessForm.technologies
				? newProcessForm.technologies.split(',').map((t) => t.trim())
				: [],
			notes: newProcessForm.notes,
			companyName: event.companyName,
		};

		const processId = await onCreateProcess(processData);
		if (processId) {
			onSave({ ...event, processId }, false);
			setShowCreateProcessForm(false);
			setNewProcessForm({
				started_at: event?.date || '',
				closed_at: '',
				role: '',
				technologies: '',
				notes: '',
			});
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-gray-800">
						{isEditing ? 'Modifica Evento' : 'Nuovo Evento'}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 p-1"
					>
						<X size={24} />
					</button>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Titolo
						</label>
						<input
							type="text"
							value={event.title}
							onChange={(e) =>
								onSave({ ...event, title: e.target.value }, false)
							}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
							placeholder="Es: Riunione importante"
						/>
					</div>

					{/* Timestamp Info */}
					{isEditing && event._id && (
						<div className="bg-gray-50 p-3 rounded text-xs text-gray-600 space-y-1">
							{event.created_at_date && event.created_at_time && (
								<div>
									<span className="font-semibold">Creato:</span> {event.created_at_date} {event.created_at_time}
								</div>
							)}
							{event.updated_date && event.updated_time && (
								<div>
									<span className="font-semibold">Ultimo aggiornamento:</span> {event.updated_date} {event.updated_time}
								</div>
							)}
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Data
						</label>
						<input
							type="date"
							value={event.date}
							onChange={(e) => onSave({ ...event, date: e.target.value }, false)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Ora
						</label>
						<input
							type="time"
							value={event.time}
							onChange={(e) => onSave({ ...event, time: e.target.value }, false)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Tipo
						</label>
						<select
							value={event.type}
							onChange={(e) => {
								const newType = e.target.value;
								const updated = { ...event, type: newType };
								// clear interview-only fields when switching away from interview
								if (newType !== 'interview') {
									updated.stakeholder = '';
									updated.recruiterName = '';
								}
								onSave(updated, false);
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
						>
							<option value="meeting">Evento</option>
							<option value="interview">Colloquio</option>
						</select>
					</div>

					{event.type === 'interview' && (
						<>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Partecipante/Stakeholder
								</label>
								<input
									type="text"
									value={event.stakeholder || ''}
									onChange={(e) =>
										onSave({ ...event, stakeholder: e.target.value }, false)
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									placeholder="Es: Giovanni Rossi"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Nome Recruiter
								</label>
								<input
									type="text"
									value={event.recruiterName || ''}
									onChange={(e) =>
										onSave({ ...event, recruiterName: e.target.value }, false)
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									placeholder="Es: Maria Bianchi"
								/>
							</div>
						</>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Nome Azienda
						</label>
						<input
							type="text"
							value={event.companyName || ''}
							onChange={(e) =>
								onSave({ ...event, companyName: e.target.value }, false)
							}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
							placeholder="Es: Company ltd"
						/>
					</div>

					<div>
						<div className="flex items-center gap-2 mb-2 relative">
							<label className="block text-sm font-medium text-gray-700">
								Note (Markdown)
							</label>
							<div className="relative">
								<button
									type="button"
									onMouseEnter={() => setShowMarkdownTooltip(true)}
									onMouseLeave={() => setShowMarkdownTooltip(false)}
									className="text-gray-400 hover:text-gray-600 p-0.5 transition-colors"
									title="Informazioni Markdown"
								>
									<Info size={16} />
								</button>

								{/* Floating Tooltip */}
								{showMarkdownTooltip && (
									<div className="absolute top-6 left-0 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-3 w-max z-50">
										<p className="font-semibold mb-2">Sintassi Markdown:</p>
										<ul className="space-y-1 text-xs">
											<li><code className="bg-gray-700 px-1.5 py-0.5 rounded">**testo**</code> = <strong>bold</strong></li>
											<li><code className="bg-gray-700 px-1.5 py-0.5 rounded">*testo*</code> = <em>italic</em></li>
											<li><code className="bg-gray-700 px-1.5 py-0.5 rounded">- elemento</code> = lista</li>
											<li><code className="bg-gray-700 px-1.5 py-0.5 rounded"># Titolo</code> = titolo</li>
										</ul>
									</div>
								)}
							</div>
						</div>
						<div className="space-y-2">
							<textarea
								value={event.notes || ''}
								onChange={(e) => onSave({ ...event, notes: e.target.value }, false)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-sm"
								placeholder="Supporta Markdown: **bold** *italic* - lista"
								rows="4"
							/>
							{event.notes && (
								<div className="bg-gray-50 p-3 rounded border border-gray-200">
									<p className="text-xs font-semibold text-gray-600 mb-2">Anteprima:</p>
									<div className="prose prose-sm max-w-none">
										<ReactMarkdown remarkPlugins={[remarkGfm]}>
											{event.notes}
										</ReactMarkdown>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Link to Process Section */}
					{event.type === 'interview' && (
						<div className="border-t pt-4 mt-4">
							<div className="flex items-center gap-2 mb-3">
								<input
									type="checkbox"
									id="linkProcess"
									checked={linkToProcess}
									onChange={(e) => {
										setLinkToProcess(e.target.checked);
										if (!e.target.checked) {
											onSave({ ...event, processId: '' }, false);
										}
									}}
									className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
								/>
								<label htmlFor="linkProcess" className="text-sm font-medium text-gray-700">
									Collega a Processo di Selezione
								</label>
							</div>

							{linkToProcess && (
								<div className="space-y-3 bg-gray-50 p-3 rounded">
									{processes.length > 0 && !showCreateProcessForm && (
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Processi Disponibili
											</label>
											<select
												value={event.processId || ''}
												onChange={(e) => onSave({ ...event, processId: e.target.value }, false)}
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
											>
												<option value="">Seleziona un processo...</option>
												{processes.map((p) => (
													<option key={p._id} value={p._id}>
														{p.role} @ {p.companyName} ({new Date(p.started_at).toLocaleDateString('it-IT')})
													</option>
												))}
											</select>
										</div>
									)}

									<button
										type="button"
										onClick={() => setShowCreateProcessForm(!showCreateProcessForm)}
										className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-white rounded transition-colors"
									>
										{showCreateProcessForm ? 'Annulla Nuovo Processo' : '+ Crea Nuovo Processo'}
										{showCreateProcessForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
									</button>

									{showCreateProcessForm && (
										<div className="space-y-2 bg-white p-3 rounded border border-gray-200">
											<div>
												<label className="block text-xs font-medium text-gray-700 mb-1">
													Data Inizio
												</label>
												<input
													type="date"
													value={newProcessForm.started_at}
													onChange={(e) =>
														setNewProcessForm({ ...newProcessForm, started_at: e.target.value })
													}
													className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
												/>
											</div>

											<div>
												<label className="block text-xs font-medium text-gray-700 mb-1">
													Ruolo (obbligatorio)
												</label>
												<input
													type="text"
													value={newProcessForm.role}
													onChange={(e) =>
														setNewProcessForm({ ...newProcessForm, role: e.target.value })
													}
													placeholder="Es: Frontend Engineer"
													className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
												/>
											</div>

											<div>
												<label className="block text-xs font-medium text-gray-700 mb-1">
													Tecnologie (separa con virgola)
												</label>
												<input
													type="text"
													value={newProcessForm.technologies}
													onChange={(e) =>
														setNewProcessForm({ ...newProcessForm, technologies: e.target.value })
													}
													placeholder="Es: React, TypeScript, Node.js"
													className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
												/>
											</div>

											<div>
												<label className="block text-xs font-medium text-gray-700 mb-1">
													Note
												</label>
												<textarea
													value={newProcessForm.notes}
													onChange={(e) =>
														setNewProcessForm({ ...newProcessForm, notes: e.target.value })
													}
													placeholder="Note opzionali"
													className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
													rows="2"
												/>
											</div>

											<button
												type="button"
												onClick={handleCreateProcess}
												className="w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded transition-colors"
											>
												Crea Processo
											</button>
										</div>
									)}
								</div>
							)}
						</div>
					)}
				</div>

				<div className="flex gap-3 mt-6">
					<button
						onClick={onClose}
						className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
					>
						Annulla
					</button>
					<button
						onClick={() => onSave(event, true)}
						className="flex-1 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-md"
					>
						{isEditing ? 'Aggiorna' : 'Salva'}
					</button>
				</div>
			</div>
		</div>
	);
}
