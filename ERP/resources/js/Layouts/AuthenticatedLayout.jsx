import { useState } from 'react';
import Header from '@/Pages/Partials/Header';
import Sidebar from '@/Pages/Partials/Sidebar';

// 1. Importar o Provider (ajuste o caminho se necessário para @/utils/ThemeContext)
import ThemeProvider from '@/utils/ThemeContext'; 

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        // 2. Envolver toda a árvore de componentes com o ThemeProvider
        <ThemeProvider>
            <div className="flex h-[100dvh] overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 antialiased font-inter">
                
                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    
                    {/* Header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main className="grow">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            {header && (
                                <div className="mb-8">{header}</div>
                            )}
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}