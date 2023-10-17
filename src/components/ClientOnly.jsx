import { useEffect, useState } from 'react';

/**
 * Only load child componets from the client-side
 *
 * This component is designed to wrap around any componets which use Apollo
 * hooks to make GraphQL requests on the client-side. This ensures the
 * component is ready to receive the data before requesting it.
 *
 * @ref https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/#using-apollo-client-for-client-side-data
 */
export default function ClientOnly({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <div {...delegated}>{children}</div>;
}
