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

            <div className="mb-4 text-sm text-gray-600">
                Esta é uma área segura da aplicação. Por favor, confirma a tua
                palavra-passe antes de continuares.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Palavra-passe" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Confirmar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}