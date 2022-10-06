import { useQuery } from "@apollo/client";
import { GET_RESOURCE } from "../graphql/resource.gql";
import Slider from "react-slick";
import { prettyBytes } from "../helpers/data.helper";
import { ResourceLanguage } from "../enums/resource-language.enum";
import { ResourceType } from "../enums/resource-type.enum";
import { Button, Divider } from "../components/button.compnent";
import { useEffect, useState } from "react";
import axios from 'axios';
import getConfig from "next/config";
import dayjs from "dayjs";
import { Popover } from "../components/popover.component";
import { Loading } from "../components/loading.component";
import { CategoryType } from "../enums/category-type.enum";

const { publicRuntimeConfig: { serverUrl } } = getConfig();

const LANGUAGE_MAPPING = {
    [ResourceLanguage.ZH_CN]: '中文',
    [ResourceLanguage.EN_US]: '英文',
    [ResourceLanguage.OTHER]: '其他',
}

const TYPE_MAPPING = {
    [ResourceType.NORMAL]: '官方版',
    [ResourceType.CRACK]: '破解版',
    [ResourceType.OPEN_SOURCE]: '开源版',
}

export const MxbDetail = ({ id }) => {
    const { error, data, loading } = useQuery(GET_RESOURCE, { variables: { id } });
    const resource = error ? {} : data?.Resource ?? {};
    const [isLike, setLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        setLikes(resource.likes ?? 0);
        setLike(!!localStorage.getItem(`resource_is_like_${resource.id}`));
    }, [resource]);

    const like = async () => {
        setLike(true);
        localStorage.setItem(`resource_is_like_${resource.id}`, 'true');
        setLikes(likes + 1);
        await axios.post(`${serverUrl}/apis/resources/${resource.id}/likes`);
    }

    const render = (icon, text, value) => {
        return <div className="flex flex-row p-6">
            <div className="flex items-center justify-center text-4xl text-gray-300">
                <i className={icon}/>
            </div>
            <div className="flex-1 flex flex-col ml-6">
                <span className="text-3xl mb-2">{value}</span>
                <span className="text-xl text-gray-400">{text}</span>
            </div>
        </div>
    }

    const download = (pkgId: string) => {
        window.open(`${serverUrl}/apis/resources/${id}/packages/${pkgId}`);
    }

    return <div className="relative flex flex-col flex-1 h-0">
        {loading ? <Loading/> : <>
            <div className="flex-1 h-0 overflow-auto">
                <div className="flex flex-row justify-center">
                    <Slider autoplay={true} arrows={false} className="flex-1 w-0 mx-16 my-16" dots={true}
                            infinite={true}
                            speed={1000} slidesToShow={1}
                            slidesToScroll={1}>
                        {resource.images?.map(item => <div key={item.id}>
                            <img src={item?.image?.publicUrl}/>
                        </div>)}
                    </Slider>
                </div>
                <h1 className="text-center text-6xl mt-6">{resource.name}</h1>
                <p className="text-center text-3xl text-gray-400 mt-6">{resource.description}</p>
                {resource.categoryType === CategoryType.SOFT ?
                    <div className="flex flex-row justify-between py-8 px-16">
                        {render('ri-earth-line', '软件语言', LANGUAGE_MAPPING[resource.language])}
                        {render('ri-u-disk-line', '软件大小', prettyBytes(resource.packages?.[0]?.size))}
                        {render('ri-cpu-line', '适用系统', `>=${resource.packages?.[0]?.system}`)}
                        {render('ri-download-2-line', '下载次数', resource.downloads ?? 0)}
                        {render('ri-key-2-line', '软件类型', TYPE_MAPPING[resource.type])}
                    </div> : null
                }
                <div className="px-24 text-3xl mt-20">
                    <div dangerouslySetInnerHTML={{ __html: resource.content }}/>
                </div>
            </div>
            <footer
                className="h-24 bg-white border-t border-gray-100 border-solid flex flex-row justify-end relative z-10">
                <Divider/>
                <Button disable={true} icon="ri-chat-smile-2-line">评论(0)</Button>
                <Divider/>
                <Button
                    icon="ri-thumb-up-line"
                    disable={isLike}
                    onClick={() => like()}>
                    {isLike ? '已' : ''}喜欢({likes})
                </Button>
                <Divider/>
                <Button disable={!resource.packages} icon="ri-download-2-line" onClick={() => setVisible(!isVisible)}>
                    下载
                </Button>
            </footer>
            <Popover visible={isVisible} onHide={() => setVisible(false)}>
                <table>
                    {resource.packages?.map(item => <tr
                        key={item.id}
                        onClick={() => download(item.id)}
                        className="hover:bg-blue-50 hover:cursor-pointer">
                        <td className="px-10 py-8 text-2xl">{item.version}</td>
                        <td className="px-10 py-8 text-2xl">&gt;={item.system}</td>
                        <td className="px-10 py-8 text-2xl">{LANGUAGE_MAPPING[item.language]}</td>
                        <td className="px-10 py-8 text-2xl">
                            {dayjs(item.createdAt || item.updatedAt).format('YYYY-MM-DD')}
                        </td>
                        <td className="px-10 py-8 text-3xl">
                            <i className="ri-download-2-line"/>
                        </td>
                    </tr>)}
                </table>
            </Popover>
        </>}
    </div>
}
