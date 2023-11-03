import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import createApolloClient from '@/lib/graphql/createApolloClient';
import { useAuthContext } from '@/contexts/AuthContext';

function GraphQLProvider({ children }) {
    // Get access token from Auth Context
    const { accessToken } = useAuthContext();
    // Instantiate a new Apollo Client and pass the access token
    // to use for bearer authentication.
    const client = createApolloClient(accessToken);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

// Only export wrapper
export { GraphQLProvider };
