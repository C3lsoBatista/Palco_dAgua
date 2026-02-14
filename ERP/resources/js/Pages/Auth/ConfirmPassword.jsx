import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

/**
 * Componente de confirmação de palavra-passe.
 * Utilizado para proteger áreas sensíveis da aplicação, exigindo que o utilizador
 * reintroduza a sua palavra-passe para confirmar a sua identidade antes de prosseguir.
 *
 * @returns {JSX.Element} A vista de confirmação de palavra-passe.
 */
export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    /**
     * Processa a submissão do formulário.
     * Envia o pedido para confirmar a palavra-passe e, independentemente de
     * o pedido falhar ou ter sucesso, limpa o campo de texto por questões de segurança.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de submissão do formulário.
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

            {/* Cabeçalho de Contexto */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Área Segura
                </h2>
                <p className="mt-2 text-sm text-gray-600">
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
                        className="mt-1 block w-full transition-shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Botão de Ação Principal (Largura Total) */}
                <div>
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200" 
                        disabled={processing}
                    >
                        Confirmar Palavra-passe
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}