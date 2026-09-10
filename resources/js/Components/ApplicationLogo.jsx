export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className || "h-10 w-auto"}>
            <defs>
                <linearGradient id="lodexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B1E5E6" />
                    <stop offset="100%" stopColor="#F29191" />
                </linearGradient>
            </defs>
            <path d="M 25 15 C 25 15, 25 75, 25 75 C 25 85, 35 85, 35 85 L 85 85" stroke="#B1E5E6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 45 35 C 45 35, 45 65, 45 65 C 45 70, 50 70, 50 70 L 75 70" stroke="#F29191" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="25" cy="15" r="4" fill="#B1E5E6"/>
            <circle cx="85" cy="85" r="4" fill="#B1E5E6"/>
            <circle cx="45" cy="35" r="4" fill="#F29191"/>
            <circle cx="75" cy="70" r="4" fill="#F29191"/>
            <text x="110" y="76" fontFamily="Inter, Figtree, sans-serif" fontWeight="900" fontSize="58" letterSpacing="0.05em" fill="url(#lodexGradient)">
                L<tspan fill="#FFFFFF">O</tspan>DEXI
            </text>
        </svg>
    );
}
