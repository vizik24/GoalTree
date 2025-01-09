import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Firebase Authentication and Firestore
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Custom Auth Context
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const authContext = useAuth(); // Access AuthContext
    const navigate = useNavigate(); // React Router navigation

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with the name
            await updateProfile(user, { displayName: name });

            // Create user document in Firestore
            await addDoc(collection(db, "users"), {
                userId: user.uid,
                name: name,
                email: user.email,
                createdAt: serverTimestamp(), // Timestamp for account creation
            });

            console.log("User created and document added:", user);

            // Update AuthContext state
            authContext.login(user);

            // Redirect to tracker or another page
            navigate('/tracker');
        } catch (error) {
            console.error("Sign up failed:", error.message);
            setError(error.message); // Display error message
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Sign Up</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSignUp}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="input input-bordered" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="input input-bordered" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="input input-bordered" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="flex justify-center mt-4">
                        <p>Already have an account? 
                            <button 
                                className="btn btn-link"
                                onClick={() => navigate('/login')} // Navigate to login page
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
