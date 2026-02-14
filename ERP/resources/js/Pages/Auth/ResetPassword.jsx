import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

/**
 * Componente responsável por redefinir a palavra-passe do utilizador.
 * Implementado com suporte total a Dark Mode e identidade visual violet.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.token - O token de recuperação gerado pelo servidor.
 * @param {string} props.email - O endereço de email associado ao pedido de recuperação.
 */
export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    /**
     * Processa a submissão do formulário.
     * Envia as novas credenciais e o token de validação para o servidor.
     */
    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Redefinir Palavra-passe" />

            {/* Cabeçalho de Contexto com suporte a Dark Mode */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Nova Palavra-passe
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Quase lá! Escolhe uma nova palavra-passe forte para recuperares o acesso à tua conta.
                </p>
            </div>

            {/* Formulário com espaçamento vertical consistente */}
            <form onSubmit={submit} className="space-y-6">
                {/* Campo de Email (Read-only) */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        /* Classes de focus alteradas para violet e suporte a dark mode para campo read-only */
                        className="mt-1 block w-full transition-shadow focus:border-violet-500 focus:ring-violet-500 sm:text-sm bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-500 border-gray-200 dark:border-slate-700"
                        autoComplete="username"
                        readOnly 
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Nova Palavra-passe */}
                <div>
                    <InputLabel htmlFor="password" value="Nova Palavra-passe" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full transition-shadow focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmação de Palavra-passe */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Palavra-passe"
                    />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full transition-shadow focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Botão de Ação Principal (Violet) */}
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-all duration-200" 
                        disabled={processing}
                    >
                        {processing ? 'A processar...' : 'Redefinir Palavra-passe'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}