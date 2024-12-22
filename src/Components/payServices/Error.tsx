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
        <div className=" flex flex-col text-center w-full bg-backgroundNavbar rounded-lg">
            <div className="relative w-full pb-16">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-error w-12 h-12  sm:w-16 sm:h-16 absolute top left-1/2 transform -translate-x-1/2"
                />
            </div>
            <h4 className="text-white mt-2 sm:mt-4 px-4 s:px-18 sm:px-12 tablet:px-14 lg:px-16">
                {title}
            </h4>
            <hr className="border-t-1 border-solid border-white my-4 w-full" />
            <p className="text-xxs sm:text-xs xl:text-sm text-crearCuentaLogin mt-4 leading-tight">
                {paragraph1}
            </p>
            <p className="text-xxs sm:text-xs xl:text-sm text-crearCuentaLogin leading-tight">
                {paragraph2}
            </p>
            {children}
        </div>
    )
}

export default Error