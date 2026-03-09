import React, { useState, useEffect } from 'react';
import { Head, router, usePage, useForm } from '@inertiajs/react';

// Layout e Componentes
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import Pagination from '@/Components/Pagination'; 
import MosaicModal from '@/Components/MosaicModal';

export default function Index({ tipos, filters, counts }) {
    // A paginação do Laravel coloca os dados dentro de .data
    const { data: items, current_page, per_page, total } = tipos;
    
    // --- ESTADOS DE CONTROLO DE UI ---
    const [tipoToDelete, setTipoToDelete] = useState(null); 
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [tipoToEdit, setTipoToEdit] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);

    // Sincronizamos o estado local com os filtros vindos do URL via props
    const activeTab = filters.tab || 'Todos';
    const dateRange = parseInt(filters.dateRange) || 4;

    const createForm = useForm({ nome: '' });
    const editForm = useForm({ nome: '', ativo: true });

    const dateOptions = [
        { id: 0, label: 'Hoje' },
        { id: 1, label: 'Últimos 7 Dias' },
        { id: 2, label: 'Último Mês' },
        { id: 3, label: 'Últimos 12 Meses' },
        { id: 4, label: 'Todo o tempo' },
    ];

    // --- GESTÃO DE FILTRAGEM VIA URL (SERVER-SIDE) ---
    // Esta função centraliza todas as mudanças de estado que exigem novo pedido ao servidor
    const updateFilters = (newFilters) => {
        router.get(route('tipos-contacto.index'), {
            tab: activeTab,
            dateRange: dateRange,
            ...newFilters // Sobrescreve com o novo filtro (aba, data ou página)
        }, {
            preserveState: true,
            replace: true // Evita encher o histórico do browser com cada clique
        });
    };

    const handleTabChange = (tab) => updateFilters({ tab, page: 1 });
    const handleDateChange = (id) => {
        setIsDateOpen(false);
        updateFilters({ dateRange: id, page: 1 });
    };

    useEffect(() => {
        if (tipoToEdit) editForm.setData({ nome: tipoToEdit.nome || '', ativo: !!tipoToEdit.ativo });
    }, [tipoToEdit]);

    // --- Handlers de Ações ---
    const handleRestore = (id) => router.patch(route('tipos-contacto.restore', id));
    
    const handleToggleActive = (id) => {
        if (!id) return;
        router.patch(route('tipos-contacto.toggle-active', id), {}, { 
            onSuccess: () => { setTipoToDelete(null); setTipoToEdit(null); } 
        });
    };
    
    const handleConfirmDelete = () => { 
        if (!tipoToDelete) return; 
        router.delete(route('tipos-contacto.destroy', tipoToDelete.id), { 
            onFinish: () => setTipoToDelete(null) 
        }); 
    };

    const submitCreate = (e) => { 
        e.preventDefault(); 
        createForm.post(route('tipos-contacto.store'), { 
            onSuccess: () => { setShowCreateModal(false); createForm.reset(); } 
        }); 
    };

    const submitEdit = (e) => { 
        e.preventDefault(); 
        if (!tipoToEdit) return;
        editForm.put(route('tipos-contacto.update', tipoToEdit.id), { 
            onSuccess: () => setTipoToEdit(null) 
        }); 
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

    return (
        <AuthenticatedLayout>
            <Head title="Tipos de Contacto" />

            <div className="sm:flex sm:justify-between sm:items-center mb-8 px-4 sm:px-0">
                <h1 className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold tracking-tight uppercase">Tipos de Contacto</h1>
                <button onClick={() => setShowCreateModal(true)} className="btn bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm flex items-center py-2.5 px-4 rounded-lg transition-all shadow-indigo-200 dark:shadow-none">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" /></svg>
                    <span className="ml-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Novo Tipo</span>
                </button>
            </div>

            {/* Barra de Filtros - Agora chama handleTabChange */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5 gap-4 px-4 sm:px-0 font-medium">
                <ul className="flex flex-wrap -m-1">
                    {['Todos', 'Ativos', 'Inativo', 'Arquivado'].map((tab) => (
                        <li key={tab} className="m-1">
                            <button onClick={() => handleTabChange(tab)} className={`inline-flex items-center justify-center text-sm px-3 py-1.5 rounded-full border transition-all ${activeTab === tab ? 'bg-indigo-500 text-white border-transparent shadow-md' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
                                {tab} <span className={`ml-1.5 text-xs font-bold ${activeTab === tab ? 'text-indigo-200' : 'text-slate-400'}`}>{counts[tab]}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="relative inline-flex">
                    <button className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 py-2.5 px-4 rounded-lg shadow-sm" onClick={() => setIsDateOpen(!isDateOpen)}>
                        <svg className="mr-2 fill-current text-slate-400 w-4 h-4" viewBox="0 0 16 16"><path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" /><path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" /></svg>
                        <span className="text-sm font-semibold">{dateOptions.find(o => o.id === dateRange)?.label}</span>
                        <svg className="ml-1 fill-current text-slate-400 w-3 h-3" viewBox="0 0 11 7"><path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" /></svg>
                    </button>
                    {isDateOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsDateOpen(false)}></div>
                            <div className="absolute top-full right-0 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg z-50 mt-1 overflow-hidden">
                                {dateOptions.map((opt) => (
                                    <button key={opt.id} className={`flex items-center w-full text-left text-xs py-2.5 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${dateRange === opt.id ? 'text-indigo-500 font-bold bg-slate-50 dark:bg-slate-700/50' : 'text-slate-600 dark:text-slate-300'}`} onClick={() => handleDateChange(opt.id)}>{opt.label}</button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden mx-4 sm:mx-0">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300 text-sm border-collapse">
                        <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left tracking-wider">Nome</th>
                                <th className="px-4 py-3 text-center tracking-wider">Estado</th>
                                <th className="px-4 py-3 text-center whitespace-nowrap tracking-wider">Criado</th>
                                <th className="px-4 py-3 text-center whitespace-nowrap tracking-wider">Atualizado</th>
                                <th className="px-4 py-3 text-center text-rose-500 font-bold tracking-wider">Eliminado</th>
                                <th className="px-4 py-3 text-center w-px tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {items.length > 0 ? (
                                items.map((tipo) => {
                                    const isDeleted = !!tipo.deleted_at;
                                    const mutedClass = isDeleted ? "text-slate-400 dark:text-slate-500 italic pointer-events-none select-none" : "text-slate-800 dark:text-slate-100 font-medium";
                                    return (
                                        <tr key={tipo.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors">
                                            <td className={`px-4 py-4 ${mutedClass}`}>{tipo.nome}</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${isDeleted ? 'bg-slate-100 text-slate-500 dark:bg-slate-700' : (tipo.ativo ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20')}`}>
                                                    {isDeleted ? 'Arquivado' : (tipo.ativo ? 'Ativo' : 'Inativo')}
                                                </span>
                                            </td>
                                            <td className={`px-4 py-4 text-center text-xs ${mutedClass}`}>{formatDate(tipo.created_at)}</td>
                                            <td className={`px-4 py-4 text-center text-xs ${mutedClass}`}>{formatDate(tipo.updated_at)}</td>
                                            <td className="px-4 py-4 text-center text-xs text-rose-500 font-bold">{formatDate(tipo.deleted_at)}</td>
                                            <td className="px-4 py-4 w-px">
                                                <div className="flex justify-center gap-2">
                                                    {isDeleted ? (
                                                        <button onClick={() => handleRestore(tipo.id)} className="btn-xs bg-emerald-50 dark:bg-emerald-500/10 border-transparent text-emerald-600 hover:bg-emerald-100 font-bold px-3 py-2 flex items-center shadow-sm transition-all whitespace-nowrap"><svg className="w-3.5 h-3.5 fill-current mr-1.5" viewBox="0 0 16 16"><path d="M12.4 3.6c-2.4-2.4-6.4-2.4-8.8 0L1.3 5.9V0H0v8h8V6.7H3.6l2.3-2.3c1.7-1.7 4.5-1.7 6.2 0 1.7 1.7 1.7 4.5 0 6.2s-4.5 1.7-6.2 0l-.9-.9-1.4 1.4.9.9c2.4 2.4 6.4 2.4 8.8 0 2.4-2.4 2.4-6.4 0-8.8z"/></svg>Recuperar</button>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => setTipoToEdit(tipo)} className="btn-xs bg-white dark:bg-slate-700 border border-slate-200 text-slate-600 dark:text-slate-300 font-bold px-2.5 py-2 flex items-center shadow-sm hover:border-slate-300 transition-colors"><svg className="w-3.5 h-3.5 fill-current mr-1.5 text-slate-400" viewBox="0 0 16 16"><path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/></svg>Editar</button>
                                                            <button onClick={() => handleToggleActive(tipo.id)} className={`btn-xs border-transparent font-bold px-2.5 py-2 flex items-center shadow-sm transition-colors ${tipo.ativo ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 hover:bg-emerald-100'}`}><svg className="w-3.5 h-3.5 fill-current mr-2" viewBox="0 0 16 16"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/></svg>{tipo.ativo ? 'Desativar' : 'Ativar'}</button>
                                                            <button onClick={() => setTipoToDelete(tipo)} className="btn-xs bg-rose-50 dark:bg-rose-500/10 border-transparent text-rose-500 font-bold px-2.5 py-2 flex items-center shadow-sm hover:bg-rose-100 transition-colors"><svg className="w-3.5 h-3.5 fill-current mr-2" viewBox="0 0 16 16"><path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/></svg>Apagar</button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="6" className="py-12 px-4 text-center text-slate-500 italic text-sm">Nenhum registo encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginação Real (Server-side) */}
            <Pagination 
                totalItems={total} 
                startIndex={(current_page - 1) * per_page} 
                itemsPerPage={per_page} 
                currentPage={current_page} 
                totalPages={tipos.last_page} 
                onPageChange={(page) => updateFilters({ page })} 
            />

            {/* MODAIS */}
            <MosaicModal 
                show={!!tipoToDelete} 
                onClose={() => setTipoToDelete(null)} 
                title={tipoToDelete ? `Eliminar "${tipoToDelete.nome}"?` : "Eliminar?"}
                footer={(
                    <>
                        <button onClick={() => setTipoToDelete(null)} className="btn bg-white dark:bg-slate-700 border border-slate-200 text-slate-600 dark:text-slate-200 font-bold uppercase text-[10px] tracking-widest px-5 py-2.5 rounded-lg">Cancelar</button>
                        {tipoToDelete && (
                            <>
                                <button onClick={() => handleToggleActive(tipoToDelete.id)} className="btn bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase text-[10px] tracking-widest px-5 py-2.5 rounded-lg shadow-sm flex items-center"><svg className="w-3.5 h-3.5 fill-current mr-2" viewBox="0 0 16 16"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/></svg>Desativar</button>
                                <button onClick={handleConfirmDelete} className="btn bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase text-[10px] tracking-widest px-5 py-2.5 rounded-lg shadow-lg flex items-center"><svg className="w-3.5 h-3.5 fill-current mr-2" viewBox="0 0 16 16"><path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/></svg>Apagar</button>
                            </>
                        )}
                    </>
                )}
            >
                <div className="text-left space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 shadow-inner"><svg className="w-8 h-8 fill-current" viewBox="0 0 32 32"><path d="M13 15h2v6h-2zM17 15h2v6h-2zM20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z"/></svg></div>
                    </div>
                    <p className="font-bold text-rose-600 dark:text-rose-400 border-l-2 border-rose-500 pl-3 italic text-xs uppercase tracking-wider">Aviso de Segurança</p>
                    <p className="pl-3 text-sm">Registos arquivados há mais de 3 meses são removidos permanentemente. Recomendamos a <strong>Desativação</strong>.</p>
                </div>
            </MosaicModal>

            <MosaicModal 
                show={showCreateModal || !!tipoToEdit} 
                onClose={() => { setShowCreateModal(false); setTipoToEdit(null); }}
                title={tipoToEdit ? 'Editar Tipo' : 'Novo Tipo'}
                footer={(
                    <>
                        <button type="button" onClick={() => { setShowCreateModal(false); setTipoToEdit(null); }} className="btn bg-white dark:bg-slate-700 border border-slate-200 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-widest py-2.5 px-5 rounded-lg">Cancelar</button>
                        <PrimaryButton 
                            className="py-2.5 px-7 bg-indigo-500 hover:bg-indigo-600 font-bold uppercase text-[10px] tracking-widest shadow-md rounded-lg transition-all" 
                            disabled={tipoToEdit ? editForm.processing : createForm.processing}
                            onClick={tipoToEdit ? submitEdit : submitCreate}
                        >
                            {tipoToEdit ? 'Atualizar' : 'Guardar'}
                        </PrimaryButton>
                    </>
                )}
            >
                <form className="text-left space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <InputLabel value="Nome" className="mb-2 text-[10px] font-black tracking-widest opacity-60 uppercase" />
                        <TextInput className="w-full text-sm font-semibold py-3 px-4 shadow-inner border-slate-200 dark:border-slate-700" value={tipoToEdit ? editForm.data.nome : createForm.data.nome} onChange={e => (tipoToEdit ? editForm : createForm).setData('nome', e.target.value)} isFocused />
                        <InputError message={tipoToEdit ? editForm.errors.nome : createForm.errors.nome} className="mt-2 text-xs" />
                    </div>
                    {tipoToEdit && (
                        <div className="flex items-center gap-2 py-3 px-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                            <Checkbox checked={editForm.data.ativo} onChange={e => editForm.setData('ativo', e.target.checked)} />
                            <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wide">Registo Ativo</span>
                        </div>
                    )}
                </form>
            </MosaicModal>
        </AuthenticatedLayout>
    );
}