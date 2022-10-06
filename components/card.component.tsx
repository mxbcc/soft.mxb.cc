import dayjs from "dayjs";

export interface CardProps {
    icon?: string;
    title: string;
    desc: string;
    date: string;
    downloads: number;
    comments: number;
    version: string;
    active?: boolean;
    onClick?: () => void;
}

const defaultImg = 'https://mxbcc.oss-cn-beijing.aliyuncs.com/uploads/5f997a2969a95300180f0988-5f9461f9243bbe001975bc59-12780562.jpeg';

export const Card = ({ icon, title, desc, downloads, comments, date, version, active, onClick }: CardProps) => {
    return <div
        onClick={onClick}
        className="
            flex flex-row bg-white p-6 border-b border-gray-100 border-solid
            hover:shadow-lg hover:relative hover:z-10 transition-shadow relative
        ">
        <div className={`absolute left-0 top-0 bottom-0 bg-blue-500 ${active ? 'w-2' : ''}`}/>
        <div className="mr-6 flex justify-center items-center">
            <img className="w-20 rounded" src={icon ?? defaultImg}/>
        </div>
        <div className="flex-1 relative">
            <h3 className="text-2xl mb-2">{title}</h3>
            <p className="text-xl text-gray-400 mb-4">{desc}</p>
            <p className="text-gray-300 flex flex-row items-center">
                <span className="flex flex-row items-center w-16">
                    <i className="align-middle ri-download-2-line"/>
                    <span className="align-middle ml-2">{downloads ?? 0}</span>
                </span>
                <span className="ml-6 flex-row items-center">
                    <i className="align-middle ri-chat-smile-2-line"/>
                    <span className="align-middle ml-2">{comments ?? 0}</span>
                </span>
            </p>
            <span className="absolute bottom-0 right-0 text-gray-300">
                {dayjs(date).format('MM-DD')}
            </span>
            <span className="absolute top-0 right-0 text-gray-500 bg-gray-100 px-4 py-1 rounded-2xl">
                {version ?? '0.0.0'}
            </span>
        </div>
    </div>
}
