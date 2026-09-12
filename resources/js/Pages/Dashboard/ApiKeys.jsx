import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Key, Copy, Eye, EyeOff, PlusCircle, CheckCircle2, MoreVertical, Shield, Clock, AlertCircle } from 'lucide-react';

export default function ApiKeys() {
    const [showKeys, setShowKeys] = useState({});
    const [copiedKey, setCopiedKey] = useState(null);

    // Mock Data for Multiple API Keys
    const mockKeys = [
        {
            id: 1,
            name: "Production Key",
            key: "lodexi_sk_live_9a8b7c6d5e4f3g2h1j0k",
            prefix: "lodexi_sk_live_...",
            created: "Sep 1, 2026",
            lastUsed: "2 minutes ago",
            status: "Active",
            environment: "Production"
        },
        {
            id: 2,
            name: "Development Key",
            key: "lodexi_sk_test_1k2j3h4g5f6e7d8c9b0a",
            prefix: "lodexi_sk_test_...",
            created: "Sep 5, 2026",
            lastUsed: "Never",
            status: "Active",
            environment: "Test"
        },
    ];

    const toggleShowKey = (id) => {
        setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCopy = (id, keyString) => {
        navigator.clipboard.writeText(keyString);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
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
                    <button className="flex items-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-slate-900 rounded-xl transition-all font-semibold shadow-sm text-sm">
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

                    {/* API Keys Table */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Secret Key</th>
                                        <th className="px-4 py-3">Environment</th>
                                        <th className="px-4 py-3">Created</th>
                                        <th className="px-4 py-3">Last Used</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {mockKeys.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-4 py-3.5">
                                                <div className="font-medium text-gray-900 dark:text-white flex items-center">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center space-x-2">
                                                    <code className="bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-800 dark:text-gray-300 font-mono text-xs border border-gray-200 dark:border-slate-700 w-48 truncate">
                                                        {showKeys[item.id] ? item.key : item.prefix}
                                                    </code>
                                                    <button
                                                        onClick={() => toggleShowKey(item.id)}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                                                        title={showKeys[item.id] ? "Hide Key" : "Reveal Key"}
                                                    >
                                                        {showKeys[item.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleCopy(item.id, item.key)}
                                                        className="text-gray-400 hover:text-[#F29191] focus:outline-none"
                                                        title="Copy Key"
                                                    >
                                                        {copiedKey === item.id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.environment === 'Production'
                                                        ? 'bg-[#F29191]/10 text-[#e06b6b] border-[#F29191]/20 dark:bg-[#F29191]/20 dark:text-[#ffb0b0]'
                                                        : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                                    }`}>
                                                    {item.environment === 'Production' ? <Shield className="w-3 h-3 mr-1" /> : null}
                                                    {item.environment}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">
                                                {item.created}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    {item.lastUsed !== "Never" && <Clock className="w-3.5 h-3.5 mr-1.5 opacity-70" />}
                                                    {item.lastUsed}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-right">
                                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
