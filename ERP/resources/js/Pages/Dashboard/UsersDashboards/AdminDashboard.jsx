import React, { useState } from 'react';
import BarChart from '@/Components/Charts/BarChart01';
import DoughnutChart from '@/Components/Charts/DoughnutChart';

/**
 * Painel de Administração — Visão Operacional e Financeira.
 * Focado em KPIs do negócio, fluxo financeiro, alertas e atividade recente.
 * 
 * NOTA: Todos os dados são estáticos/hardcoded nesta fase.
 */
export default function AdminDashboard() {
    const [alertFilter, setAlertFilter] = useState('todos');

    // ─── Dados Estáticos para os Gráficos ──────────────────────────────────

    const barChartData = {
        labels: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
        datasets: [
            {
                label: 'Faturado',
                data: [14200, 18500, 12800, 16400, 21300, 9800],
                backgroundColor: '#8b5cf6', // violet-500
                hoverBackgroundColor: '#7c3aed', // violet-600
                barPercentage: 0.6,
                categoryPercentage: 0.6,
                borderRadius: 4,
            },
            {
                label: 'Recebido',
                data: [11800, 15200, 10600, 14800, 18900, 7200],
                backgroundColor: '#0ea5e9', // sky-500
                hoverBackgroundColor: '#0284c7', // sky-600
                barPercentage: 0.6,
                categoryPercentage: 0.6,
                borderRadius: 4,
            },
        ],
    };

    const doughnutData = {
        labels: ['Desentupimento', 'Inspeção CCTV', 'Limpeza', 'Manutenção'],
        datasets: [
            {
                label: 'Serviços',
                data: [42, 18, 25, 15],
                backgroundColor: [
                    '#8b5cf6', // violet-500
                    '#0ea5e9', // sky-500
                    '#22c55e', // green-500
                    '#f59e0b', // amber-500
                ],
                hoverBackgroundColor: [
                    '#7c3aed', // violet-600
                    '#0284c7', // sky-600
                    '#16a34a', // green-600
                    '#d97706', // amber-600
                ],
                borderWidth: 0,
            },
        ],
    };

    // ─── Dados Estáticos para Alertas ───────────────────────────────────────

    const alertas = [
        { id: 1, tipo: 'frota', icone: '🚛', descricao: 'IPO — Renault Master (22-AB-34)', dataLimite: '22/03/2026', prioridade: 'alta' },
        { id: 2, tipo: 'frota', icone: '📋', descricao: 'Seguro — Mercedes Sprinter (11-CD-56)', dataLimite: '28/03/2026', prioridade: 'alta' },
        { id: 3, tipo: 'frota', icone: '🔧', descricao: 'Revisão 120.000km — Ford Transit (33-EF-78)', dataLimite: '05/04/2026', prioridade: 'media' },
        { id: 4, tipo: 'frota', icone: '💶', descricao: 'IUC — Renault Master (22-AB-34)', dataLimite: '15/04/2026', prioridade: 'media' },
        { id: 5, tipo: 'negocio', icone: '📧', descricao: 'Orçamento #ORC-2026/087 — Câmara de Gaia (sem resposta há 12 dias)', dataLimite: '02/03/2026', prioridade: 'alta' },
        { id: 6, tipo: 'negocio', icone: '📧', descricao: 'Orçamento #ORC-2026/091 — Condomínio Rua do Almada (sem resposta há 8 dias)', dataLimite: '06/03/2026', prioridade: 'media' },
        { id: 7, tipo: 'frota', icone: '📋', descricao: 'Seguro — Iveco Daily (44-GH-90)', dataLimite: '20/04/2026', prioridade: 'baixa' },
        { id: 8, tipo: 'negocio', icone: '📧', descricao: 'Orçamento #ORC-2026/095 — Hotel Infante Sagres (sem resposta há 5 dias)', dataLimite: '09/03/2026', prioridade: 'baixa' },
    ];

    const alertasFiltrados = alertFilter === 'todos'
        ? alertas
        : alertas.filter(a => a.tipo === alertFilter);

    // ─── Dados Estáticos para Atividade Recente ─────────────────────────────

    const atividades = [
        { id: 1, iniciais: 'JD', cor: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600', nome: 'João Duarte', acao: 'concluiu o serviço #478', tempo: 'há 8 min' },
        { id: 2, iniciais: 'MS', cor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', nome: 'Maria Silva', acao: 'emitiu a fatura #FT2026/058', tempo: 'há 25 min' },
        { id: 3, iniciais: 'RA', cor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600', nome: 'Rui Almeida', acao: 'agendou o serviço #482', tempo: 'há 1h' },
        { id: 4, iniciais: 'AP', cor: 'bg-green-100 dark:bg-green-900/30 text-green-600', nome: 'Ana Pereira', acao: 'registou pagamento de €850,00', tempo: 'há 2h' },
        { id: 5, iniciais: 'CB', cor: 'bg-red-100 dark:bg-red-900/30 text-red-600', nome: 'Carlos Batista', acao: 'criou o orçamento #ORC-2026/098', tempo: 'há 3h' },
    ];

    // ─── Helpers ─────────────────────────────────────────────────────────────

    const prioridadeBadge = (prioridade) => {
        const map = {
            alta: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
            media: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
            baixa: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300',
        };
        return map[prioridade] || map.baixa;
    };

    const prioridadeLabel = (prioridade) => {
        const map = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };
        return map[prioridade] || 'Baixa';
    };

    // ─── Doughnut Legend Data ────────────────────────────────────────────────
    const doughnutLegend = [
        { label: 'Desentupimento', value: 42, colorClass: 'bg-violet-500' },
        { label: 'Inspeção CCTV', value: 18, colorClass: 'bg-sky-500' },
        { label: 'Limpeza', value: 25, colorClass: 'bg-green-500' },
        { label: 'Manutenção', value: 15, colorClass: 'bg-amber-500' },
    ];

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER
    // ═════════════════════════════════════════════════════════════════════════

    return (
        <div className="space-y-6">

            {/* ───────────────── 1. KPI Cards ───────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* Card 1: Serviços de Hoje */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-sky-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Serviços de Hoje</span>
                        <span className="text-sky-500 bg-sky-50 dark:bg-sky-900/20 p-1.5 rounded-lg text-base">🔧</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">5</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">/ 8</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2">
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                            <div className="bg-sky-500 h-1.5 rounded-full transition-all" style={{ width: '62.5%' }} />
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1">5 concluídos · 3 pendentes</p>
                    </div>
                </div>

                {/* Card 2: Serviços por Faturar */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-amber-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Por Faturar</span>
                        <span className="text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-1.5 rounded-lg text-base">📄</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">14</div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">3 240 €</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Serviços concluídos sem fatura</p>
                </div>

                {/* Card 3: Faturas a Receber */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-green-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">A Receber</span>
                        <span className="text-green-500 bg-green-50 dark:bg-green-900/20 p-1.5 rounded-lg text-base">💰</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">12 850 €</div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">23 faturas</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Dentro do prazo de pagamento</p>
                </div>

                {/* Card 4: Faturas em Atraso */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-red-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Em Atraso</span>
                        <span className="text-red-500 bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg text-base">⚠️</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">4 680 €</div>
                    <p className="text-xs text-red-500 dark:text-red-400 font-semibold mt-1">7 faturas</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Ultrapassaram a data limite</p>
                </div>
            </div>

            {/* ───────────────── 2. Gráficos ───────────────── */}
            <div className="grid grid-cols-12 gap-6">

                {/* Faturação Mensal — BarChart */}
                <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Faturação Mensal</h2>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-sm bg-violet-500" />
                                    <span className="text-slate-500 dark:text-slate-400">Faturado</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
                                    <span className="text-slate-500 dark:text-slate-400">Recebido</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="p-2">
                        <BarChart data={barChartData} height={200} />
                    </div>
                </div>

                {/* Distribuição por Tipo de Serviço — DoughnutChart */}
                <div className="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Tipo de Serviço</h2>
                    </header>
                    <div className="p-4 overflow-hidden">
                        <div className="flex flex-row items-center justify-between gap-2">
                            {/* Gráfico */}
                            <div className="flex-1 h-[130px] min-w-0">
                                <DoughnutChart data={doughnutData} height={130} />
                            </div>

                            {/* Legenda Customizada (Direita) */}
                            <div className="flex-none w-32 space-y-1.5">
                                {doughnutLegend.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-[10px]">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <span className={`w-2 h-2 rounded-full ${item.colorClass} shrink-0`} />
                                            <span className="text-slate-600 dark:text-slate-400 font-medium truncate" title={item.label}>{item.label}</span>
                                        </div>
                                        <span className="text-slate-400 dark:text-slate-500 font-bold ml-1 shrink-0">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ───────────────── 3. Alertas + Atividade ───────────────── */}
            <div className="grid grid-cols-12 gap-6">

                {/* Tabela de Alertas Globais */}
                <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Alertas Globais</h2>
                            {/* Filtros de tipo */}
                            <div className="flex bg-slate-100 dark:bg-slate-700/50 rounded-lg p-0.5">
                                {[
                                    { key: 'todos', label: 'Todos' },
                                    { key: 'frota', label: '🚛 Frota' },
                                    { key: 'negocio', label: '💼 Negócio' },
                                ].map((f) => (
                                    <button
                                        key={f.key}
                                        onClick={() => setAlertFilter(f.key)}
                                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${alertFilter === f.key
                                            ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                            }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700/50 rounded-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Tipo</th>
                                        <th className="px-4 py-3 text-left">Descrição</th>
                                        <th className="px-4 py-3 text-left whitespace-nowrap">Data Limite</th>
                                        <th className="px-4 py-3 text-center">Prioridade</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                                    {alertasFiltrados.map((alerta) => (
                                        <tr key={alerta.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                            <td className="px-4 py-3">
                                                <span className="text-lg">{alerta.icone}</span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                                                {alerta.descricao}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                {alerta.dataLimite}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex font-bold px-2.5 py-0.5 rounded-full text-[10px] ${prioridadeBadge(alerta.prioridade)}`}>
                                                    {prioridadeLabel(alerta.prioridade)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Atividade Recente — Timeline */}
                <div className="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Atividade Recente</h2>
                    </header>
                    <div className="p-3">
                        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                            {atividades.map((a) => (
                                <li key={a.id} className="flex items-center py-3 px-2 hover:bg-slate-50 dark:hover:bg-slate-700/20 rounded transition-colors">
                                    <div className={`w-8 h-8 rounded-full ${a.cor} flex items-center justify-center mr-3 text-xs font-bold shrink-0`}>
                                        {a.iniciais}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.nome}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400"> {a.acao}</span>
                                    </div>
                                    <div className="text-xs text-slate-400 ml-2 shrink-0">{a.tempo}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}