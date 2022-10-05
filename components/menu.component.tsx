import * as React from "react";
import { BaseProps } from "../interfaces/props.interface";
import Link from "next/link";

export interface MenuItemProps extends BaseProps {
    selected?: boolean;
    href?: string;
    showArrow?: boolean;
}

export const Menu = ({ children }) => {
    return <ul>{children}</ul>;
};

export const MenuItem = ({ children, showArrow, selected, href }: MenuItemProps) => {
    return <li
        className={`
            ${selected ? 'text-blue-500' : 'text-gray-300'} 
            text-2xl py-3 hover:cursor-pointer flex flex-row items-center
            transition-all hover:ml-2
        `}>
        <Link href={href}>
            <span>
                <span className="align-middle">{children}</span>
                {showArrow ? <i className="align-middle ml-8 ri-arrow-right-s-line"/> : null}
            </span>
        </Link>
    </li>;
}
