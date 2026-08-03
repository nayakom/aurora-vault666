type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function Button({
    children,
    onClick,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "16px 32px",
                borderRadius: "16px",
                border: "none",
                background: "#6C63FF",
                color: "#fff",
                fontSize: "18px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.3s",
            }}
        >
            {children}
        </button>
    );
}