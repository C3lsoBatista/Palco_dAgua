import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

/**
 * Componente de Navegação Lateral (Sidebar).
 * Responsável por apresentar o logótipo e os links de navegação principais do ERP.
 * * @param {Object} props
 * @param {boolean} props.sidebarOpen - Estado que indica se a sidebar está aberta (mobile).
 * @param {function} props.setSidebarOpen - Função para alterar o estado da sidebar.
 */
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    return (
        <aside 
            className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
        >
            {/* Cabeçalho da Sidebar (Logótipo e Botão de Fechar no Mobile) */}
            <div className="flex justify-between mb-10 pr-3 sm:px-2">
                <Link href="/">
                    <ApplicationLogo className="h-8 w-auto fill-current text-indigo-500" />
                </Link>
                
                <button 
                    className="lg:hidden text-slate-500 hover:text-slate-400" 
                    onClick={() => setSidebarOpen(false)} 
                    aria-controls="sidebar" 
                    aria-expanded={sidebarOpen}
                >
                    <span className="sr-only">Fechar menu lateral</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                    </svg>
                </button>
            </div>

            {/* Links de Navegação */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                        <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Páginas</span>
                    </h3>
                    <ul className="mt-3">
                        <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${route().current('dashboard') ? 'bg-slate-900' : ''}`}>
                            <NavLink 
                                href={route('dashboard')} 
                                active={route().current('dashboard')}
                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${route().current('dashboard') ? 'hover:text-slate-200' : ''}`}
                            >
                                <div className="flex items-center">
                                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                        <path className={`fill-current ${route().current('dashboard') ? 'text-indigo-500' : 'text-slate-400'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                                        <path className={`fill-current ${route().current('dashboard') ? 'text-indigo-600' : 'text-slate-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                                        <path className={`fill-current ${route().current('dashboard') ? 'text-indigo-200' : 'text-slate-400'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                                    </svg>
                                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Dashboard
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                        {/* Futuros links (Ex: Faturas, Clientes) entram aqui */}
                    </ul>
                </div>
            </div>
        </aside>
    );
}