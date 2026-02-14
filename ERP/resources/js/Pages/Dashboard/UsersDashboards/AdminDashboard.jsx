import React from 'react';

/**
 * Painel de Administração - Visão de Gestão Global e Saúde do Sistema.
 * Focado em métricas de utilizadores, logs de atividade e atalhos de configuração.
 */
export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* 1. Métricas de Alto Nível (KPIs de Administração) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Utilizadores Totais */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Utilizadores</span>
                        <span className="p-1 bg-violet-100 dark:bg-violet-900/30 rounded text-violet-600 dark:text-violet-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm4 3c0-1.657-1.343-3-3-3H7c-1.657 0-3 1.343-3 3v2h8v-2Z"/></svg>
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">124</div>
                    <div className="text-xs text-green-500 font-semibold mt-1">+3 esta semana</div>
                </div>

                {/* Sessões Ativas */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Sessões Ativas</span>
                        <div className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">18</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tempo real</div>
                </div>

                {/* Erros de Sistema / Logs */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Estado do Sistema</span>
                        <span className="text-green-500">
                             <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"/><path d="m11.3 5.3-4.3 4.3-1.3-1.3a1 1 0 1 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l5-5a1 1 0 1 0-1.4-1.4Z"/></svg>
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">Operacional</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Uptime: 99.9%</div>
                </div>

                {/* Backups Realizados */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Último Backup</span>
                        <span className="text-slate-400 dark:text-slate-500">💾</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">02:00h</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tamanho: 42.5MB</div>
                </div>
            </div>

            {/* 2. Área de Atividade e Configurações Rápidas */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* Registos de Atividade Recente */}
                <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Logs de Atividade de Utilizadores</h2>
                    </header>
                    <div className="p-3">
                        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                            <li className="flex items-center py-3 px-2 hover:bg-slate-50 dark:hover:bg-slate-700/20 rounded transition-colors">
                                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 mr-3 text-xs font-bold">JD</div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">João Duarte</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400"> emitiu a fatura #FT2026/042</span>
                                </div>
                                <div className="text-xs text-slate-400">há 5 min</div>
                            </li>
                            <li className="flex items-center py-3 px-2 hover:bg-slate-50 dark:hover:bg-slate-700/20 rounded transition-colors">
                                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 mr-3 text-xs font-bold">MS</div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Maria Silva</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400"> alterou o estado do serviço #450</span>
                                </div>
                                <div className="text-xs text-slate-400">há 12 min</div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Ações de Administração Rápidas */}
                <div className="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Ferramentas de Sistema</h2>
                    </header>
                    <div className="p-5 space-y-4">
                        <button className="w-full text-left p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-3 transition-colors">
                            <span className="text-violet-500">⚙️</span>
                            <div>
                                <div className="text-sm font-bold dark:text-slate-100">Configurações Gerais</div>
                                <div className="text-xs text-slate-500">Empresa, Logos, Emails</div>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-3 transition-colors">
                            <span className="text-violet-500">👥</span>
                            <div>
                                <div className="text-sm font-bold dark:text-slate-100">Gerir Permissões</div>
                                <div className="text-xs text-slate-500">Editar papéis de utilizador</div>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                            <span className="text-red-500">🛑</span>
                            <div>
                                <div className="text-sm font-bold text-red-600 dark:text-red-400">Modo de Manutenção</div>
                                <div className="text-xs text-red-400">Suspender acesso externo</div>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}