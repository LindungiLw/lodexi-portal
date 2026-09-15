import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Key, Copy, Eye, EyeOff, PlusCircle, CheckCircle2, MoreVertical, Shield, Clock, AlertCircle, Webhook, BrainCircuit, MessageSquareText, Trash2, X } from 'lucide-react';
import UpdateLlmSettingsForm from '../Profile/Partials/UpdateLlmSettingsForm';
import ApiQuickStart from './Partials/ApiQuickStart';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ApiKeys({ analytics, tokens, new_token }) {
    const [copiedKey, setCopiedKey] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [showNewTokenModal, setShowNewTokenModal] = useState(false);
    const [keyToDelete, setKeyToDelete] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    useEffect(() => {
        if (new_token) {
            setShowNewTokenModal(true);
        }
    }, [new_token]);

    const handleCopy = (id, keyString) => {
        navigator.clipboard.writeText(keyString);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const createKey = (e) => {
        e.preventDefault();
        post(route('dashboard.apikeys.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            },
        });
    };

    const confirmDelete = (id) => {
        setKeyToDelete(id);
    };

    const deleteKey = () => {
        if (!keyToDelete) return;
        router.delete(route('dashboard.apikeys.destroy', keyToDelete), {
            preserveScroll: true,
            onSuccess: () => setKeyToDelete(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white flex items-center">
                            <Key className="w-6 h-6 mr-3 text-[#F29191]" />
                            API Keys
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Manage your secret keys for authenticating requests to LODEXI Core API.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-slate-900 rounded-xl transition-all font-semibold shadow-sm text-sm"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create new secret key
                    </button>
                </div>
            }
        >
            <Head title="API Keys" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    {/* Security Warning Alert */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-2xl p-4 flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">Keep your keys secure</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-500/80 mt-1">
                                Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
                                We will automatically disable keys that we find have been leaked.
                            </p>
                        </div>
                    </div>

                    {/* Analytics Dashboard Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Requests */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                            <div className="p-3 bg-[#F29191]/10 rounded-xl text-[#F29191]">
                                <Webhook className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total API Requests</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics?.total_requests || 0}
                                </h3>
                            </div>
                        </div>

                        {/* Prompt Tokens */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                            <div className="p-3 bg-[#F29191]/10 rounded-xl text-[#F29191]">
                                <MessageSquareText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Prompt Tokens</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics?.prompt_tokens?.toLocaleString() || 0}
                                </h3>
                            </div>
                        </div>

                        {/* Completion Tokens */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                            <div className="p-3 bg-[#F29191]/10 rounded-xl text-[#F29191]">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Tokens</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics?.completion_tokens?.toLocaleString() || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* API Keys Table */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Secret Key Prefix</th>
                                        <th className="px-4 py-3">Created</th>
                                        <th className="px-4 py-3">Last Used</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {tokens && tokens.length > 0 ? tokens.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-4 py-3.5">
                                                <div className="font-medium text-gray-900 dark:text-white flex items-center">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center space-x-2">
                                                    <code className="bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-800 dark:text-gray-300 font-mono text-xs border border-gray-200 dark:border-slate-700">
                                                        [Hidden]
                                                    </code>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">
                                                {item.created_at}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    {item.last_used_at !== "Never" && <Clock className="w-3.5 h-3.5 mr-1.5 opacity-70" />}
                                                    {item.last_used_at}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-right">
                                                <button 
                                                    onClick={() => confirmDelete(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    title="Revoke Key"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                                No API keys found. Create one to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* LLM API Settings (BYOK) */}
                    <div className="bg-white p-4 shadow sm:rounded-2xl sm:p-8 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                        <UpdateLlmSettingsForm className="max-w-xl" />
                    </div>

                    {/* Developer Quick Start */}
                    <div className="bg-white p-4 shadow sm:rounded-2xl sm:p-8 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                        <ApiQuickStart />
                    </div>

                </div>
            </div>

            {/* Create Key Modal */}
            <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <form onSubmit={createKey} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Create new secret key
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Give your key a descriptive name to remember what it's used for.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Key Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. My AppScript Bot"
                            required
                            isFocused
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsCreateModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ms-3 bg-[#F29191] hover:bg-[#e06b6b] text-white" disabled={processing}>
                            Create secret key
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Display New Key Modal (Only shown once) */}
            <Modal show={showNewTokenModal} onClose={() => setShowNewTokenModal(false)}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                            <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                            Save your secret key
                        </h2>
                        <button onClick={() => setShowNewTokenModal(false)} className="text-gray-400 hover:text-gray-500">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <p className="text-sm text-yellow-700">
                            Please save this secret key somewhere safe and accessible. For security reasons, <strong>you won't be able to view it again</strong> through your Lodexi account. If you lose this secret key, you'll need to generate a new one.
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <code className="flex-1 bg-gray-100 dark:bg-slate-800 p-3 rounded-lg text-slate-800 dark:text-gray-200 font-mono text-sm border border-gray-200 dark:border-slate-700 break-all">
                            {new_token}
                        </code>
                        <button
                            onClick={() => handleCopy('new_token', new_token)}
                            className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
                            title="Copy Key"
                        >
                            {copiedKey === 'new_token' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton onClick={() => setShowNewTokenModal(false)}>
                            I saved my secret key
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={keyToDelete !== null} onClose={() => setKeyToDelete(null)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Revoke API Key
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to revoke this API key? Any applications using this key will immediately lose access. This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setKeyToDelete(null)}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={deleteKey} className="ms-3 bg-red-600 hover:bg-red-500 text-white">
                            Revoke Key
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
