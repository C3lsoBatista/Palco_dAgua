import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';

export default function Index({ audits, filters }) {
    const { data: items, current_page, per_page, total, last_page } = audits;

    // Filters state
    const initialSearch = filters?.search || '';
    const sortField = filters?.sortField || 'created_at';
    const sortDirection = filters?.sortDirection || 'desc';
    const dateRange = parseInt(filters?.dateRange) || 4; // default 4 = 'Todo o tempo'

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [expandedRows, setExpandedRows] = useState([]);
    const [isDateOpen, setIsDateOpen] = useState(false);

    const dateOptions = [
        { id: 0, label: 'Hoje' },
        { id: 1, label: 'Últimos 7 Dias' },
        { id: 2, label: 'Último Mês' },
        { id: 3, label: 'Últimos 12 Meses' },
        { id: 4, label: 'Todo o tempo' },
    ];

    const toggleRow = (id) => {
        setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    };

    const updateFilters = (newFilters) => {
        router.get(route('auditoria.index'), {
            search: searchQuery,
            sortField,
            sortDirection,
            dateRange: dateRange,
            ...newFilters
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDateChange = (id) => {
        setIsDateOpen(false);
        updateFilters({ dateRange: id, page: 1 });
    };

    // Debounce effect para a barra de pesquisa
    useEffect(() => {
        if (searchQuery === (filters?.search || '')) return;
        const timer = setTimeout(() => { updateFilters({ search: searchQuery, page: 1 }); }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Ordenação
    const handleSort = (field) => {
        const direction = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
        updateFilters({ sortField: field, sortDirection: direction, page: 1 });
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <span className="opacity-0 group-hover:opacity-40 ml-1 transition-opacity text-[10px]">↕</span>;
        return <span className="text-indigo-500 ml-1 font-bold text-[10px]">{sortDirection === 'asc' ? '▲' : '▼'}</span>;
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';

    // Helper para traduzir eventos da auditoria
    const translateEvent = (event) => {
        const map = { created: 'CRIOU', updated: 'ATUALIZOU', deleted: 'APAGOU', restored: 'RECUPEROU' };
        return map[event] || event.toUpperCase();
    };

    const getEventColor = (event) => {
        const map = { created: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20', updated: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20', deleted: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20', restored: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20' };
        return map[event] || 'bg-slate-100 text-slate-700 dark:bg-slate-700';
    };

    return (
        <AuthenticatedLayout>
            <Head title="Auditorias do Sistema" />

            <div className="mb-8 px-4 sm:px-0 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold tracking-tight uppercase">Auditoria de Sistema</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Registo de todas as ações importantes feitas no sistema.</p>
                </div>
            </div>

            {/* Barra de Filtros */}
            <div className="mb-5 px-4 sm:px-0 font-medium">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 fill-current text-slate-400" viewBox="0 0 16 16"><path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" /><path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" /></svg>
                        </div>
                        <input
                            type="search"
                            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 focus:border-indigo-500 py-2.5 pl-10 pr-4 rounded-lg shadow-sm text-sm font-medium transition-colors"
                            placeholder="Procurar utilizador, evento ou registo..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="relative shrink-0">
                        <button className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 py-2.5 px-4 rounded-lg shadow-sm w-full sm:w-auto h-full flex justify-between items-center" onClick={() => setIsDateOpen(!isDateOpen)}>
                            <div className="flex items-center">
                                <svg className="mr-2 fill-current text-slate-400 w-4 h-4" viewBox="0 0 16 16"><path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" /><path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" /></svg>
                                <span className="text-sm font-semibold">{dateOptions.find(o => o.id === dateRange)?.label}</span>
                            </div>
                            <svg className="ml-2 fill-current text-slate-400 w-3 h-3" viewBox="0 0 11 7"><path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" /></svg>
                        </button>
                        {isDateOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsDateOpen(false)}></div>
                                <div className="absolute top-full right-0 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg z-50 mt-1 overflow-hidden">
                                    {dateOptions.map((opt) => (
                                        <button key={opt.id} className={`flex items-center w-full text-left text-xs py-2.5 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${dateRange === opt.id ? 'text-indigo-500 font-bold bg-slate-50 dark:bg-slate-700/50' : 'text-slate-600 dark:text-slate-300'}`} onClick={() => handleDateChange(opt.id)}>{opt.label}</button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabela (Estilo Mockup Arredondado) */}
            <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mx-4 sm:mx-0">
                {/* Header Integrado na Tabela */}
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        Todos os Registos
                        <span className="text-slate-400 font-medium text-sm">{total}</span>
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300 text-sm border-collapse">
                        <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left tracking-wider cursor-pointer group select-none hover:text-slate-600 dark:hover:text-slate-300 w-px" onClick={() => handleSort('id')}>
                                    # <SortIcon field="id" />
                                </th>
                                <th className="px-4 py-3 text-center tracking-wider cursor-pointer group select-none hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap" onClick={() => handleSort('created_at')}>
                                    Timestamp <SortIcon field="created_at" />
                                </th>
                                <th className="px-4 py-3 text-center tracking-wider cursor-pointer group select-none hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap" onClick={() => handleSort('user_id')}>
                                    Autor <SortIcon field="user_id" />
                                </th>
                                <th className="px-4 py-3 text-center tracking-wider cursor-pointer group select-none hover:text-slate-600 dark:hover:text-slate-300" onClick={() => handleSort('event')}>
                                    Evento <SortIcon field="event" />
                                </th>
                                <th className="px-4 py-3 text-center tracking-wider cursor-pointer group select-none hover:text-slate-600 dark:hover:text-slate-300" onClick={() => handleSort('auditable_type')}>
                                    Registo Afetado <SortIcon field="auditable_type" />
                                </th>
                                <th className="px-4 py-3 w-px"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {items.length > 0 ? (
                                items.map((audit) => {
                                    const modelName = audit.auditable_type.split('\\').pop();
                                    const isExpanded = expandedRows.includes(audit.id);
                                    return (
                                        <React.Fragment key={audit.id}>
                                            <tr
                                                className={`hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors ${isExpanded ? 'bg-slate-50/80 dark:bg-slate-800/50 relative z-10' : ''}`}
                                                onClick={() => toggleRow(audit.id)}
                                            >
                                                <td className="px-4 py-4 text-slate-500 font-mono text-xs">#{audit.id}</td>
                                                <td className="px-4 py-4 text-center text-xs whitespace-nowrap opacity-80">{formatDate(audit.created_at)}</td>
                                                <td className="px-4 py-4 text-center font-bold text-slate-800 dark:text-slate-100">
                                                    {audit.user ? audit.user.name : <span className="text-slate-400 italic">Sistema/Anónimo</span>}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`px-2 py-1 flex-inline items-center rounded-full text-[10px] font-black tracking-widest shadow-sm ${getEventColor(audit.event)}`}>
                                                        {translateEvent(audit.event)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="font-semibold text-xs tracking-wider uppercase text-slate-700 dark:text-slate-300">{modelName}</div>
                                                    <div className="text-[10px] text-slate-400 mt-0.5">ID: {audit.auditable_id}</div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <button className={`text-slate-400 hover:text-indigo-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                                                            <path d="M4.3 5.4L8 9.1l3.7-3.7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.4 4.4c-.4.4-1 .4-1.4 0L2.9 6.8c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100/80 dark:border-slate-700/50 shadow-inner">
                                                    <td colSpan="6" className="px-8 py-5">
                                                        <div className="flex flex-col gap-3 font-mono text-xs max-w-4xl mx-auto">
                                                            {Object.keys(audit.old_values || {}).length > 0 && (
                                                                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm">
                                                                    <strong className="block text-[10px] text-rose-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                                                        <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12A5 5 0 1 1 8 3a5 5 0 0 1 0 10z" /><path d="M7 4h2v5H7zM7 10h2v2H7z" /></svg>
                                                                        Valores Anteriores:
                                                                    </strong>
                                                                    <div className="text-slate-600 dark:text-slate-400 break-words whitespace-pre-wrap">
                                                                        {JSON.stringify(audit.old_values, null, 2)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {Object.keys(audit.new_values || {}).length > 0 && (
                                                                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm">
                                                                    <strong className="block text-[10px] text-emerald-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                                                        <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.8-8.2l-4.5 4.5a1 1 0 0 1-1.4 0L4.2 5.6l1.4-1.4 1.2 1.2 3.8-3.8 1.4 1.4z" /></svg>
                                                                        Valores Guardados:
                                                                    </strong>
                                                                    <div className="text-slate-600 dark:text-slate-400 break-words whitespace-pre-wrap">
                                                                        {JSON.stringify(audit.new_values, null, 2)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {Object.keys(audit.old_values || {}).length === 0 && Object.keys(audit.new_values || {}).length === 0 && (
                                                                <div className="p-3 text-slate-500 italic text-sm text-center">
                                                                    Não existem blocos de dados JSON nesta ação de Registo.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="6" className="py-12 px-4 text-center text-slate-500 italic text-sm">Nenhum registo de auditoria encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                totalItems={total}
                startIndex={(current_page - 1) * per_page}
                itemsPerPage={per_page}
                currentPage={current_page}
                totalPages={last_page}
                onPageChange={(page) => updateFilters({ page })}
            />
        </AuthenticatedLayout>
    );
}
