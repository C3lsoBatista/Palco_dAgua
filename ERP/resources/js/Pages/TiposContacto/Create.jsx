import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        ativo: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tipos-contacto.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Novo Tipo de Contacto</h2>}>
            <Head title="Novo Tipo de Contacto" />

            <div className="py-8 px-4 max-w-xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <InputLabel value="Nome" />
                            <TextInput
                                className="mt-1 w-full"
                                value={data.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                isFocused
                            />
                            <InputError message={errors.nome} className="mt-1" />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                id="ativo"
                                type="checkbox"
                                checked={data.ativo}
                                onChange={(e) => setData('ativo', e.target.checked)}
                                className="rounded border-gray-300"
                            />
                            <InputLabel htmlFor="ativo" value="Ativo" />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link href={route('tipos-contacto.index')}>
                                <SecondaryButton type="button">Cancelar</SecondaryButton>
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'A guardar...' : 'Guardar'}
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
