import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import loginImage from '../../images/login.jpg';

/**
 * Layout de Visitante - Versão Otimizada com Suporte a Dark Mode.
 * Garante que o fundo e o texto se adaptam ao tema selecionado.
 */
export default function GuestLayout({ children }) {
    return (
        /* Adicionadas classes dark:bg-slate-900 e dark:text-slate-400 */
        <main className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 antialiased font-inter transition-colors duration-300">
            <div className="relative flex">
                
                {/* Lado Esquerdo: Área de Autenticação */}
                <div className="w-full md:w-1/2">
                    <div className="min-h-screen flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
                        
                        <div className="max-w-sm mx-auto w-full">
                            
                            {/* Logótipo centralizado com cor dinâmica */}
                            <div className="flex justify-center mb-6">
                                <Link href="/">
                                    {/* Alterado para text-blue-600 dark:text-blue-500 para alinhar com o ERP */}
                                    <ApplicationLogo className="h-16 w-16 fill-current text-blue-600" />
                                </Link>
                            </div>

                            {/* Área do formulário */}
                            <div className="relative">
                                {children}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Lado Direito: Imagem com Overlay para Dark Mode */}
                <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
                    {/* Overlay escuro opcional que aparece apenas no dark mode para suavizar a imagem */}
                    <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/40 z-10 transition-colors duration-300"></div>
                    <img 
                        className="object-cover object-center w-full h-full"
                        src={loginImage}
                        alt="Background ERP Palco d'Água" 
                    />
                </div>

            </div>
        </main>
    );
}