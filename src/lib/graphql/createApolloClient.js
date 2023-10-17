import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

/**
 * Create new Isomorphic ApolloClient instance
 *
 * Will automatically determine if this is to be rendered on the
 * client-side or the server-side via ssrMode.
 *
 * @param {token} Valid access token for Realm anon user
 * @returns {ApolloClient} An initialized ApolloClient object
 */
const createApolloClient = (token) => {
    return new ApolloClient({
        link: new HttpLink({
            // Can render on server or client by auto detection
            ssrMode: typeof window === 'undefined',
            uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
