import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Transition from '@/utils/Transition'; // Verifica se o caminho está correto (../utils ou ../../utils consoante a tua pasta)

export default function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Buscar os dados do utilizador autenticado no Laravel
  const { auth } = usePage().props;
  const user = auth?.user;

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]); 

  // Fechar com a tecla ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]); 

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
            {user ? user.name.charAt(0).toUpperCase() : 'A'}
        </div>
        <div className="flex items-center truncate">
          {/* CORREÇÃO: Adicionado text-gray-600 para ficar igual ao template no modo Claro */}
          <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
            {user ? user.name : 'Administrador'}
          </span>
          {/* CORREÇÃO: Adicionado dark:text-gray-500 na seta para igualar o template */}
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            {/* CORREÇÃO: Exibe o nome em cima e o Perfil/Cargo em baixo (Removido o email) */}
            <div className="font-medium text-gray-800 dark:text-gray-100">{user ? user.name : 'Palco d\'Água'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">Administrador de Sistema</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center py-1 px-3"
                href={route('profile.edit')}
                onClick={() => setDropdownOpen(false)}
              >
                Definições
              </Link>
            </li>
            <li>
              {/* CORREÇÃO: Cor alterada de vermelho para violeta, exatamente como no template */}
              <Link
                className="font-medium text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center py-1 px-3"
                href={route('logout')}
                method="post"
                as="button"
                onClick={() => setDropdownOpen(false)}
              >
                Terminar Sessão
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}