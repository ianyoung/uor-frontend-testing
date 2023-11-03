import Layout from '@/components/layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { GraphQLProvider } from '@/components/GraphQLProvider';

import '@/styles/globals.css';

function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <GraphQLProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </GraphQLProvider>
        </AuthProvider>
    );
}

export default App;
