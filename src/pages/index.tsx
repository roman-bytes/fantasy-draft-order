import React from 'react';
import { FunctionComponent } from 'react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LiveGames from '../components/LiveGames';

const queryClient = new QueryClient();

const IndexPage: FunctionComponent = (): ReactElement => (
    <QueryClientProvider client={queryClient}>
        <Layout>
            <SEO title="Home" />
            <LiveGames />
            <ReactQueryDevtools initialIsOpen />
        </Layout>
    </QueryClientProvider>
);

export default IndexPage;
