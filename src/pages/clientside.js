import { gql, useQuery } from '@apollo/client';

const GET_PROPERTIES = gql`
    query GetProperties {
        properties {
            title
        }
    }
`;

export default function Clientside() {
    const { loading, error, data } = useQuery(GET_PROPERTIES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <main className="bg-slate-100 flex justify-center">
            <div className="w-3/6">
                <div className="flex justify-center mt-10 mb-6">
                    <h2 className="inline-block text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Client-Side Properties
                    </h2>
                </div>
                <div>
                    <ul>
                        {data.properties.map((property) => (
                            <li
                                key="math.random()"
                                className="bg-white rounded-md border border-slate-200/75 my-2 p-4 leading-normal"
                            >
                                {property.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
