import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../firebase/auth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // placeholder for real auth
        setTimeout(() => setLoading(false), 800)
    }

    /**
     * Function: handleLogin
     * 
     * Handles both sign in and sign up based on the isSignUp state. After successful authentication, it retrieves the user's token and stores it in localStorage, then navigates to the dashboard.
     */
    const handleLogin = async () => {
        try {
            let user;

            if(isSignUp) {
                user = await signUpWithEmail(email, password);
            } else {
                user = await signInWithEmail(email, password);
            }

            const token = await user.getIdToken();
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Function: handleGoogleSignIn
     * Handles sign in with Google. After successful authentication, it retrieves the user's token and stores it in localStorage, then navigates to the dashboard.
     */

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            const token = await user.getIdToken();
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex flex-col md:flex-row">
            {/* Left hero */}
            <aside className="hidden md:flex w-3/5 items-center justify-center bg-gradient-to-b from-purple-700 to-indigo-800 p-8">
                <div className="max-w-lg text-white">
                    <h1 className="text-4xl font-extrabold">AI Resume Analyzer</h1>
                    <p className="mt-4 text-lg text-white/90">Get tailored suggestions and a match score for every job you apply to. Faster, clearer, smarter.</p>
                    <ul className="mt-6 space-y-2 text-sm text-white/80">
                        <li>• Automated skill extraction</li>
                        <li>• Match scoring and improvements</li>
                        <li>• Easy resume editing tips</li>
                    </ul>
                </div>
            </aside>

            {/* Right card */}
            <main className="flex w-full md:w-2/5 items-center justify-center bg-slate-900 p-8">
                <div className="w-full max-w-md rounded-2xl border border-white/6 bg-white/5 p-8 shadow-lg">
                    <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                    <p className="mt-1 text-sm text-slate-300">Sign in to continue to your dashboard</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm text-slate-200 mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                required
                                className="w-full rounded-md bg-transparent border border-white/8 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm text-slate-200 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full rounded-md bg-transparent border border-white/8 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-300">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded accent-purple-500" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="hover:underline">Forgot?</Link>
                        </div>

                        <button
                        onClick={signInWithEmail}
                            type="submit"
                            disabled={!email || !password || loading}
                            className="w-full rounded-md bg-purple-600 px-4 py-2 text-white disabled:opacity-60"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-300">Or continue with</div>
                    <div className="mt-3 flex gap-3">
                        <button 
                            className="flex-1 rounded-md border border-white/8 bg-transparent px-3 py-2 text-sm text-white hover:bg-white/5"
                            onClick={signInWithGoogle}
                        >
                            Google
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-300">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-purple-400 hover:underline">Get started</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Login