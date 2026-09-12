import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-[#F29191]/5 dark:bg-none dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#F29191]/20 dark:bg-[#F29191]/10 rounded-full blur-[80px] dark:blur-[120px]"></div>
            </div>
            
            <div className="mb-8 relative z-10">
                <Link href="/">
                    <ApplicationLogo className="h-16 w-auto" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] sm:max-w-md sm:rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl relative z-10">
                {children}
            </div>
        </div>
    );
}
