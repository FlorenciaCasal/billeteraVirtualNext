import Link from 'next/link';
import { ButtonType } from '../../../src/types/button.types';

const Button = ({ href, children, className }: ButtonType) => {
    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded ${className}`}>
            {children}
        </Link>
    );
};
export default Button;