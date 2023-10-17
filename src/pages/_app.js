import { ApolloProvider } from '@apollo/client';

import Layout from '@/components/layout';
import useRealmAnonAuth from '@/hooks/useRealmAnonAuth';
import createApolloClient from '@/lib/graphql/createApolloClient';

import '@/styles/globals.css';

function App({ Component, pageProps }) {
    // Fetch anon user access token
    const accessToken = useRealmAnonAuth();

    // Create new Apollo Client (client-side)
    const client = createApolloClient(accessToken);

    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}

export default App;
