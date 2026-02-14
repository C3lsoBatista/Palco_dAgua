import React, { useState } from 'react';

/**
 * Painel Financeiro - Focado em faturação, recebimentos e integridade de dados.
 * Implementa o layout de cartões KPI e tabela de serviços.
 */
export default function FinanceDashboard() {
    // Estado para o filtro de data conforme o teu print
    const [dateFilter, setDateFilter] = useState('Last Month');

    // Dados simulados para a tabela
    const servicos = [
        { id: 1, morada: 'Rua de Santa Catarina, 450, Porto', data: '12/02/2026', estado: 'Concluído', valor: '85,00€' },
        { id: 2, morada: 'Av. dos Aliados, 10, Porto', data: '13/02/2026', estado: 'Pendente', valor: '120,50€' },
        { id: 3, morada: 'Rua do Almada, 22, Porto', data: '14/02/2026', estado: 'Faturado', valor: '65,00€' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            
            {/* 1. Secção de KPI Cards (Os 3 solicitados) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card: Faturas por Emitir */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-amber-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Faturas por Emitir</p>
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">12</p>
                        </div>
                        <div className="text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">📄</div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4">Aguardam conclusão de serviço</p>
                </div>

                {/* Card: Faturas por Receber */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-red-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Faturas por Receber</p>
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">4.250,00€</p>
                        </div>
                        <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">💰</div>
                    </div>
                    <p className="text-[10px] text-red-500 font-medium mt-4">8 faturas em atraso</p>
                </div>

                {/* Card: Clientes com dados por atualizar */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-violet-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dados por Atualizar</p>
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">5</p>
                        </div>
                        <div className="text-violet-500 bg-violet-50 dark:bg-violet-900/20 p-2 rounded-lg">👤</div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4">Clientes sem NIF ou Morada fiscal</p>
                </div>
            </div>

            {/* 2. Cabeçalho da Tabela com Filtros */}
            <div className="sm:flex sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Transações de Serviços</h2>
                </div>

                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Botão de Dropdown de Data */}
                    <div className="relative inline-flex">
                        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors shadow-sm">
                            <span>📅 {dateFilter}</span>
                            <svg className="w-3 h-3 fill-current opacity-50" viewBox="0 0 12 12"><path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" /></svg>
                        </button>
                    </div>

                    {/* Botão Add Customer */}
                    <button className="bg-slate-900 dark:bg-violet-600 hover:bg-slate-800 dark:hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95">
                        Add Customer
                    </button>
                </div>
            </div>

            {/* 3. Tabela de Serviços Realizados */}
            <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-bold uppercase text-slate-400 bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th className="px-5 py-4 text-left">Morada do Serviço</th>
                                <th className="px-5 py-4 text-left">Data</th>
                                <th className="px-5 py-4 text-left">Estado</th>
                                <th className="px-5 py-4 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                            {servicos.map((s) => (
                                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{s.morada}</td>
                                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{s.data}</td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                                            s.estado === 'Faturado' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                                            s.estado === 'Pendente' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 
                                            'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                                        }`}>
                                            {s.estado}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right font-bold text-slate-700 dark:text-slate-100">{s.valor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}