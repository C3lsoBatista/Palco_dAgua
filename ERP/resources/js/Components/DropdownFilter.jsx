import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";

export default function DropdownFilter({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Single Source of Truth para os filtros (Abordagem Declarativa React)
  const [filters, setFilters] = useState({
    directorIndirect: false,
    realTimeValue: false,
    topChannels: false,
    salesRefunds: false,
    lastOrder: false,
    totalSpent: false,
  });

  // Manipulador dinâmico de alterações nos checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // Função pura para limpar os filtros baseada no estado
  const handleClearFilters = () => {
    setFilters({
      directorIndirect: false,
      realTimeValue: false,
      topChannels: false,
      salesRefunds: false,
      lastOrder: false,
      totalSpent: false,
    });
  };

  // Fechar ao clicar fora (Com ciclo de vida corrigido)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) return;
      
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    
    // Cleanup de eventos obrigatório
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]); // <-- Dependência injetada

  // Fechar com a tecla ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]); // <-- Dependência injetada

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn px-2.5 bg-white dark:bg-gray-800 border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 text-gray-400 dark:text-gray-500"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg
          className="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full left-0 right-auto min-w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 pt-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
          align === "right"
            ? "md:left-auto md:right-0"
            : "md:left-0 md:right-auto"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">
            Filters
          </div>
          <ul className="mb-4">
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="directorIndirect"
                  className="form-checkbox"
                  checked={filters.directorIndirect}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium ml-2">Direct VS Indirect</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="realTimeValue"
                  className="form-checkbox"
                  checked={filters.realTimeValue}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium ml-2">Real Time Value</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="topChannels"
                  className="form-checkbox"
                  checked={filters.topChannels}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium ml-2">Top Channels</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="salesRefunds"
                  className="form-checkbox"
                  checked={filters.salesRefunds}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium ml-2">Sales VS Refunds</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="lastOrder"
                  className="form-checkbox"
                  checked={filters.lastOrder}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium ml-2">Last Order</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="totalSpent"
                  className="form-checkbox"
                  checked={filters.totalSpent}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium ml-2">Total Spent</span>
              </label>
            </li>
          </ul>
          <div className="py-2 px-3 border-t border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-700/20">
            <ul className="flex items-center justify-between">
              <li>
                <button
                  onClick={handleClearFilters}
                  className="btn-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500"
                >
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}