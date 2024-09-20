
interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={`bg-custom-footer ${className}`}>
            <div className="flex items-center justify-between p-4 bg-backgroundFooter">
                <div className="flex items-center">
                    <p className="text-[#C1FD35] text-xs">© 2022 Digital Money House</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;