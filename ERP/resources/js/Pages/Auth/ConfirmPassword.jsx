import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

/**
 * Componente de confirmação de palavra-passe.
 * Refatorado com suporte a Dark Mode e identidade visual violet.
 * Utilizado para validar a identidade do utilizador antes de aceder a áreas sensíveis.
 */
export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    /**
     * Processa a submissão do formulário.
     * Garante a limpeza do campo após a execução por motivos de segurança.
     */
    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar Palavra-passe" />

            {/* Cabeçalho de Contexto com suporte a Dark Mode */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Área Segura
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Por favor, confirma a tua palavra-passe para prosseguires com esta ação.
                </p>
            </div>

            {/* Formulário com espaçamento consistente */}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="password" value="Palavra-passe" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        /* Alterado de indigo para violet e garantido o suporte dark herdado */
                        className="mt-1 block w-full transition-shadow focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Botão de Ação Principal (Violet) */}
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200" 
                        disabled={processing}
                    >
                        {processing ? 'A confirmar...' : 'Confirmar Palavra-passe'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}