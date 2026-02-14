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

            <div className="mb-4 text-sm text-gray-600">
                Obrigado por te registares! Antes de começares, poderias verificar o
                teu endereço de email clicando no link que acabámos de te enviar? Se
                não recebeste o email, teremos todo o gosto em enviar-te outro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Um novo link de verificação foi enviado para o endereço de email
                    que forneceste durante o registo.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Reenviar Email de Verificação
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Terminar Sessão
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}