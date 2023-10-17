import { gql, useQuery } from '@apollo/client';

const GET_PROPERTIES = gql`
    query GetProperties {
        properties(limit: 10) {
            title
        }
    }
`;

const Properties = () => {
    const { loading, error, data } = useQuery(GET_PROPERTIES);

    if (error) console.error('Failed with error:', error);

    return (
        <ul>
            {loading || !data ? (
                <p>Fetching ...</p>
            ) : (
                data.properties.map((property) => (
                    <li
                        key={property._id}
                        className="bg-white rounded-md border border-slate-200/75 my-2 p-4 leading-normal"
                    >
                        {property.title}
                    </li>
                ))
            )}
        </ul>
    );
};

export default Properties;
