import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import moment from 'moment';

// Formata a data em Português sem os artigos "de"
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('pt-PT', { month: 'long' }).format(date);
    const year = date.getFullYear();
    // Capitaliza o mês: "março" → "Março"
    const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} ${monthCap} ${year}`;
};

const LABELS = ['Update', 'Product', 'Bug Fix', 'Announcement'];

export default function Index({ commits }) {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const getBadgeStyle = (label) => {
        switch (label) {
            case 'Product':     return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400';
            case 'Announcement': return 'bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400';
            case 'Bug Fix':     return 'bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400';
            default:            return 'bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400';
        }
    };

    const filtered = activeFilter === 'Todos'
        ? commits
        : commits?.filter(c => c.label === activeFilter);

    return (
        <AuthenticatedLayout>
            <Head title="Changelog" />

            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 p-8">

                {/* ── Cabeçalho ── */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Changelog</h1>
                    <a
                        href={`https://github.com/C3lsoBatista/Palco_dAgua/commits/main/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-700 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-lg transition-colors duration-200"
                    >
                        Ver no GitHub
                    </a>
                </div>

                {/* ── Separador ── */}
                <hr className="border-gray-200 dark:border-gray-700/60 mb-6" />

                {/* ── Filtros ── */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {['Todos', ...LABELS].map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                                activeFilter === f
                                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                                    : 'bg-white dark:bg-transparent text-slate-600 dark:text-slate-400 border-gray-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-slate-500'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* ── Lista de Commits ── */}
                {filtered && filtered.length > 0 ? (
                    <div>
                        {filtered.map((commit, index) => (
                            <div key={commit.hash}>
                                {/* Linha: Data | Conteúdo */}
                                <div className="flex gap-8 py-8">

                                    {/* Coluna da Data (esquerda) */}
                                    <div className="w-32 shrink-0 pt-1 text-right">
                                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide leading-tight">
                                            {formatDate(commit.date)}
                                        </span>
                                    </div>

                                    {/* Coluna do Conteúdo (direita) */}
                                    <div className="flex-1 min-w-0">
                                        {/* Título */}
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug">
                                            {commit.title}
                                        </h2>

                                        {/* Autor + Badge */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold shrink-0">
                                                {commit.author.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {commit.author}
                                            </span>
                                            <span className="text-gray-300 dark:text-gray-600">·</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeStyle(commit.label)}`}>
                                                {commit.label}
                                            </span>
                                        </div>

                                        {/* Corpo do Commit */}
                                        {commit.content && (
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                                {commit.content}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Separador entre entradas */}
                                {index < filtered.length - 1 && (
                                    <hr className="border-gray-100 dark:border-gray-800/60" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                        <p className="text-gray-400 dark:text-gray-500 italic text-sm">Nenhum histórico encontrado.</p>
                    </div>
                )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

