import { MxbHeader } from "./mxb-header.container";
import { MxbLayout } from "./mxb-layout.container";
import { MxbSide } from "./mxb-side.container";
import { MxbList } from "./mxb-list.container";
import * as React from "react";
import { CategoryType } from "../enums/category-type.enum";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_RESOURCES } from "../graphql/resource.gql";
import { MxbDetail } from "./mxb-detail.container";
import { Sorts } from "../enums/sorts.enum";

export interface MxbHomepageProps {
    type?: CategoryType;
    categoryId?: string;
    platform?: string;
    language?: string;
    categoryType?: string;
    sort?: string;
}

export const MxbHomepage = ({ type, categoryId, categoryType, platform, language, sort }: MxbHomepageProps) => {
    const url = `/resources/${categoryType}${categoryId ? `/${categoryId}` : ''}`;
    const query = {
        type,
        platform,
        language,
        sort,
    };
    const { error, data, loading } = useQuery(
        GET_LATEST_RESOURCES(sort as Sorts),
        { variables: { categoryId, categoryType, ...query } },
    );
    const list = data?.allResources ?? [];
    const [selected, select] = useState();

    useEffect(() => select(data?.allResources?.[0]?.id), [data]);
    return <>
        <MxbHeader type={categoryType ?? CategoryType.SOFT}/>
        <MxbLayout
            nav={<MxbSide
                url={url}
                query={query}
                categoryType={categoryType ?? CategoryType.SOFT}
                categoryId={categoryId}
            />}
            list={<MxbList
                loading={loading}
                selected={selected}
                onSelect={(id) => select(id)}
                list={error ? [] : list}
                url={url}
                query={query}
            />}
        >
            {selected ? <MxbDetail id={selected}/> : null}
        </MxbLayout>
    </>;
}
