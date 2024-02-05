import { useState } from 'react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if(res.ok) {
                setMessage('If there is an account associated with this email, you will receive a password reset link.')
            }else {
                throw new Error(data.message || 'Failed to send password reset email')
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    
    <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='forgot-password-container '>
            <a href="#">
                Immobiliario<span>Virtual</span>
            </a>
            <div className=''>
                <h2>Change Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor='email'>Your email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className=''>Reset Password</button>
                </form>
                {message && <p className='success-message text-green-700'>{message}</p>}
                {error && <p className='error-message text-red-700'>{error}</p>}
            </div>
        </div>
    </section>
  )
}
