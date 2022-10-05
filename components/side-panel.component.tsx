import { ReactNode } from "react";

export interface SidePanelProps {
    title: string | ReactNode;
    children?: any;
}

export const SidePanel = ({ title, children }: SidePanelProps) => {
    return <section className="p-8 text-gray-500 text-xl pb-0">
        <div className="mb-3">{title}</div>
        <figure>{children}</figure>
    </section>
}
