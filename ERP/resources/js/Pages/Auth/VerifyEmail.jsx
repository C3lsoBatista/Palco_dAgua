import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

/**
 * Componente de "Parede de Aprovação".
 * Exibido quando um utilizador autenticado tenta aceder ao ERP sem ter o email_verified_at preenchido.
 */
export default function VerifyEmail() {
    return (
        <GuestLayout>
            <Head title="Aguardando Aprovação" />

            {/* Cabeçalho de Contexto - Focado em Aprovação Humana */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Conta Pendente de Aprovação
                </h2>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Obrigado por te registares no ERP Palco d'Água! 
                    Para garantir a segurança dos dados, o teu acesso precisa de ser validado manualmente por um administrador.
                </p>
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                        O administrador já foi notificado do teu registo. 
                        Receberás um email assim que o teu acesso for autorizado.
                    </p>
                </div>
            </div>

            {/* Ações de Saída e Suporte */}
            <div className="space-y-4">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Voltar para o Login
                </Link>

                <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Precisas de ajuda urgente? Contacta o suporte técnico.
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}