import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";

import ApplicationLogo from "@/Components/ApplicationLogo";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { url, props } = usePage();
  const auth = props?.auth || {};
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(
    localStorage.getItem("sidebar-expanded") === "true"
  );
  
  // Controle do recém-criado Menu de "Administração"
  const [adminOpen, setAdminOpen] = useState(url.includes('tipos-contacto') || url.includes('auditoria'));

  // Sincroniza a classe do body com o estado do menu
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Backdrop Mobile */}
      <div 
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        aria-hidden="true" 
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar Principal - Contentor Restaurado com Sombras e Bordas */}
      <aside 
        id="sidebar" 
        ref={sidebar} 
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} rounded-r-2xl shadow-sm`}
      >
        
        {/* Cabeçalho do Sidebar (Botão Fechar + Logo) */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Botão Fechar Mobile */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Fechar sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            {/* O shrink-0 impede que o logo fique esmagado quando a sidebar encolhe */}
            <ApplicationLogo className="fill-blue-500 w-8 h-8 shrink-0" />
            
            {/* O texto tem classes para desaparecer suavemente quando a sidebar é fechada */}
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              Palco d'Água
            </span>
          </Link>
        </div>

        {/* Links do Menu */}
        <div className="space-y-8">
          <div>
            {/* Título da Secção "Páginas" Restaurado */}
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Páginas</span>
            </h3>
            
            <ul className="mt-3">
              {/* Link Simples do Dashboard (Sem SidebarLinkGroup) */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-gradient-to-r transition-colors ${url === '/dashboard' || url === '/' ? 'from-blue-500/[0.12] dark:from-blue-500/[0.24] to-blue-500/[0.04]' : 'hover:bg-gray-100 dark:hover:bg-gray-700/20'}`}>
                <Link 
                  href="/dashboard" 
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${url === '/dashboard' || url === '/' ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${url === '/dashboard' || url === '/' ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                      <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>
              
              {/* --- DROPDOWN: Administração (Apenas Admin) --- */}
              {auth.roles && auth.roles.includes('Admin') && (
                <li className={`px-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-gradient-to-r transition-colors ${(url.startsWith('/tipos-contacto') || url.startsWith('/auditoria')) ? 'from-blue-500/[0.12] dark:from-blue-500/[0.24] to-blue-500/[0.04]' : 'hover:bg-gray-100 dark:hover:bg-gray-700/20'}`}>
                  <a 
                    href="#0" 
                    className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${(url.startsWith('/tipos-contacto') || url.startsWith('/auditoria')) ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSidebarExpanded(true);
                      setAdminOpen(!adminOpen);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className={`shrink-0 fill-current ${(url.startsWith('/tipos-contacto') || url.startsWith('/auditoria')) ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 640 640">
                          <path d="M102.8 57.3C108.2 51.9 116.6 51.1 123 55.3L241.9 134.5C250.8 140.4 256.1 150.4 256.1 161.1L256.1 210.7L346.9 301.5C380.2 286.5 420.8 292.6 448.1 320L574.2 446.1C592.9 464.8 592.9 495.2 574.2 514L514.1 574.1C495.4 592.8 465 592.8 446.2 574.1L320.1 448C292.7 420.6 286.6 380.1 301.6 346.8L210.8 256L161.2 256C150.5 256 140.5 250.7 134.6 241.8L55.4 122.9C51.2 116.6 52 108.1 57.4 102.7L102.8 57.3zM247.8 360.8C241.5 397.7 250.1 436.7 274 468L179.1 563C151 591.1 105.4 591.1 77.3 563C49.2 534.9 49.2 489.3 77.3 461.2L212.7 325.7L247.9 360.8zM416.1 64C436.2 64 455.5 67.7 473.2 74.5C483.2 78.3 485 91 477.5 98.6L420.8 155.3C417.8 158.3 416.1 162.4 416.1 166.6L416.1 208C416.1 216.8 423.3 224 432.1 224L473.5 224C477.7 224 481.8 222.3 484.8 219.3L541.5 162.6C549.1 155.1 561.8 156.9 565.6 166.9C572.4 184.6 576.1 203.9 576.1 224C576.1 267.2 558.9 306.3 531.1 335.1L482 286C448.9 253 403.5 240.3 360.9 247.6L304.1 190.8L304.1 161.1L303.9 156.1C303.1 143.7 299.5 131.8 293.4 121.2C322.8 86.2 366.8 64 416.1 63.9z"/>
                        </svg>
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Administração
                        </span>
                      </div>
                      {/* Dropdown Chevron */}
                      <div className="flex shrink-0 ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${adminOpen && 'rotate-180'} transition-transform duration-200`} viewBox="0 0 12 12">
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  
                  {/* Dropdown Menu Itens */}
                  <div className={`${adminOpen ? 'block' : 'hidden'}`}>
                    <ul className="pl-9 mt-2 space-y-2">
                      {/* Sub-item: Tipos de Contacto */}
                      <li>
                        <Link 
                          href={route('tipos-contacto.index')} 
                          className={`block text-sm transition duration-150 truncate ${url.startsWith('/tipos-contacto') ? 'text-blue-500 font-medium' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                          Tipos de Contacto
                        </Link>
                      </li>
                      {/* Sub-item: Auditorias */}
                      <li>
                        <Link 
                          href={route('auditoria.index')} 
                          className={`block text-sm transition duration-150 truncate ${url.startsWith('/auditoria') ? 'text-blue-500 font-medium' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                          Auditorias
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              
              {/* Sub-item: Changelog */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-gradient-to-r transition-colors ${url.startsWith('/changelog') ? 'from-blue-500/[0.12] dark:from-blue-500/[0.24] to-blue-500/[0.04]' : 'hover:bg-gray-100 dark:hover:bg-gray-700/20'}`}>
                <Link 
                  href={route('changelog.index')} 
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${url.startsWith('/changelog') ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${url.startsWith('/changelog') ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm2 1v6h10V5H3Z" />
                      <path d="M5 7h6v1H5V7Zm0 2h4v1H5V9Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Changelog
                    </span>
                  </div>
                </Link>
              </li>
              
              {/* Espaço para adicionares mais links no futuro... */}
              
            </ul>
          </div>
        </div>

        {/* Botão de Expandir / Colapsar (Restaurado) */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>

      </aside>
    </div>
  );
}

export default Sidebar;