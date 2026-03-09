import React from 'react';

const Pagination = ({ totalItems, startIndex, itemsPerPage, currentPage, totalPages, onPageChange }) => (
    <div className="mt-8 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Texto de Resultados (Esquerda) */}
            <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left order-2 sm:order-1 font-medium italic">
                {totalItems > 0 ? (
                    <>
                        A mostrar <span className="font-bold text-slate-800 dark:text-slate-200">{startIndex + 1}</span> a <span className="font-bold text-slate-800 dark:text-slate-200">{Math.min(startIndex + itemsPerPage, totalItems)}</span> de <span className="font-bold text-slate-800 dark:text-slate-200">{totalItems}</span> resultados
                    </>
                ) : (
                    "Nenhum registo encontrado"
                )}
            </div>

            {/* Navegação (Direita) */}
            <nav className="flex justify-center sm:justify-end order-1 sm:order-2" role="navigation">
                <ul className="flex justify-center gap-3">
                    <li>
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => onPageChange(currentPage - 1)} 
                            className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm font-semibold py-2.5 px-4 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-300'}`}
                        >
                            &lt;- Anterior
                        </button>
                    </li>
                    <li>
                        <button 
                            disabled={currentPage === totalPages || totalPages === 0} 
                            onClick={() => onPageChange(currentPage + 1)} 
                            className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm font-semibold py-2.5 px-4 rounded-lg transition-all ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-300'}`}
                        >
                            Próximo -&gt;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
);

export default Pagination;