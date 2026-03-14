import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

/**
 * Secção de Eliminação de Conta.
 * Implementa suporte a Dark Mode e segue a paleta de cores slate/blue do sistema.
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

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Eliminar Conta
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Assim que a tua conta for eliminada, todos os seus recursos e dados
                    serão permanentemente apagados. Antes de eliminares a conta,
                    por favor descarrega quaisquer dados que desejes manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Eliminar Conta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                {/* O contentor do form deve suportar o fundo escuro se o Modal não o fizer nativamente */}
                <form onSubmit={deleteUser} className="p-6 bg-white dark:bg-slate-900 transition-colors duration-300">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Tens a certeza de que pretendes eliminar a tua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Assim que a tua conta for eliminada, todos os seus recursos e
                        dados serão permanentemente apagados. Por favor, introduz a tua
                        palavra-passe para confirmar esta ação definitiva.
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
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Palavra-passe"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton disabled={processing}>
                            Eliminar Permanentemente
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}