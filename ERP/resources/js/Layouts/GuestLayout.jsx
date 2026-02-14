import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import loginImage from '../../images/login.jpg';

/**
 * Layout de Visitante - Versão Otimizada (Baixa Densidade Vertical).
 * Reduz espaços para evitar scroll em formulários com múltiplos campos.
 */
export default function GuestLayout({ children }) {
    return (
        <main className="bg-white text-slate-600 antialiased font-inter">
            <div className="relative flex">
                
                {/* Lado Esquerdo: Área de Autenticação */}
                <div className="w-full md:w-1/2">
                    {/* py-12 alterado para py-8: ganhas ~32px de espaço real */}
                    <div className="min-h-screen flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
                        
                        <div className="max-w-sm mx-auto w-full">
                            
                            {/* mb-10 reduzido para mb-6: o logo fica mais próximo do form */}
                            <div className="flex justify-center mb-6">
                                <Link href="/">
                                    {/* h-20 reduzido para h-16 para otimizar altura em portáteis */}
                                    <ApplicationLogo className="h-16 w-16 fill-current text-indigo-600" />
                                </Link>
                            </div>

                            {/* Área do formulário */}
                            <div className="relative">
                                {children}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Lado Direito: Imagem */}
                <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
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