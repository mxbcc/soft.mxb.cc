import { ReactNode } from "react";

export interface MxbLayoutProps {
    nav: ReactNode;
    list: ReactNode;
    children?: ReactNode;
}

export const MxbLayout = ({ nav, list, children }: MxbLayoutProps) => {
    return <main className="flex flex-row flex-1 h-0">
        <section className="w-60 flex flex-col shrink-0">{nav}</section>
        <section className="w-140 flex flex-col border-r border-gray-100 border-solid shrink-0">{list}</section>
        <section className="flex flex-col flex-1">{children}</section>
    </main>;
}
