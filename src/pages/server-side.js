import nookies from 'nookies';
import { gql } from '@apollo/client';

import createApolloClient from '@/lib/graphql/createApolloClient';

export default function ServerPage({ properties }) {
    return (
        <main className="bg-slate-100 flex justify-center">
            <div className="w-3/6">
                <div className="flex justify-center mt-10 mb-6">
                    <h2 className="inline-block text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Rendered Server-Side
                    </h2>
                </div>
                <div>
                    <ul>
                        {properties ? (
                            properties.map((property) => (
                                <li
                                    key={property._id}
                                    className="bg-white rounded-md border border-slate-200/75 my-2 p-4 leading-normal"
                                >
                                    {property.title}
                                </li>
                            ))
                        ) : (
                            <p>None found</p>
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
}

// 4. Server-side logic to parse cookie and run query
export async function getServerSideProps(context) {
    // Get the current access token from local cookie
    const { accessToken } = nookies.get(context);
    // Create new Apollo Client
    const client = createApolloClient(accessToken);

    // GraphQL Query
    const GET_PROPERTIES = gql`
        query GetProperties {
            properties(limit: 10) {
                title
            }
        }
    `;

    // Deconstruct `data` root from the query response
    const { data } = await client.query({
        query: GET_PROPERTIES,
    });

    // Pass the response as page props
    return {
        // Optionally limit the size of the array: .slice(0, 9)
        props: { properties: data.properties },
    };
}
