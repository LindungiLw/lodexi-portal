import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Search, Menu, X, ArrowLeft, MonitorPlay } from 'lucide-react';

export default function DocsIndex({ content, navigation, currentPage }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Close mobile menu when changing page
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [currentPage]);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 font-sans">
            <Head title={`Documentation - ${currentPage}`} />

            {/* Top Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
                <div className="flex h-16 items-center px-4 md:px-8 max-w-8xl mx-auto justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 mr-4">
                            <ApplicationLogo className="h-8 w-auto" />
                            <span className="font-bold text-lg hidden sm:inline-block">Docs</span>
                        </Link>
                        
                        {/* Search Mock */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-500 w-64 cursor-text transition-colors hover:border-[#F29191] hover:ring-1 hover:ring-[#F29191]/20">
                            <Search className="w-4 h-4 opacity-50" />
                            <span>Search...</span>
                            <kbd className="ml-auto text-[10px] px-1.5 rounded border border-slate-300 dark:border-slate-700 font-sans bg-white dark:bg-slate-800">⌘K</kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href={route('dashboard')} className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#F29191] dark:text-slate-400 dark:hover:text-[#F29191] transition-colors">
                            <MonitorPlay className="w-4 h-4" />
                            Dashboard
                        </Link>
                        
                        <button 
                            className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="max-w-8xl mx-auto flex">
                
                {/* Left Sidebar (Navigation) */}
                <aside className={`
                    fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 pt-20 pb-10 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block md:w-64 lg:w-72 md:pt-8 shrink-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <nav className="px-4 md:px-6">
                        {Object.entries(navigation).map(([category, links]) => (
                            <div key={category} className="mb-8">
                                <h5 className="mb-3 font-semibold text-slate-900 dark:text-gray-200 uppercase tracking-wider text-xs">
                                    {category}
                                </h5>
                                <ul className="space-y-2 border-l border-slate-200 dark:border-slate-800 ml-2">
                                    {Object.entries(links).map(([slug, title]) => {
                                        const isActive = currentPage === slug;
                                        return (
                                            <li key={slug}>
                                                <Link
                                                    href={route('docs', { page: slug })}
                                                    className={`block pl-4 -ml-[1px] border-l text-sm transition-colors ${
                                                        isActive 
                                                        ? 'border-[#F29191] text-[#F29191] font-medium' 
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:border-slate-400 hover:text-slate-900 dark:hover:text-gray-300'
                                                    }`}
                                                >
                                                    {title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Mobile Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Center Content Area */}
                <main className="flex-1 min-w-0 px-4 md:px-10 lg:px-12 py-8 lg:py-12">
                    <div 
                        className="prose prose-slate dark:prose-invert max-w-4xl prose-headings:font-bold prose-a:text-[#F29191] hover:prose-a:text-[#f37c7c] prose-a:no-underline hover:prose-a:underline prose-code:text-[#F29191] prose-code:bg-[#F29191]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500">
                        <span>Last updated on {new Date().toLocaleDateString()}</span>
                        <a href="https://github.com/lodexi/lodexi-docs" target="_blank" className="hover:text-slate-900 dark:hover:text-gray-300 transition-colors">
                            Edit this page on GitHub
                        </a>
                    </div>
                </main>

                {/* Right Sidebar (Table of Contents - Desktop only) */}
                <div className="hidden xl:block w-64 shrink-0 px-6 pt-12">
                    <div className="sticky top-24">
                        <h5 className="font-semibold text-sm mb-4 text-slate-900 dark:text-gray-200">On this page</h5>
                        {/* We could parse headings from HTML here for a dynamic TOC, but keeping it simple for now */}
                        <div className="text-sm text-slate-500 italic">
                            (Dynamic TOC parsing in progress...)
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
