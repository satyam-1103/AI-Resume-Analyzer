import React from 'react'
import { Link } from 'react-router-dom'

const Error403 = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-400">403</h1>
        <p className="mt-4 text-lg text-slate-300">Forbidden — you don’t have permission to access this page.</p>
        <div className="mt-6">
          <Link to="/login" className="text-purple-400 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Error403
