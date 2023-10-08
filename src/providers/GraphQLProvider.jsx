import * as Realm from 'realm-web';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { useState, useEffect } from 'react';

// Connect to your MongoDB Realm app
const app = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);

// Function to fetch the access token
async function getValidAccessToken() {
    if (!app.currentUser) {
        await app.logIn(Realm.Credentials.anonymous());
    } else {
        await app.currentUser.refreshAccessToken();
    }
    return app.currentUser.accessToken;
}

// Perform fetch of access token when component loads
function useAccessToken() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        async function fetchAccessToken() {
            const token = await getValidAccessToken();
            setAccessToken(token);
        }

        fetchAccessToken();
        // Refresh every 29 minutes (30 min expiration)
        const interval = setInterval(fetchAccessToken, 29 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return accessToken;
}

/**
 * Authenticate GraphQL Requests
 *
 * Adds authentication header to every GraphQL requests throughout
 * the app. This needs to wrap your root component.
 */
function GraphQLProvider({ children }) {
    const accessToken = useAccessToken();

    if (!accessToken) {
        return <div>Loading...</div>;
    }

    const client = new ApolloClient({
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
