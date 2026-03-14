import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

/**
 * Vista de Edição de Perfil.
 * Organiza os sub-formulários em "cards" que suportam o tema escuro do ERP.
 */
export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil" />

            <div className="mx-auto max-w-7xl space-y-6">
                    
                    {/* Secção: Informações de Perfil */}
                    <div className="bg-white dark:bg-slate-800 p-4 shadow sm:rounded-lg sm:p-8 transition-colors duration-300">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Secção: Alterar Palavra-passe */}
                    <div className="bg-white dark:bg-slate-800 p-4 shadow sm:rounded-lg sm:p-8 transition-colors duration-300">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Secção: Eliminar Conta */}
                    <div className="bg-white dark:bg-slate-800 p-4 shadow sm:rounded-lg sm:p-8 transition-colors duration-300">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
        </AuthenticatedLayout>
    );
}