export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className || "h-10 w-auto"}>
            <path d="M 25 15 C 25 15, 25 75, 25 75 C 25 85, 35 85, 35 85 L 85 85" stroke="#F29191" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 45 35 C 45 35, 45 65, 45 65 C 45 70, 50 70, 50 70 L 75 70" stroke="#F29191" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="110" y="76" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="58" fill="#F29191">
                L<tspan className="fill-slate-900 dark:fill-white">O</tspan>DEXI
            </text>
        </svg>
    );
}
