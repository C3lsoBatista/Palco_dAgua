import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Transition from '@/utils/Transition';

export default function DropdownNotifications({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]); // <-- Dependência Injetada

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]); // <-- Dependência Injetada

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ${dropdownOpen ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notificações</span>
        <svg className="fill-current text-gray-500/80 dark:text-gray-400/80" width="16" height="16" viewBox="0 0 16 16">
          <path d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
          <path d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z" />
        </svg>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-4">Notificações</div>
          <ul>
            <li className="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                href="#0"
                onClick={() => setDropdownOpen(false)} // <-- Otimizado para fecho direto
              >
                <span className="block text-sm mb-2">📣 <span className="font-medium text-gray-800 dark:text-gray-100">Bem-vindo ao ERP</span> Sistema atualizado com sucesso.</span>
                <span className="block text-xs font-medium text-gray-400 dark:text-gray-500">Hoje</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}