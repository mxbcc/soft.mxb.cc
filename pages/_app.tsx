import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import '../styles/index.less';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WithApollo } from "../decorators";
import { ConfigProps } from "../interfaces/props.interface";
import { Query } from "../components/query.component";
import { getCookie } from "cookies-next";
import { GET_SETTINGS } from "../graphql/setting.gql";

interface MyAppProps extends ConfigProps {
    apolloClient?: ApolloClient<any>;
    user?: any;
    mode: 'dark' | 'light';
    Component: any;
}

@WithApollo()
export default class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        const mode = getCookie('mode', { req: ctx.req, res: ctx.res });

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, mode };
    }

    render() {
        const { Component, pageProps, apolloClient, user, mode } = this.props;
        return (
            <ApolloProvider client={apolloClient}>
                <Query type="array" query={GET_SETTINGS} variables={{ type: 'soft' }} render={settings => <>
                    <Head>
                        <link rel="shortcut icon" href={"favicon.ico"} type="image/x-icon"/>

                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
                        {/*<meta name="keywords" content={meta.keywords}/>*/}
                        {/*<meta name="description" content={meta.description}/>*/}
                        {/*<script dangerouslySetInnerHTML={{ __html: meta.header_script }}/>*/}
                    </Head>
                    <Component {...pageProps} user={user} mode={mode}/>
                </>}/>
            </ApolloProvider>
        );
    }
}
