import Link from 'next/link';
import { ButtonType } from '../../../src/types/button.types';

const Button = ({ href, children, label, className, onClick, type, disabled }: ButtonType) => {
    

    if (href) {
        // Si href está presente, renderizamos un Link
        return (
            <Link
                href={href}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold ${className}`}
            >
                {label}
                {children}
            </Link>
        );
    }

    // Si href no está presente, renderizamos un button
    return (
        <button
            className={`flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {label}
            {children}
        </button>
    );
};

export default Button;