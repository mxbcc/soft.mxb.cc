import { BaseProps } from "../interfaces/props.interface";

export interface ButtonProps extends BaseProps {
    icon?: string;
    onClick?: () => void;
    disable?: boolean;
}

export const Button = ({ children, onClick, icon, disable }: ButtonProps) => {
    return <span
        className={`flex flex-row items-center px-16 hover:cursor-pointer group ${disable ? 'pointer-events-none' : ''}`}
        onClick={onClick}>
        <i className={`${icon} align-middle text-4xl text-gray-300 group-hover:text-blue-500`}></i>
        <span className={`align-middle text-2xl ${disable ? 'text-gray-300' : 'text-gray-500'} ml-4 group-hover:text-blue-500`}>
            {children}
        </span>
    </span>;
}

export const Divider = () => <div className="bg-gray-200 my-2" style={{ width: 1 }}/>;
