import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import AdminDashboard from '@/Pages/Dashboard/UsersDashboards/AdminDashboard';
import FinanceDashboard from '@/Pages/Dashboard/UsersDashboards/FinanceDashboard';
import TechnicianDashboard from '@/Pages/Dashboard/UsersDashboards/TechnicianDashboard';

/**
 * Dashboard Maestro.
 * O papel (role) decide o LAYOUT.
 * As permissões (permissions) decidem as AÇÕES dentro do layout.
 */
export default function Dashboard() {
    const { auth } = usePage().props;
    
    // Normalizamos para evitar erros com maiúsculas da BD
    const role = auth.user?.role?.toLowerCase() || 'utilizador'; 

    // Mapeamento de componentes (Clean Code: evita múltiplos &&)
    const dashboards = {
        admin: <AdminDashboard />,
        financeiro: <FinanceDashboard />,
        técnico: <TechnicianDashboard />,
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Dashboard - ${role.charAt(0).toUpperCase() + role.slice(1)}`} />

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                    Olá, {auth.user?.name} 👋
                </h1>
            </div>

            <div className="animate-in fade-in duration-500">
                {/* Se o dashboard existe no mapeamento, renderiza. Se não, mostra o aviso. */}
                {dashboards[role] || (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-200 dark:border-amber-800 rounded-lg">
                        Aviso: O teu perfil <span className="font-bold">({role})</span> não tem um painel configurado.
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}