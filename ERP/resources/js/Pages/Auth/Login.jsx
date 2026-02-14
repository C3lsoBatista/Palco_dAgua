import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Componente responsável pela página de início de sessão (Login).
 * Permite ao utilizador autenticar-se na aplicação utilizando o seu email e palavra-passe,
 * com a opção de manter a sessão iniciada.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} [props.status] - Mensagem de estado a ser exibida (ex: sucesso após redefinição de palavra-passe).
 * @param {boolean} props.canResetPassword - Indica se a ligação para a recuperação da palavra-passe deve ser exibida.
 * @returns {JSX.Element} A vista de início de sessão.
 */
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    /**
     * Processa a submissão do formulário de início de sessão.
     * Envia as credenciais para o servidor e garante que a palavra-passe é
     * apagada do estado local após a submissão, por motivos de segurança.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de submissão do formulário.
     */
    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sessão" />

            {/* Cabeçalho de Boas-vindas */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Bem-vindo de volta
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Por favor, introduza as suas credenciais para aceder à sua conta.
                </p>
            </div>

            {/* Feedback de Estado */}
            {status && (
                <div className="mb-6 rounded-md bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-200">
                    {status}
                </div>
            )}

            {/* Formulário com espaçamento consistente */}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Palavra-passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Opções de Login (Lembrar-me e Recuperar Password) */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
                        />
                        <span className="ms-2 text-sm text-gray-600 select-none">
                            Lembrar-me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        >
                            Esqueceste a palavra-passe?
                        </Link>
                    )}
                </div>

                {/* Botão de Ação Principal */}
                <div>
                    <PrimaryButton
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                        disabled={processing}
                    >
                        Iniciar Sessão
                    </PrimaryButton>
                </div>
            </form>

            {/* Ação Secundária (Registo) isolada da área de submissão */}
            <p className="mt-8 text-center text-sm text-gray-600">
                Ainda não tens conta?{' '}
                <Link
                    href={route('register')}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all duration-200"
                >
                    Registar agora
                </Link>
            </p>
        </GuestLayout>
    );
}