import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Componente para o pedido de redefinição de palavra-passe.
 * Permite ao utilizador solicitar um link de recuperação, que será enviado para o seu email,
 * caso se tenha esquecido da palavra-passe atual.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} [props.status] - Mensagem de estado da sessão (ex: indicação de que o link foi enviado com sucesso).
 * @returns {JSX.Element} A vista de recuperação de palavra-passe.
 */
export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    /**
     * Processa a submissão do formulário.
     * Envia um pedido POST para o endpoint responsável por gerar e enviar o email de recuperação.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de submissão do formulário.
     */
    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Palavra-passe" />

            {/* Cabeçalho de Contexto */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Recuperar Palavra-passe
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Esqueceste-te da palavra-passe? Não há problema. Introduz o teu 
                    endereço de email e enviar-te-emos um link para definires uma nova.
                </p>
            </div>

            {/* Feedback de Estado (Sucesso) */}
            {status && (
                <div className="mb-6 rounded-md bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-200">
                    {status}
                </div>
            )}

            {/* Formulário com espaçamento consistente */}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    {/* InputLabel adicionado para melhor acessibilidade (WAI-ARIA) */}
                    <InputLabel htmlFor="email" value="Email" />
                    
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Botão de Ação Principal (Largura Total) */}
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200" 
                        disabled={processing}
                    >
                        Enviar Link de Redefinição
                    </PrimaryButton>
                </div>
            </form>

            {/* Ação Secundária: Rota de escape recomendada para UX */}
            <p className="mt-8 text-center text-sm text-gray-600">
                Lembraste-te da palavra-passe?{' '}
                <Link
                    href={route('login')}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all duration-200"
                >
                    Voltar ao Login
                </Link>
            </p>
        </GuestLayout>
    );
}