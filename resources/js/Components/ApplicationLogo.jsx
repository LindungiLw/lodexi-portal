export default function ApplicationLogo(props) {
    return (
        <div {...props} className={"flex items-center space-x-2 " + (props.className || '')}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 25 15 C 25 15, 25 75, 25 75 C 25 85, 35 85, 35 85 L 85 85" stroke="#B1E5E6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 45 35 C 45 35, 45 65, 45 65 C 45 70, 50 70, 50 70 L 75 70" stroke="#F29191" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="25" cy="15" r="4" fill="#B1E5E6"/>
                <circle cx="85" cy="85" r="4" fill="#B1E5E6"/>
                <circle cx="45" cy="35" r="4" fill="#F29191"/>
                <circle cx="75" cy="70" r="4" fill="#F29191"/>
            </svg>
            <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-lodex-cyan to-lodex-coral uppercase" style={{ fontFamily: '"Inter", "Figtree", sans-serif' }}>
                L<span className="text-white">O</span>DEXI
            </span>
        </div>
    );
}
