import * as Realm from 'realm-web';
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { setCookie } from 'nookies';

// Connect to MongoDB Realm app
const app = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);

// Create the context
const AuthContext = createContext({});

// Custom hook as a wrapper
const useAuthContext = () => {
    // Set a custom error message
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a AuthProvider');
    }
    return context;
};

// Get new or refreshed access token
async function getCurrentUser() {
    // Guarantee that there's a logged in user with a valid access token
    if (!app.currentUser) {
        // If no user is logged in, log in an anonymous user
        await app.logIn(Realm.Credentials.anonymous());
    } else {
        // Refresh to be certain access token isn't stale
        await app.currentUser.refreshAccessToken();
    }
    // Return current user and their access token
    // Ref: https://github.com/realm/realm-js/blob/main/packages/realm-web/src/User.ts
    return {
        currentUser: app.currentUser,
        token: app.currentUser.accessToken,
    };
}

// Custom provider as a wrapper
const AuthProvider = ({ children }) => {
    // The state values to be provided
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    // Cache the values so components using this context only update if
    // the values have changed.
    const contextValue = useMemo(
        () => ({
            user,
            accessToken,
        }),
        [user, accessToken]
    );

    useEffect(() => {
        async function setAuthentication() {
            const { currentUser, token } = await getCurrentUser();
            // Set current user and access token to local state values
            setAccessToken(token);
            setUser(currentUser);
            // Write token to a cookie for server-side access via getServerSideProps()
            setCookie(null, 'accessToken', token);
        }

        // Set the user and access token when the component mounts
        setAuthentication();

        // Refresh every 29 minutes (30 min expiration)
        const interval = setInterval(setAuthentication, 29 * 60 * 1000);

        // Clear the interval when the component unmounts
        // to prevent memory leaks
        return () => clearInterval(interval);
    }, []);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Only export wrappers
export { AuthProvider, useAuthContext };
