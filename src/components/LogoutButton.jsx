import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
    const authContext = useAuth(); // Access AuthContext
    const user = authContext.user; // Get the current user state

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user from Firebase
            authContext.logout(); // Update context state
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    // Conditionally render the button if the user is logged in
    return user ? (
        <button onClick={handleLogout} className="btn btn-ghost">
            Log Out
        </button>
    ) : null;
}

export default LogoutButton;
