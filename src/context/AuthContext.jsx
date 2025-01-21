import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Ensure you import the Firebase auth instance

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log("User is logged in:", user); // Log user data
                setUser(user);
                
            } else {
                console.log("No user logged in"); // Log if no user is logged in
                setUser(null);
            }
        });

        // Cleanup the subscription
        return () => {
            console.log("Unsubscribing auth listener"); // Log when unsubscribing
            unsubscribe();
        };
    }, []);

    const login = (userData) => {
        console.log("Logging in user:", userData); // Log when a user logs in
        setUser(userData);
    };

    const logout = () => {
        console.log("Logging out user"); // Log when a user logs out
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
