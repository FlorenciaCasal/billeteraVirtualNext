import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface ErrorProps {
    title: string;
    paragraph1: string;
    paragraph2: string;
    children?: React.ReactNode
}

const Error = ({ title, paragraph1, paragraph2, children }: ErrorProps) => {
    return (
        <div className=" flex flex-col text-center py-8 px-8 w-full bg-backgroundNavbar rounded-lg">
            <div className="relative w-full pb-16">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-error w-16 h-16 absolute top left-1/2 transform -translate-x-1/2"
                />
            </div>
            <h4 className="text-white text-mmlg mt-8">
                {title}
            </h4>
            <p className="text-sm text-crearCuentaLogin mt-4 leading-tight">
                {paragraph1} 
            </p> 
            <p className="text-sm text-crearCuentaLogin leading-tight">
                {paragraph2} 
            </p> 
            {children}
        </div>
    )
}

export default Error