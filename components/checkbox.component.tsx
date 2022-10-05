import Link from "next/link";

export interface CheckboxProps {
    checked?: boolean
    children?: any;
    href?: string;
}

export const Checkbox = ({ children, checked, href }: CheckboxProps) => {
    return <div className="text-2xl text-gray-300 py-3 flex flex-row items-center hover:cursor-pointer">
        <Link href={href}>
            <span className="flex flex-row items-center">
                <i className={`
                    ${checked ? 'ri-checkbox-circle-line' : 'ri-checkbox-blank-circle-line'}
                    ${checked ? 'text-blue-500' : 'text-gray-500'} text-3xl`}
                />
                <span className={`ml-4 ${checked ? 'text-blue-500' : 'text-gray-300'}`}>
                    {children}
                </span>
            </span>
        </Link>
    </div>;
}
