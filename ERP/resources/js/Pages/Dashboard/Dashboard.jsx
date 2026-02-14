import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Importação dos Cartões


export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="ERP Palco d'Água - Dashboard" />

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Painel de Controlo</h1>
            </div>

            <div className="grid grid-cols-12 gap-6">

            </div>
        </AuthenticatedLayout>
    );
}