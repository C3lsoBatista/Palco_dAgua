import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

/**
 * Componente responsável pelo processo de eliminação da conta do utilizador.
 * Implementa um fluxo de confirmação em duas etapas utilizando um modal
 * para prevenir a eliminação acidental da conta.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} [props.className=''] - Classes CSS adicionais para a secção.
 * @returns {JSX.Element} Secção de eliminação de conta.
 */
export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    /**
     * Inicia o processo de eliminação abrindo o modal de confirmação.
     */
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    /**
     * Processa o pedido de eliminação da conta após a confirmação.
     * Foca automaticamente no campo da palavra-passe em caso de erro.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de submissão do formulário.
     */
    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    /**
     * Fecha o modal de confirmação, limpa os erros e repõe o estado do formulário.
     */
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Eliminar Conta
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Assim que a tua conta for eliminada, todos os seus recursos e dados
                    serão permanentemente apagados. Antes de eliminares a conta,
                    por favor descarrega quaisquer dados ou informações que desejes manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Eliminar Conta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tens a certeza de que pretendes eliminar a tua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Assim que a tua conta for eliminada, todos os seus recursos e
                        dados serão permanentemente apagados. Por favor, introduz a tua
                        palavra-passe para confirmares que pretendes eliminar a tua
                        conta definitivamente.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Palavra-passe"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Palavra-passe"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Eliminar Conta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}