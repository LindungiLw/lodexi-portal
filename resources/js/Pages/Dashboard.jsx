import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { UploadCloud, FileText, Key, Copy, Eye, EyeOff, PlusCircle, Trash2, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('knowledge');
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);

    // AI Testing State
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: 'Halo! Saya adalah Asisten AI LODEXI. Silakan uji coba saya dengan bertanya seputar dokumen yang telah Anda unggah.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Data
    const mockApiKey = "lodexi_sk_live_9a8b7c6d5e4f3g2h1j0k";
    
    const mockDocuments = [
        { id: 1, name: "HR_Guidelines_2026.pdf", size: "2.4 MB", status: "Ingested", date: "2026-09-10" },
        { id: 2, name: "Product_Catalog_Q3.pdf", size: "5.1 MB", status: "Processing", date: "2026-09-10" },
        { id: 3, name: "API_Documentation.docx", size: "1.2 MB", status: "Ingested", date: "2026-09-08" },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(mockApiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = query;
        setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setQuery('');
        setIsLoading(true);

        try {
            // Memanggil API Backend Laravel yang akan diteruskan ke Python
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ question: userMsg, limit: 3 })
            });
            const data = await response.json();
            
            setChatHistory(prev => [...prev, { role: 'assistant', content: data.answer || "Maaf, tidak ada jawaban dari dokumen." }]);
        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'assistant', content: "Terjadi kesalahan saat menghubungi server AI." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <h2 className="flex items-center text-xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                        <span className="bg-gray-100 dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                            <span className="text-cyan-500">Control Panel</span>
                        </span>
                    </h2>
                    <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-full border border-gray-200 dark:border-gray-700">
                        <button 
                            onClick={() => setActiveTab('knowledge')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                activeTab === 'knowledge' 
                                ? 'bg-cyan-500 text-white shadow-md' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            Knowledge Base
                        </button>
                        <button 
                            onClick={() => setActiveTab('apikeys')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                activeTab === 'apikeys' 
                                ? 'bg-coral-500 text-white shadow-md' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            API Keys
                        </button>
                        <button 
                            onClick={() => setActiveTab('playground')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center ${
                                activeTab === 'playground' 
                                ? 'bg-indigo-500 text-white shadow-md' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            AI Playground
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* KNOWLEDGE BASE TAB */}
                    {activeTab === 'knowledge' && (
                        <div className="space-y-6">
                            {/* Drag and Drop Zone */}
                            <div className="overflow-hidden bg-white/50 backdrop-blur-md shadow-sm sm:rounded-2xl dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-8">
                                <div className="border-2 border-dashed border-cyan-300 dark:border-cyan-700 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all">
                                    <div className="bg-cyan-100 dark:bg-cyan-900/50 p-4 rounded-full mb-4">
                                        <UploadCloud className="w-10 h-10 text-cyan-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Upload your Knowledge Base</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                                        Drag and drop your PDF, DOCX, or TXT files here. Our AI engine will automatically ingest and vectorize your documents.
                                    </p>
                                    <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                        Select Files
                                    </button>
                                </div>
                            </div>

                            {/* Document List */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-cyan-500" />
                                        Ingested Documents
                                    </h3>
                                    <span className="text-sm text-gray-500">{mockDocuments.length} files total</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Document Name</th>
                                                <th className="px-6 py-4 font-medium">Size</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium">Date Added</th>
                                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {mockDocuments.map((doc) => (
                                                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
                                                        <FileText className="w-4 h-4 mr-3 text-gray-400" />
                                                        {doc.name}
                                                    </td>
                                                    <td className="px-6 py-4">{doc.size}</td>
                                                    <td className="px-6 py-4">
                                                        {doc.status === 'Ingested' ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                                <div className="w-3 h-3 mr-1 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                                                Processing
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">{doc.date}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-red-500 hover:text-red-700 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* API KEYS TAB */}
                    {activeTab === 'apikeys' && (
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-coral-500 rounded-full blur-3xl opacity-20"></div>
                                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
                                                <Key className="w-6 h-6 text-coral-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">Production API Key</h3>
                                                <p className="text-gray-400 text-sm">Use this key to authenticate requests to LODEXI Core</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex-1 w-full">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Secret Key</p>
                                            <div className="font-mono text-lg tracking-wider text-green-400">
                                                {showKey ? mockApiKey : '••••••••••••••••••••••••••••••••'}
                                            </div>
                                        </div>
                                        <div className="flex space-x-3 w-full md:w-auto">
                                            <button 
                                                onClick={() => setShowKey(!showKey)}
                                                className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm font-medium"
                                            >
                                                {showKey ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                                {showKey ? 'Hide' : 'Reveal'}
                                            </button>
                                            <button 
                                                onClick={handleCopy}
                                                className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-coral-500 hover:bg-coral-600 transition-colors rounded-lg text-sm font-medium text-white"
                                            >
                                                {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold shadow-sm">
                                    <PlusCircle className="w-5 h-5 mr-2 text-cyan-500" />
                                    Generate New API Key
                                </button>
                            </div>
                        </div>
                    )}

                    {/* AI PLAYGROUND TAB */}
                    {activeTab === 'playground' && (
                        <div className="max-w-4xl mx-auto">
                            <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col h-[65vh]">
                                
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">AI Testing Playground</h3>
                                        <p className="text-xs text-gray-500">Test your ingested documents here before deploying your API</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="flex h-3 w-3 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-300">Core Connected</span>
                                    </div>
                                </div>

                                {/* Chat History Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                                    {chatHistory.map((chat, idx) => (
                                        <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${chat.role === 'user' ? 'bg-indigo-500 text-white rounded-br-sm' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-sm'}`}>
                                                <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{chat.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-sm border border-gray-200 dark:border-gray-700 flex space-x-2 items-center">
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                                    <form onSubmit={handleAsk} className="flex space-x-4">
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Ask your knowledge base..."
                                            className="flex-1 rounded-xl bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !query.trim()}
                                            className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
