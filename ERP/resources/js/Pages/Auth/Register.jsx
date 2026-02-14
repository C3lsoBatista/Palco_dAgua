import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Componente responsável pela página de registo de novos utilizadores.
 * Apresenta um formulário para a criação de uma conta com nome, email e palavra-passe.
 *
 * @returns {JSX.Element} A vista de registo.
 */
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    /**
     * Processa a submissão do formulário de registo.
     * Envia os dados do novo utilizador para o servidor e, após a conclusão do pedido
     * (com sucesso ou erro de validação), limpa os campos da palavra-passe por questões de segurança.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de submissão do formulário.
     */
    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registo" />

            {/* Cabeçalho de Contexto */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Criar Conta
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Preenche os teus dados para te juntares à nossa plataforma.
                </p>
            </div>

            {/* Formulário com espaçamento vertical automatizado */}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Palavra-passe"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Botão de Ação Principal (Largura Total) */}
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200" 
                        disabled={processing}
                    >
                        Registar
                    </PrimaryButton>
                </div>
            </form>

            {/* Ação Secundária (Login) movida para o rodapé */}
            <p className="mt-8 text-center text-sm text-gray-600">
                Já tens conta?{' '}
                <Link
                    href={route('login')}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all duration-200"
                >
                    Iniciar Sessão
                </Link>
            </p>
        </GuestLayout>
    );
}