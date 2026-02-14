import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Componente para o pedido de redefinição de palavra-passe com suporte a Dark Mode.
 * Permite ao utilizador solicitar um link de recuperação via email.
 */
export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Palavra-passe" />

            {/* Cabeçalho com suporte a Dark Mode */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Recuperar Palavra-passe
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Esqueceste-te da palavra-passe? Não há problema. Introduz o teu 
                    endereço de email e enviar-te-emos um link para definires uma nova.
                </p>
            </div>

            {/* Feedback de Estado (Sucesso) com cores adaptadas para Dark Mode */}
            {status && (
                <div className="mb-6 rounded-md bg-green-50 dark:bg-green-900/30 p-4 text-sm font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        /* Classes de focus alteradas para violet conforme a identidade visual */
                        className="mt-1 block w-full transition-shadow focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <PrimaryButton 
                        /* Botão principal com a cor violeta da marca */
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-all duration-200" 
                        disabled={processing}
                    >
                        {processing ? 'A enviar...' : 'Enviar Link de Redefinição'}
                    </PrimaryButton>
                </div>
            </form>

            {/* Ação Secundária (Voltar ao Login) com suporte a Dark Mode e cor Violet */}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Lembraste-te da palavra-passe?{' '}
                <Link
                    href={route('login')}
                    className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 hover:underline transition-all duration-200"
                >
                    Voltar ao Login
                </Link>
            </p>
        </GuestLayout>
    );
}