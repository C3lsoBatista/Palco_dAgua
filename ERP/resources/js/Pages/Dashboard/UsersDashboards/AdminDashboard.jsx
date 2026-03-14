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
                backgroundColor: '#3b82f6', // blue-500
                hoverBackgroundColor: '#2563eb', // blue-600
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
                    '#3b82f6', // blue-500
                    '#0ea5e9', // sky-500
                    '#22c55e', // green-500
                    '#f59e0b', // amber-500
                ],
                hoverBackgroundColor: [
                    '#2563eb', // blue-600
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
        { id: 1, iniciais: 'JD', cor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', nome: 'João Duarte', acao: 'concluiu o serviço #478', tempo: 'há 8 min' },
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
        { label: 'Desentupimento', value: 42, colorClass: 'bg-blue-500' },
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
                        <div className="text-sky-500 bg-sky-50 dark:bg-sky-900/20 p-2 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M32 160C32 124.7 60.7 96 96 96L320 96C343.7 96 364.4 108.9 375.4 128L415.8 128C448.2 128 477.4 147.6 489.8 177.5L533.6 283.8L535.3 288L560 288C586.5 288 608 309.5 608 336L608 400C608 426.5 586.5 448 560 448L559.6 448C559.8 450.6 560 453.3 560 456C560 504.6 520.6 544 472 544C423.4 544 384 504.6 384 456C384 453.3 384.1 450.6 384.4 448L239.7 448C239.9 450.6 240.1 453.3 240.1 456C240.1 504.6 200.7 544 152.1 544C103.5 544 64.1 504.6 64.1 456C64.1 452.4 64.3 448.9 64.7 445.5C45.7 439.1 32.1 421.1 32.1 400L32.1 352C14.4 352 .1 337.7 .1 320L.1 224C.1 206.3 14.4 192 32.1 192L32.1 160zM384 192L384 288L466.1 288L430.7 201.9C428.2 195.9 422.4 192 415.9 192L384 192zM192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496C174.1 496 192 478.1 192 456zM472 496C494.1 496 512 478.1 512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496z"/>
                            </svg>
                        </div>
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
                        <div className="text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 152C192 165.3 202.7 176 216 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L216 128C202.7 128 192 138.7 192 152zM192 248C192 261.3 202.7 272 216 272L264 272C277.3 272 288 261.3 288 248C288 234.7 277.3 224 264 224L216 224C202.7 224 192 234.7 192 248zM304 324L304 328C275.2 328.3 252 351.7 252 380.5C252 406.2 270.5 428.1 295.9 432.3L337.6 439.3C343.6 440.3 348 445.5 348 451.6C348 458.5 342.4 464.1 335.5 464.1L280 464C269 464 260 473 260 484C260 495 269 504 280 504L304 504L304 508C304 519 313 528 324 528C335 528 344 519 344 508L344 503.3C369 499.2 388 477.6 388 451.5C388 425.8 369.5 403.9 344.1 399.7L302.4 392.7C296.4 391.7 292 386.5 292 380.4C292 373.5 297.6 367.9 304.5 367.9L352 367.9C363 367.9 372 358.9 372 347.9C372 336.9 363 327.9 352 327.9L344 327.9L344 323.9C344 312.9 335 303.9 324 303.9C313 303.9 304 312.9 304 323.9z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">14</div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">3 240 €</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Serviços concluídos sem fatura</p>
                </div>

                {/* Card 3: Faturas a Receber */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-green-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">A Receber</span>
                        <div className="text-green-500 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M320 48C306.7 48 296 58.7 296 72L296 84L294.2 84C257.6 84 228 113.7 228 150.2C228 183.6 252.9 211.8 286 215.9L347 223.5C352.1 224.1 352.1 228.5 352.1 233.7C352.1 239.4 347.5 243.9 341.9 243.9L268.1 244C252.6 244 240.1 256.5 240.1 272C240.1 287.5 252.6 300 268.1 300L292.1 300L292.1 312C292.1 325.3 302.8 336 316.1 336C329.4 336 340.1 325.3 340.1 312L340.1 300L341.9 300C378.5 300 408.1 270.3 408.1 233.8C408.1 200.4 383.2 172.2 350.1 168.1L289.1 160.5C284 159.9 280.1 155.5 280.1 150.3C280.1 144.6 284.7 140.1 290.3 140.1L356.1 140C371.6 140 384.1 127.5 384.1 112C384.1 96.5 371.6 84 356.1 84L340.1 84L340.1 72C340.1 58.7 329.4 48 316.1 48zM141.3 405.5L98.7 448L64 448C46.3 448 32 462.3 32 480L32 544C32 561.7 46.3 576 64 576L384.5 576C413.5 576 441.8 566.7 465.2 549.5L591.8 456.2C609.6 443.1 613.4 418.1 600.3 400.3C587.2 382.5 562.2 378.7 544.4 391.8L424.6 480L312 480C298.7 480 288 469.3 288 456C288 442.7 298.7 432 312 432L384 432C401.7 432 416 417.7 416 400C416 382.3 401.7 368 384 368L231.8 368C197.9 368 165.3 381.5 141.3 405.5z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">12 850 €</div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">23 faturas</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Dentro do prazo de pagamento</p>
                </div>

                {/* Card 4: Faturas em Atraso */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-red-500 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Em Atraso</span>
                        <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z"/>
                            </svg>
                        </div>
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
                                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
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