import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Página de Autenticação (Login)
 * Implementada com suporte total a Dark Mode e integração Inertia.js.
 */
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sessão" />

            {/* Cabeçalho de Boas-vindas com suporte a Dark Mode */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Bem-vindo de volta
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Por favor, introduza as suas credenciais para aceder à sua conta.
                </p>
            </div>

            {/* Feedback de Estado (ex: Reset de Password) com cores para ambos os temas */}
            {status && (
                <div className="mb-6 rounded-md bg-green-50 dark:bg-green-900/30 p-4 text-sm font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Campo de Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full transition-shadow focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Campo de Palavra-passe */}
                <div>
                    <InputLabel htmlFor="password" value="Palavra-passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full transition-shadow focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Opções de Sessão e Recuperação */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="text-violet-600 focus:ring-violet-500 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors select-none">
                            Lembrar-me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors duration-200"
                        >
                            Esqueceste a palavra-passe?
                        </Link>
                    )}
                </div>

                {/* Botão de Submissão */}
                <div>
                    <PrimaryButton
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-all duration-200"
                        disabled={processing}
                    >
                        {processing ? 'A processar...' : 'Iniciar Sessão'}
                    </PrimaryButton>
                </div>
            </form>

            {/* Rodapé de Registo */}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Ainda não tens conta?{' '}
                <Link
                    href={route('register')}
                    className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 hover:underline transition-all duration-200"
                >
                    Registar agora
                </Link>
            </p>
        </GuestLayout>
    );
}