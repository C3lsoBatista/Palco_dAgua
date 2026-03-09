import React from 'react';
import Modal from '@/Components/Modal';

const MosaicModal = ({ show, onClose, title, children, footer, maxWidth = 'md' }) => (
    <Modal show={show} onClose={onClose} maxWidth={maxWidth}>
        <div className="bg-white dark:bg-slate-800 shadow-2xl relative border dark:border-slate-700 overflow-hidden rounded-lg">
            {/* Botão Fechar X */}
            <button 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10" 
                onClick={onClose}
            >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"/>
                </svg>
            </button>
            
            <div className="p-8">
                {title && (
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                            {title}
                        </h2>
                    </div>
                )}
                
                <div className="relative">
                    {children}
                </div>

                {footer && (
                    <div className="flex justify-end gap-3 pt-6 border-t dark:border-slate-700 mt-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    </Modal>
);

export default MosaicModal;