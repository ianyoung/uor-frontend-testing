import { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import { setCookie } from 'nookies';

// Connect to MongoDB Realm app
const app = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);

/**
 * Get anonymous auth token
 *
 * If a user isn't logged in then login anonymous user and return
 * the accesss token. Otherwise refresh the access token.
 *
 * @returns {app.user.accessToken} Realm access token
 */
async function getAccessToken() {
    if (!app.currentUser) {
        await app.logIn(Realm.Credentials.anonymous());
    } else {
        await app.currentUser.refreshAccessToken();
    }
    return app.currentUser.accessToken;
}

/**
 * Perform fetch of access token when component loads or refresh
 * the access token on an interval before it expires.
 *
 * @returns {accessToken} React state object containing valid access token
 **/
export default function useRealmAnonAuth() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        async function fetchAccessToken() {
            const token = await getAccessToken();
            // Set it to state for client-side access
            setAccessToken(token);
            // Write to a cookie for server-side access in getServerSideProps()
            setCookie(null, 'accessToken', token);
        }

        fetchAccessToken();
        // Refresh every 29 minutes (30 min expiration)
        const interval = setInterval(fetchAccessToken, 29 * 60 * 1000);

        // Clear the interval when the component unmounts
        // to prevent memory leaks
        return () => clearInterval(interval);
    }, []);

    return accessToken;
}
