export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                /* Adicionada a classe dark:text-slate-300 para garantir 
                   legibilidade sobre o fundo escuro do ERP */
                `block text-sm font-medium text-gray-700 dark:text-slate-300 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}