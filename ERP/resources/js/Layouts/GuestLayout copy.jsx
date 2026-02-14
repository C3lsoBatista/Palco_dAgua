import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

/**
 * Layout público para páginas de autenticação.
 * O logótipo agora está centralizado e em destaque acima do formulário.
 */
export default function GuestLayout({ children }) {
    return (
        // Removemos a dependência de dark mode aqui para forçar o light mode na próxima etapa
        <main className="bg-white text-slate-600 antialiased font-inter">
            <div className="relative flex min-h-screen">
                
                {/* Lado Esquerdo: Área de Conteúdo (Logótipo + Formulário) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-sm mx-auto w-full">
                        {/* LOGÓTIPO CENTRALIZADO E MAIOR */}
                        <div className="flex justify-center mb-8">
                            <Link href="/">
                                {/* Aumentámos de h-8 para h-16 w-16 */}
                                <ApplicationLogo className="h-16 w-16 fill-current text-indigo-600" />
                            </Link>
                        </div>

                        {/* Injeção do Formulário (Login.jsx, Register.jsx, etc.) */}
                        {children}
                    </div>
                </div>

                {/* Lado Direito: Área de Apresentação (Imagem) */}
                <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
                    <img 
                        className="object-cover object-center w-full h-full" 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                        alt="Background do ERP Palco d'Água" 
                    />
                </div>

            </div>
        </main>
    );
}