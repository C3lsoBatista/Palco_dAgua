import React, { useState } from 'react';

function SidebarLinkGroup({ children, activecondition }) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li 
      // Mudança de bg-linear-to-r para bg-gradient-to-r (Padrão correto)
      className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-gradient-to-r transition-colors ${
        activecondition 
          ? 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700/20'
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;