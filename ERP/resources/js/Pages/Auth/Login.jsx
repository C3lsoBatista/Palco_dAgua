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

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Palavra-passe" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Lembrar-me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Esqueceste-te da palavra-passe?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Iniciar Sessão
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}