import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Database, Key, MessageSquare, User, LogOut, Menu, X } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const NavItem = ({ href, active, icon: Icon, children }) => (
        <Link
            href={href}
            className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all font-medium ${
                active 
                ? 'bg-[#F29191] text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
        >
            <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-[#F29191]'}`} />
            {children}
        </Link>
    );

    return (
        <div className="flex h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-[#F29191]/5 dark:bg-none dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-slate-800 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="h-20 flex items-center px-8 border-b border-gray-200/50 dark:border-slate-800">
                    <Link href="/">
                        <ApplicationLogo className="block h-10 w-auto" />
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="space-y-1">
                        <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Database}>
                            Knowledge Base
                        </NavItem>
                        <NavItem href={route('dashboard.apikeys')} active={route().current('dashboard.apikeys')} icon={Key}>
                            API Keys
                        </NavItem>
                        <NavItem href={route('dashboard.playground')} active={route().current('dashboard.playground')} icon={MessageSquare}>
                            AI Playground
                        </NavItem>
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-200/50 dark:border-slate-800">
                    <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F29191] to-orange-300 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                {user.name.charAt(0)}
                            </div>
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Link href={route('profile.edit')} className="flex items-center w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors">
                                <User className="w-4 h-4 mr-2" /> Profile Settings
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                <LogOut className="w-4 h-4 mr-2" /> Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white/40 dark:bg-slate-900/50 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800 h-16 flex items-center justify-between px-4">
                    <Link href="/">
                        <ApplicationLogo className="block h-8 w-auto" />
                    </Link>
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Page Header (if any) */}
                {header && (
                    <div className="bg-white/40 dark:bg-slate-900/50 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-slate-800 hidden lg:block">
                        <div className="px-8 py-6">
                            {header}
                        </div>
                    </div>
                )}
                
                {/* Mobile Page Header */}
                {header && (
                    <div className="bg-white/40 dark:bg-slate-900/50 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-slate-800 lg:hidden">
                        <div className="px-4 py-4">
                            {header}
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
