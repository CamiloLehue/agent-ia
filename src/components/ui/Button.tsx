interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    variant?: 'solid' | 'transparent' | 'border' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
}

function Button({ variant = 'solid', size = 'md', fullWidth = false, className = '', disabled = false, children, ...props }: ButtonProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'transparent':
                return 'bg-transparent text-primary hover:bg-primary/10';
            case 'border':
                return 'bg-transparent text-primary border border-primary/60 hover:bg-primary/10';
            case 'ghost':
                return 'bg-transparent text-primary hover:bg-primary/10 hover:text-primary-dark';
            case 'solid':
            default:
                return 'bg-secondary border border-primary/10 text-white hover:bg-primary-dark';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'py-1 px-2 text-sm';
            case 'lg':
                return 'py-3 px-6 text-lg';
            case 'md':
            default:
                return 'py-2 px-4';
        }
    };

    const getWidthClasses = () => {
        return fullWidth ? 'w-full' : '';
    };

    const getDisabledClasses = () => {
        return disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    };

    return (
        <button
            className={`rounded-md transition-colors ${getVariantClasses()} ${getSizeClasses()} ${getWidthClasses()} ${getDisabledClasses()} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button