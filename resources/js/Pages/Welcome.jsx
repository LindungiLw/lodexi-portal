import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { ShieldCheck, BrainCircuit, PlugZap, ArrowRight, Sun, Moon, Search, Menu, X } from 'lucide-react';

export default function Welcome({ auth }) {
    const [typedText, setTypedText] = useState('');
    const fullText = "Brilliant AI Oracle";
    
    // Default to light mode (false)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(timer);
            }
        }, 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <Head title="Enterprise AI Knowledge Base" />
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-[#F29191]/5 dark:bg-none dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-[#F29191] selection:text-white overflow-hidden relative transition-colors duration-300">
                
                {/* Background Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F29191]/20 dark:bg-[#F29191]/10 rounded-full blur-[80px] dark:blur-[120px]"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F29191]/20 dark:bg-[#F29191]/10 rounded-full blur-[80px] dark:blur-[120px]"></div>
                </div>

                {/* Navigation Bar - Laravel Style */}
                <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-slate-950/50 backdrop-blur-2xl transition-colors duration-300">
                    <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                        
                        {/* Left Side: Logo & Main Links */}
                        <div className="flex items-center gap-10">
                            <ApplicationLogo className="h-9 w-auto" />
                            
                            {/* Desktop Links */}
                            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-800 dark:text-gray-300">
                                <button className="flex items-center gap-1 hover:text-[#F29191] dark:hover:text-white transition-colors">
                                    Product <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <button className="flex items-center gap-1 hover:text-[#F29191] dark:hover:text-white transition-colors">
                                    Solutions <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <button className="flex items-center gap-1 hover:text-[#F29191] dark:hover:text-white transition-colors">
                                    Developers <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <a href="#" className="hover:text-[#F29191] dark:hover:text-white transition-colors">Pricing</a>
                            </div>
                        </div>
                        
                        {/* Right Side: Search, Social, Auth */}
                        <div className="flex items-center gap-6">
                            
                            {/* Search Bar Mockup */}
                            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-sm text-slate-500 dark:text-gray-400 transition-colors">
                                <Search className="w-4 h-4" />
                                <span>Search docs</span>
                                <kbd className="ml-4 font-sans text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10">⌘K</kbd>
                            </button>

                            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 hidden md:block"></div>

                            {/* Theme Toggle */}
                            <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-slate-400 hover:text-[#F29191] dark:text-gray-400 dark:hover:text-white transition-colors">
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {/* GitHub Icon */}
                            <a href="#" className="text-slate-400 hover:text-[#F29191] dark:text-gray-400 dark:hover:text-white transition-colors hidden sm:block">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>

                            <div className="flex items-center gap-3 font-medium text-sm ml-2">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="hidden sm:block px-5 py-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all text-slate-900 dark:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="hidden sm:block px-4 py-2 text-slate-800 dark:text-gray-300 hover:text-[#F29191] dark:hover:text-white transition-colors"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-5 py-2 rounded-lg bg-[#F29191] hover:bg-[#ffb0b0] text-white font-bold transition-all shadow-[0_0_15px_rgba(242,145,145,0.3)] hover:shadow-[0_0_25px_rgba(242,145,145,0.5)] hidden sm:block"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden text-slate-600 dark:text-gray-300 hover:text-[#F29191] dark:hover:text-white transition-colors ml-2"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-slate-200/50 dark:border-white/5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl">
                            <div className="flex flex-col px-6 py-4 space-y-4">
                                <a href="#" className="text-slate-800 dark:text-gray-300 hover:text-[#F29191] dark:hover:text-white font-medium">Product</a>
                                <a href="#" className="text-slate-800 dark:text-gray-300 hover:text-[#F29191] dark:hover:text-white font-medium">Solutions</a>
                                <a href="#" className="text-slate-800 dark:text-gray-300 hover:text-[#F29191] dark:hover:text-white font-medium">Developers</a>
                                <a href="#" className="text-slate-800 dark:text-gray-300 hover:text-[#F29191] dark:hover:text-white font-medium">Pricing</a>
                                
                                <div className="h-px bg-slate-200 dark:bg-white/10 my-2"></div>
                                
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="text-slate-800 dark:text-white font-medium">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-slate-800 dark:text-gray-300 font-medium">Sign in</Link>
                                        <Link href={route('register')} className="inline-block text-center px-5 py-3 rounded-lg bg-[#F29191] text-white font-bold w-full">Get Started</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <main className="relative z-10 container mx-auto px-6 pt-32 pb-32 text-center flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight max-w-4xl mt-12 text-slate-900 dark:text-white">
                        Turn Your Documents into a <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F29191] to-[#F29191]">
                            {typedText}
                        </span>
                        <span className="text-[#F29191] animate-pulse">|</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
                        Secure, precise, and entirely yours. LODEXI empowers your business with enterprise-grade Retrieval-Augmented Generation without the privacy risks.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href={route('register')}
                            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-lg transition-all hover:scale-105 hover:bg-slate-800 dark:hover:bg-gray-100"
                        >
                            Start Building for Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="#features"
                            className="flex items-center justify-center px-8 py-4 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-lg transition-all hover:bg-slate-200 dark:hover:bg-white/10 backdrop-blur-sm"
                        >
                            View Architecture
                        </a>
                    </div>
                </main>

                {/* Features Grid */}
                <section id="features" className="relative z-10 container mx-auto px-6 py-24 border-t border-slate-200 dark:border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Built for Enterprise Scale</h2>
                        <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">We separated the AI Engine from the Dashboard so you can integrate cognitive search directly into your own infrastructure.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        
                        <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl hover:border-[#F29191]/40 dark:hover:border-[#F29191]/30 transition-all hover:shadow-xl hover:shadow-[#F29191]/5 shadow-sm dark:shadow-none hover:-translate-y-1">
                            <div className="w-12 h-12 bg-[#F29191]/15 dark:bg-[#F29191]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#F29191]/20">
                                <ShieldCheck className="w-6 h-6 text-[#F29191]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Military-Grade Isolation</h3>
                            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                                True multi-tenancy at the vector level. Your documents are cryptographically isolated. Client A's AI will never access Client B's secrets.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl hover:border-[#F29191]/40 dark:hover:border-[#F29191]/30 transition-all hover:shadow-xl hover:shadow-[#F29191]/5 shadow-sm dark:shadow-none hover:-translate-y-1">
                            <div className="w-12 h-12 bg-[#F29191]/15 dark:bg-[#F29191]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#F29191]/20">
                                <BrainCircuit className="w-6 h-6 text-[#F29191]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Zero Hallucination</h3>
                            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our AI engine is strictly grounded to your uploaded documents. Every answer provided includes exact citations to the source material.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl hover:border-[#F29191]/40 dark:hover:border-[#F29191]/30 transition-all hover:shadow-xl hover:shadow-[#F29191]/5 shadow-sm dark:shadow-none hover:-translate-y-1">
                            <div className="w-12 h-12 bg-[#F29191]/15 dark:bg-[#F29191]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#F29191]/20">
                                <PlugZap className="w-6 h-6 text-[#F29191]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Plug & Play API</h3>
                            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                                Generate an API key from the dashboard and embed the AI oracle directly into your company website or mobile app in minutes.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-slate-200 dark:border-white/5 py-8 mt-12 text-center text-sm text-slate-500 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LODEXI Technologies. All rights reserved.</p>
                </footer>

            </div>
        </div>
    );
}
