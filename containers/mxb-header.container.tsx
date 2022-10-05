import Link from "next/link";
import { CategoryType } from "../enums/category-type.enum";


export const MxbHeader = ({ type }) => {
    return <header
        className="h-24 bg-white text-gray-800 shrink-0 flex items-center border-b border-gray-100 border-solid">
        <div className="text-4xl mx-14">
            猫小白
        </div>
        <nav className="flex justify-between flex-col">
            <ul className="flex list-none p-0">
                <li className={`text-2xl mx-8 ${type === CategoryType.SOFT ? 'text-blue-500' : ''}`}>
                    <Link href="/resources/soft">应用</Link>
                </li>
                <li className={`text-2xl mx-8 ${type === CategoryType.PDF ? 'text-blue-500' : ''}`}>
                    <Link href="/resources/pdf">PDF</Link>
                </li>
                <li className={`text-2xl mx-8 ${type === CategoryType.OTHER ? 'text-blue-500' : ''}`}>
                    <Link href="/resources/other">其他</Link>
                </li>
                <li className="text-2xl mx-8">
                    <a href="https://mxb.cc" target="_blank">博客</a>
                </li>
            </ul>
        </nav>
    </header>;
}
