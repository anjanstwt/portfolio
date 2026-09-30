interface NocturnProps {
    className?: string;
    color?: string;
}

export default function Nocturn({ className, color }: NocturnProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={className}
            style={color ? { color } : undefined}
        >
            <path d="M4.00165 2.99863C4.00165 2.17447 4.94264 1.70412 5.60184 2.19877L13.5993 8.19993C14.3679 8.77665 13.96 9.99978 12.9991 9.99978H9.05388C8.74293 9.99978 8.44968 10.1444 8.26043 10.3911L5.7951 13.6051C5.21352 14.3633 4.00165 13.952 4.00165 12.9964V2.99863Z" />
        </svg>
    );
}
