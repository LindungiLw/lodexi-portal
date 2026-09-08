import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Portal({ health }) {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: 'Halo! Saya adalah Asisten AI LODEX. Ada yang bisa saya bantu hari ini dari dokumen internal Anda?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

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
        <div className="min-h-screen bg-slate-900">
            <Head title="AI Portal" />
            
            {/* Header */}
            <header className="bg-slate-800 shadow border-b border-slate-700">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            {/* Custom SVG Logo based on the Circuit/Line-Art Concept */}
                            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 25 15 C 25 15, 25 75, 25 75 C 25 85, 35 85, 35 85 L 85 85" stroke="#B1E5E6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M 45 35 C 45 35, 45 65, 45 65 C 45 70, 50 70, 50 70 L 75 70" stroke="#F29191" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="25" cy="15" r="4" fill="#B1E5E6"/>
                                <circle cx="85" cy="85" r="4" fill="#B1E5E6"/>
                                <circle cx="45" cy="35" r="4" fill="#F29191"/>
                                <circle cx="75" cy="70" r="4" fill="#F29191"/>
                            </svg>
                            
                            {/* Custom Typography for LODEX */}
                            <h2 className="text-2xl font-black leading-tight tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-lodex-cyan to-lodex-coral uppercase" style={{ fontFamily: '"Inter", "Figtree", sans-serif' }}>
                                L<span className="text-white">O</span>DEXI <span className="text-sm font-normal tracking-normal text-slate-400">AI Portal</span>
                            </h2>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${health?.status === 'ok' ? 'bg-lodex-cyan text-slate-900' : 'bg-lodex-coral text-white'}`}>
                            AI Engine: {health?.status === 'ok' ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-slate-800 shadow-xl sm:rounded-2xl border border-slate-700 flex flex-col h-[75vh]">
                        
                        {/* Chat History Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {chatHistory.map((chat, idx) => (
                                <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${chat.role === 'user' ? 'bg-lodex-cyan text-slate-900 rounded-tr-none' : 'bg-slate-700 text-white rounded-tl-none border border-slate-600'}`}>
                                        <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{chat.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-700 text-white p-4 rounded-2xl rounded-tl-none border border-slate-600 animate-pulse">
                                        <span className="text-lodex-coral-light">AI sedang berpikir...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-slate-700 p-4 bg-slate-800">
                            <form onSubmit={handleAsk} className="flex space-x-4">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Tanyakan sesuatu dari perpustakaan..."
                                    className="flex-1 rounded-xl bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-lodex-cyan focus:ring-lodex-cyan shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !query.trim()}
                                    className="inline-flex items-center rounded-xl bg-lodex-coral px-6 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-lodex-coral-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lodex-coral disabled:opacity-50 transition-colors"
                                >
                                    Tanya AI
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
