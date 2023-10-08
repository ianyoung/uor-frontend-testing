import Layout from '@/components/layout';
import GraphQLProvider from '@/providers/GraphQLProvider';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <GraphQLProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </GraphQLProvider>
    );
}
