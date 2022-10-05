import { SidePanel } from "../components/side-panel.component";
import { Menu, MenuItem } from "../components/menu.component";
import * as React from "react";
import { Checkbox } from "../components/checkbox.component";
import { GET_CATEGORIES } from "../graphql/category.gql";
import { CategoryType } from "../enums/category-type.enum";
import { ResourcePlatform } from "../enums/resource-platform.enum";
import { buildUrl } from "../helpers/url.helper";
import { ResourceLanguage } from "../enums/resource-language.enum";
import { ResourceType } from "../enums/resource-type.enum";
import { useQuery } from "@apollo/client";

export const MxbSide = ({ categoryId, categoryType, query, url }) => {
    const { error, data } = useQuery(
        GET_CATEGORIES,
        { variables: { type: categoryType } },
    );
    const categories = error ? [] : data?.allResourceCategories ?? [];
    return <aside className="bg-gray-800 flex-1 h-0 overflow-auto">
        <SidePanel title="分类">
            <Menu>
                <MenuItem selected={!categoryId} href={`/resources/${categoryType}`}>
                    全部软件
                </MenuItem>
                {categories.map(item =>
                    <MenuItem
                        selected={item.id === categoryId}
                        key={item.id}
                        href={buildUrl(`/resources/${categoryType}/${item.id}`, query)}
                        showArrow={true}>
                        {item.name}
                    </MenuItem>
                )}
            </Menu>
        </SidePanel>
        {categoryType === CategoryType.SOFT ? <SidePanel title="兼容性">
            <Checkbox checked={!query.platform} href={buildUrl(url, { ...query, platform: '' })}>
                全部
            </Checkbox>
            <Checkbox
                checked={query.platform === ResourcePlatform.APPLE_M1}
                href={buildUrl(url, { ...query, platform: ResourcePlatform.APPLE_M1 })}>
                Apple M1
            </Checkbox>
            <Checkbox
                checked={query.platform === ResourcePlatform.APPLE_INTEL}
                href={buildUrl(url, { ...query, platform: ResourcePlatform.APPLE_INTEL })}>
                Apple Intel
            </Checkbox>
            <Checkbox
                checked={query.platform === ResourcePlatform.WINDOWS}
                href={buildUrl(url, { ...query, platform: ResourcePlatform.WINDOWS })}>
                Windows
            </Checkbox>
            <Checkbox
                checked={query.platform === ResourcePlatform.UBUNTU}
                href={buildUrl(url, { ...query, platform: ResourcePlatform.UBUNTU })}>
                Ubuntu
            </Checkbox>
        </SidePanel> : null}
        <SidePanel title="语言">
            <Checkbox checked={!query.language} href={buildUrl(url, { ...query, language: '' })}>
                全部
            </Checkbox>
            <Checkbox
                checked={query.language === ResourceLanguage.ZH_CN}
                href={buildUrl(url, { ...query, language: ResourceLanguage.ZH_CN })}>
                中文
            </Checkbox>
            <Checkbox
                checked={query.language === ResourceLanguage.EN_US}
                href={buildUrl(url, { ...query, language: ResourceLanguage.EN_US })}>
                英文
            </Checkbox>
            <Checkbox
                checked={query.language === ResourceLanguage.OTHER}
                href={buildUrl(url, { ...query, language: ResourceLanguage.OTHER })}>
                其他
            </Checkbox>
        </SidePanel>
        {categoryType === CategoryType.SOFT ? <SidePanel title="类型">
            <Checkbox checked={!query.type} href={buildUrl(url, { ...query, type: '' })}>
                全部
            </Checkbox>
            <Checkbox
                checked={query.type === ResourceType.OPEN_SOURCE}
                href={buildUrl(url, { ...query, type: ResourceType.OPEN_SOURCE })}>
                开源
            </Checkbox>
            <Checkbox
                checked={query.type === ResourceType.CRACK}
                href={buildUrl(url, { ...query, type: ResourceType.CRACK })}>
                破解
            </Checkbox>
        </SidePanel> : null}
    </aside>;
}
