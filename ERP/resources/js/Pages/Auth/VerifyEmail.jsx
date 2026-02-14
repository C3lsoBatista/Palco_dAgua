import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Componente responsável pela página de aviso de verificação de email.
 * Refatorado com suporte a Dark Mode e identidade visual violet.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} [props.status] - Estado da sessão.
 */
export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificação de Email" />

            {/* Cabeçalho de Contexto com suporte a Dark Mode */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Verifica o teu Email
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Obrigado por te registares! Antes de começares, por favor verifica o 
                    teu endereço de email clicando no link que te enviámos. Se não 
                    recebeste o email, clica no botão abaixo para reenviar um novo.
                </p>
            </div>

            {/* Feedback de Estado (Sucesso) com suporte Dark Mode */}
            {status === 'verification-link-sent' && (
                <div className="mb-6 rounded-md bg-green-50 dark:bg-green-900/30 p-4 text-sm font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 text-center">
                    Um novo link de verificação foi enviado para o endereço de email fornecido durante o registo.
                </div>
            )}

            {/* Formulário contendo a Ação Principal (Violet) */}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-all duration-200" 
                        disabled={processing}
                    >
                        {processing ? 'A enviar...' : 'Reenviar Email de Verificação'}
                    </PrimaryButton>
                </div>
            </form>

            {/* Ação Secundária (Terminar Sessão) com suporte Dark Mode */}
            <div className="mt-8 text-center">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-all duration-200 focus:outline-none"
                >
                    Terminar Sessão
                </Link>
            </div>
        </GuestLayout>
    );
}