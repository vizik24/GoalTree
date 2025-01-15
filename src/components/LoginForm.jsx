import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Firebase Authentication
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth';
import { useAuth } from '../context/AuthContext'; // Custom Auth Context
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false); // State to keep track of the checkbox
    const [error, setError] = useState('');

    const authContext = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Set authentication persistence based on the checkbox
            const persistenceType = stayLoggedIn ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistenceType);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in user:", userCredential.user);
            authContext.login(userCredential.user); // Update login state in AuthContext
            navigate('/tracker'); // Redirect to tracker
        } catch (error) {
            console.error("Login failed:", error.message);
            setError(error.message); // Display error message
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleLogin}>
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
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Keep me logged in</span>
                                <input 
                                    type="checkbox" 
                                    className="checkbox" 
                                    checked={stayLoggedIn} 
                                    onChange={(e) => setStayLoggedIn(e.target.checked)}
                                />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="flex justify-center mt-4">
                        <p>Don't have an account? 
                            <button 
                                className="btn btn-link"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
