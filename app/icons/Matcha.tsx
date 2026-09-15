interface MatchaProps {
    className?: string;
    color?: string;
}

export default function Matcha({ className, color }: MatchaProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 792 460"
            fill="currentColor"
            className={className}
            style={color ? { color } : undefined}
        >
            <path d="M626.9 24.4L657 40.8L657 215.5L759.9 147L792 164.5L792 438.5L657 438.5L657 214.6L328.7 447.2L328.7 227.2L0 460.1L0 235.9L297.9 37.4L328.7 54.2L328.7 223Z" />
        </svg>
    );
}
