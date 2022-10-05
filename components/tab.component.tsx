import { BaseProps } from "../interfaces/props.interface";
import Link from "next/link";

export interface TabItemProps extends BaseProps {
    active?: boolean;
    href?: string;
}

export const Tab = ({ children }) => {
    return <ul className="flex flex-row justify-between text-xl">
        {children}
    </ul>
}

export const TabItem = ({ children, active, href }: TabItemProps) => {
    return <li className={`px-8 py-4 ${active ? 'text-blue-500' : ''}`}>
        <Link href={href}>{children}</Link>
    </li>
}
