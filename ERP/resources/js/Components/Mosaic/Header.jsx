import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';

/**
 * Componente de Cabeçalho (Header).
 * Contém o controlo da Sidebar para mobile e o menu de opções do utilizador.
 * * @param {Object} props
 * @param {boolean} props.sidebarOpen - Estado atual da sidebar.
 * @param {function} props.setSidebarOpen - Função para alternar o estado da sidebar.
 */
export default function Header({ sidebarOpen, setSidebarOpen }) {
    // Obtemos o utilizador logado diretamente do Inertia
    const user = usePage().props.auth.user;

    return (
        <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    
                    {/* Lado Esquerdo: Botão Hamburger (Apenas Mobile) */}
                    <div className="flex">
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Abrir menu lateral</span>
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>
                    </div>

                    {/* Lado Direito: Menu de Utilizador (Dropdown) */}
                    <div className="flex items-center space-x-3">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="inline-flex items-center justify-center group">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-semibold mr-2 transition-colors group-hover:bg-slate-300 dark:group-hover:bg-slate-600">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                        {user.name}
                                    </span>
                                    <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
                                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="right">
                                <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Terminar Sessão
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </header>
    );
}