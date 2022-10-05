import * as React from 'react';
import { MxbHomepage } from "../../../containers/mxb-homepage.container";

export default class Page extends React.Component<any, any> {
    static async getInitialProps(context) {
        return context.query;
    }

    render() {
        const { type, categoryId, platform, language, categoryType, sort } = this.props;
        return <MxbHomepage
            type={type}
            sort={sort}
            categoryId={categoryId}
            platform={platform}
            language={language}
            categoryType={categoryType}
        />;
    }
}
