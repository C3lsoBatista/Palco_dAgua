import { useState } from 'react';
import Header from '@/Components/Mosaic/Header';
import Sidebar from '@/Components/Mosaic/Sidebar';

/**
 * Layout principal para o ERP (Utilizadores Autenticados).
 * Coordena os componentes visuais principais (Sidebar e Header) e injeta o conteúdo da página.
 */
export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-600 antialiased font-inter dark:bg-slate-900 dark:text-slate-400">
            
            {/* Overlay Escuro (Mobile): Fecha a sidebar ao clicar fora dela */}
            <div 
                className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                aria-hidden="true" 
                onClick={() => setSidebarOpen(false)}
            />

            {/* Injeção do Componente Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Contentor Principal */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                
                {/* Injeção do Componente Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Conteúdo Dinâmico da Página (Injetado via Inertia.js) */}
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        
                        {/* Renderiza o título enviado pelo componente, se existir */}
                        {header && (
                            <div className="mb-8">
                                {header}
                            </div>
                        )}

                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}