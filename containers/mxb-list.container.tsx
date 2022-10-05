import { Tab, TabItem } from "../components/tab.component";
import { Card } from "../components/card.component";
import { Sorts } from "../enums/sorts.enum";
import { buildUrl } from "../helpers/url.helper";
import { Loading } from "../components/loading.component";

export const MxbList = ({ url, query, list, selected, onSelect, loading }) => {
    return <div className="flex flex-col flex-1 h-0">
        <h1 className="text-3xl p-6 bg-white">全部软件</h1>
        <Tab>
            <TabItem
                active={query.sort === Sorts.LATEST || !query.sort}
                href={buildUrl(url, { ...query, sort: Sorts.LATEST })}>
                最新
            </TabItem>
            <TabItem active={query.sort === Sorts.DOWNLOAD} href={buildUrl(url, { ...query, sort: Sorts.DOWNLOAD })}>
                下载
            </TabItem>
            <TabItem active={query.sort === Sorts.COMMENT} href={buildUrl(url, { ...query, sort: Sorts.COMMENT })}>
                评论
            </TabItem>
            <TabItem active={query.sort === Sorts.LIKE} href={buildUrl(url, { ...query, sort: Sorts.LIKE })}>
                喜欢
            </TabItem>
            <TabItem active={query.sort === Sorts.RECOMMEND} href={buildUrl(url, { ...query, sort: Sorts.RECOMMEND })}>
                推荐
            </TabItem>
        </Tab>
        {loading ? <Loading/> : <div className="flex-1 h-0 overflow-auto bg-white">
            {list.map(item => <Card
                onClick={() => onSelect(item.id)}
                active={selected === item.id}
                key={item.id}
                icon={item.icon?.publicUrl}
                title={item.name}
                desc={item.description}
                downloads={item.downloads}
                comments={0}
                date={item.createdAt}
                version={item.packages?.[0]?.version}
            />)}
        </div>}
    </div>
}
