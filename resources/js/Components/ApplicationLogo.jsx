export default function ApplicationLogo(props) {
    return (
        <img 
            src="/lodexi-avatar.png" 
            alt="Lodexi Logo" 
            className={props.className || "h-10 w-auto"} 
            {...props} 
        />
    );
}
