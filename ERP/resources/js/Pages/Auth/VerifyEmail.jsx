import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Componente responsável pela página de aviso de verificação de email.
 * Informa o utilizador de que precisa de validar o seu email antes de prosseguir
 * e fornece a opção de reenviar o link de verificação para o endereço registado.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} [props.status] - Estado da sessão, utilizado para informar se o link foi reenviado com sucesso.
 * @returns {JSX.Element} A vista de verificação de email.
 */
export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    /**
     * Processa a submissão do formulário.
     * Envia um pedido POST para a rota responsável por reenviar o email de verificação.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de submissão do formulário.
     */
    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificação de Email" />

            {/* Cabeçalho de Contexto */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Verifica o teu Email
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Obrigado por te registares! Antes de começares, por favor verifica o 
                    teu endereço de email clicando no link que te enviámos. Se não 
                    recebeste o email, clica no botão abaixo para reenviar.
                </p>
            </div>

            {/* Feedback de Estado (Sucesso) */}
            {status === 'verification-link-sent' && (
                <div className="mb-6 rounded-md bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-200 text-center">
                    Um novo link de verificação foi enviado para o endereço de email fornecido.
                </div>
            )}

            {/* Formulário contendo a Ação Principal */}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200" 
                        disabled={processing}
                    >
                        Reenviar Email de Verificação
                    </PrimaryButton>
                </div>
            </form>

            {/* Ação Secundária (Fuga) movida para uma zona segura */}
            <div className="mt-8 text-center">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm font-semibold text-gray-500 hover:text-gray-900 hover:underline transition-all duration-200 focus:outline-none"
                >
                    Terminar Sessão
                </Link>
            </div>
        </GuestLayout>
    );
}