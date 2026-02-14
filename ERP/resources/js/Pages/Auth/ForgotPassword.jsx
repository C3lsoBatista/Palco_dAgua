import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

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

            <div className="mb-4 text-sm text-gray-600">
                Esqueceste-te da palavra-passe? Não há problema. Basta indicares-nos o teu
                endereço de email e iremos enviar-te um link de redefinição de palavra-passe
                que te permitirá escolher uma nova.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar Link de Redefinição
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}