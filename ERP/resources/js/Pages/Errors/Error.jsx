import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

/**
 * Custom Error Page
 * Encaixa perfeitamente no AuthenticatedLayout como a Dashboard.
 * Utiliza SVGs dinâmicos para cada tipo de erro.
 */
export default function Error({ status }) {
    // Garantir que a função route() existe para não quebrar Sidebar/Header
    if (typeof window !== 'undefined' && typeof window.route === 'undefined') {
        window.route = (name) => {
            const routes = {
                'dashboard': '/dashboard',
                'profile.edit': '/profile',
                'logout': '/logout',
                'tipos-contacto.index': '/tipos-contacto',
                'auditoria.index': '/auditoria',
            };
            return routes[name] || '#';
        };
    }

    const { auth } = usePage().props;

    const title = {
        503: '503: Serviço Indisponível',
        500: '500: Erro de Servidor',
        404: '404: Página Não Encontrada',
        403: '403: Acesso Negado',
    }[status] || 'Erro';

    const description = {
        503: 'Desculpe, estamos em manutenção para melhorias. Por favor, volte mais tarde.',
        500: 'Ups, algo correu mal nos nossos servidores internos.',
        404: "Ups... esta página não existe. Tente procurar outra coisa!",
        403: 'Desculpe, o seu perfil não tem permissões para aceder a esta área.',
    }[status] || 'Ocorreu um erro inesperado.';

    // Mapeamento de SVGs fornecidos - Todos em Azul
    const icons = {
        503: ( // Página em manutenção
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-full h-full fill-blue-500/80 dark:fill-blue-400/80">
                <path d="M240 104C240 73.1 265.1 48 296 48C326.9 48 352 73.1 352 104C352 134.9 326.9 160 296 160C265.1 160 240 134.9 240 104zM42.5 245.3C48.4 233.4 62.8 228.6 74.7 234.6L99.3 246.9L111.5 226.5C130.4 195 164.7 176 201.1 176C247.3 176 288.8 206.5 301.6 251.4L333.8 364.1L426.7 410.5L452.5 367.5C458.3 357.9 468.7 352 479.9 352C491.1 352 501.6 357.9 507.3 367.5L603.3 527.5C609.2 537.4 609.4 549.7 603.7 559.7C598 569.7 587.5 576 576 576L384 576C372.5 576 361.8 569.8 356.2 559.8C350.6 549.8 350.7 537.5 356.6 527.6L402 451.8L53.3 277.5C41.4 271.6 36.6 257.2 42.6 245.3zM126.3 371.4L238.3 427.4C249.1 432.8 256 443.9 256 456L256 544C256 561.7 241.7 576 224 576C206.3 576 192 561.7 192 544L192 475.8L130.7 445.1L94.4 554.1C88.8 570.9 70.7 579.9 53.9 574.3C37.1 568.7 28.1 550.6 33.7 533.9L81.7 389.9C84.6 381.1 91.2 374 99.8 370.5C108.4 367 118.1 367.3 126.4 371.4z"/>
            </svg>
        ),
        500: ( // Erro de servidor
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-full h-full fill-blue-500/80 dark:fill-blue-400/80">
                <path d="M160 96C124.7 96 96 124.7 96 160L96 224C96 259.3 124.7 288 160 288L480 288C515.3 288 544 259.3 544 224L544 160C544 124.7 515.3 96 480 96L160 96zM376 168C389.3 168 400 178.7 400 192C400 205.3 389.3 216 376 216C362.7 216 352 205.3 352 192C352 178.7 362.7 168 376 168zM432 192C432 178.7 442.7 168 456 168C469.3 168 480 178.7 480 192C480 205.3 469.3 216 456 216C442.7 216 432 205.3 432 192zM160 352C124.7 352 96 380.7 96 416L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 416C544 380.7 515.3 352 480 352L160 352zM376 424C389.3 424 400 434.7 400 448C400 461.3 389.3 472 376 472C362.7 472 352 461.3 352 448C352 434.7 362.7 424 376 424zM432 448C432 434.7 442.7 424 456 424C469.3 424 480 434.7 480 448C480 461.3 469.3 472 456 472C442.7 472 432 461.3 432 448z"/>
            </svg>
        ),
        404: ( // Página não encontrada
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-full h-full fill-blue-500/80 dark:fill-blue-400/80">
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
            </svg>
        ),
        403: ( // Acesso negado
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-full h-full fill-blue-500/80 dark:fill-blue-400/80">
                <path d="M112 320C112 205.1 205.1 112 320 112C383.1 112 439.6 140.1 477.8 184.5C486.4 194.6 501.6 195.7 511.6 187.1C521.6 178.5 522.8 163.3 514.2 153.3C467.3 98.6 397.7 64 320 64C178.6 64 64 178.6 64 320L64 360C64 373.3 74.7 384 88 384C101.3 384 112 373.3 112 360L112 320zM570.5 267.1C567.8 254.1 555 245.8 542.1 248.6C529.2 251.4 520.8 264.1 523.6 277C526.5 290.9 528.1 305.3 528.1 320.1L528.1 360.1C528.1 373.4 538.8 384.1 552.1 384.1C565.4 384.1 576.1 373.4 576.1 360.1L576.1 320.1C576.1 302 574.2 284.3 570.6 267.2zM320 144C301 144 282.6 147 265.5 152.6C250.3 157.6 246.8 176.3 257.2 188.5C264.3 196.8 276 199.3 286.6 196.4C297.2 193.5 308.4 192 320 192C390.7 192 448 249.3 448 320L448 344.9C448 370.1 446.5 395.2 443.6 420.2C441.9 434.8 453 448 467.8 448C479.6 448 489.7 439.4 491.1 427.7C494.4 400.3 496.1 372.7 496.1 345L496.1 320.1C496.1 222.9 417.3 144.1 320.1 144.1zM214.7 212.7C205.6 202.1 189.4 201.3 180.8 212.3C157.7 242.1 144 279.4 144 320L144 344.9C144 369.1 141.4 393.3 136.2 416.8C132.8 432.4 144.1 447.9 160.1 447.9C170.6 447.9 180 440.9 182.3 430.6C188.7 402.5 192 373.8 192 344.8L192 319.9C192 292.7 200.5 267.5 214.9 246.8C222.1 236.4 222.9 222.2 214.7 212.6zM320 224C267 224 224 267 224 320L224 344.9C224 380.8 219.4 416.4 210.2 451C206.4 465.3 216.9 480 231.7 480C241.2 480 249.6 473.8 252.1 464.6C262.6 425.6 268 385.4 268 344.9L268 320C268 291.3 291.3 268 320 268C348.7 268 372 291.3 372 320L372 344.9C372 381.2 368.5 417.3 361.6 452.8C358.9 466.7 369.3 480 383.4 480C393.6 480 402.4 473 404.4 463C412.1 424.2 416 384.7 416 344.9L416 320C416 267 373 224 320 224zM344 320C344 306.7 333.3 296 320 296C306.7 296 296 306.7 296 320L296 344.9C296 404.8 285 464.2 263.5 520.1L257.6 535.4C252.8 547.8 259 561.7 271.4 566.4C283.8 571.1 297.7 565 302.4 552.6L308.3 537.3C331.9 475.9 344 410.7 344 344.9L344 320z"/></svg>
        ),
    };

    return (
        <AuthenticatedLayout>
            <Head title={title} />
            
            <div className="flex flex-col items-center justify-center min-h-[50vh] py-6 px-4 text-center animate-in fade-in duration-700">
                
                {/* Contentor do Ícone SVG - Estilo Dashboard */}
                <div className="relative mb-6 w-32 h-32 md:w-40 md:h-40 mx-auto transition-all duration-500 hover:scale-110 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/40 rounded-full blur-2xl opacity-50"></div>
                    <div className="relative z-10 w-full h-full p-2">
                        {icons[status] || icons[404]}
                    </div>
                </div>

                {/* Mensagem de Erro Centralizada */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
                    {title}
                </h2>
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
                    {description}
                </p>

                {/* Botão de Ação Estilizado (Matching the app theme) */}
                <Link
                    href="/"
                    className="inline-flex items-center px-8 py-3 bg-[#0f172a] hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                    Voltar ao Dashboard
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
