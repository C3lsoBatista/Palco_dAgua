import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                /* Configuração de Estilos:
                   1. Cores Base (Light Mode)
                   2. Cores Dark (dark:) - Fundo escuro e texto claro
                   3. Foco (blue) - Alinhado com a identidade do ERP
                */
                'rounded-md border-gray-300 shadow-sm ' +
                'focus:border-blue-500 focus:ring-blue-500 ' +
                'dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 ' +
                'dark:focus:ring-blue-500/50 ' +
                className
            }
            ref={localRef}
        />
    );
});