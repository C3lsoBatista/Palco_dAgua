import React from 'react';

/**
 * Painel de Operações para Técnicos de Terreno.
 * Implementa uma Agenda View simplificada com foco em UX Mobile.
 */
export default function TechnicianDashboard() {
    // Simulação de dados que virão da tua futura tabela 'services'
    const servicosHoje = [
        {
            id: 1,
            cliente: 'Residencial Oliveira',
            morada: 'Rua das Flores, 12, Vila Nova de Gaia',
            janela_horaria: '09:00 - 10:30',
            tipo: 'Manutenção Mensal',
            estado: 'Pendente',
            cor_estado: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
        },
        {
            id: 2,
            cliente: 'Ginasio Flow',
            morada: 'Av. da República, 450, Porto',
            janela_horaria: '11:00 - 13:00',
            tipo: 'Reparação Urgente',
            estado: 'Em curso',
            cor_estado: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        },
        {
            id: 3,
            cliente: 'Clínica Dentária Sorriso',
            morada: 'Praça da Liberdade, 5, Maia',
            janela_horaria: '14:30 - 16:00',
            tipo: 'Análise de Água',
            estado: 'Pendente',
            cor_estado: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Cabeçalho de Resumo de Turno */}
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                        Minha Agenda
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Sábado, 14 de Fevereiro
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                        {servicosHoje.length}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Serviços</p>
                </div>
            </div>

            {/* Lista Cronológica de Tarefas */}
            <div className="space-y-4">
                {servicosHoje.map((servico) => (
                    <div 
                        key={servico.id} 
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 transition-all active:scale-[0.98] hover:border-blue-400 dark:hover:border-blue-500"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${servico.cor_estado}`}>
                                        {servico.janela_horaria} • {servico.estado}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                    {servico.cliente}
                                </h3>
                                <div className="flex items-start gap-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="shrink-0 mt-0.5">📍</span>
                                    <span className="line-clamp-1">{servico.morada}</span>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"/><path d="M12.7 5.7a1 1 0 0 0-1.4 0L8 9.3 4.7 6a1 1 0 1 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4Z"/>
                                </svg>
                            </button>
                        </div>

                        {/* Ações de Terreno */}
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            <button className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                <span>{servico.estado === 'Em curso' ? 'Concluir Serviço' : 'Iniciar Serviço'}</span>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M11 8L5 12V4l6 4z"/></svg>
                            </button>
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(servico.morada)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="col-span-1 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="text-xl">🗺️</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rodapé de Ajuda */}
            <div className="text-center pt-4">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    Fim da agenda para hoje. Algum problema?<br/>
                    <a href="tel:910000000" className="text-blue-500 font-bold underline">Contactar Suporte</a>
                </p>
            </div>
        </div>
    );
}