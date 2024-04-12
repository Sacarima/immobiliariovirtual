
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo2.png'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        setLoading(true) // start loading
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            setLoading(false) // stop loading
            if(res.ok) {
                setMessage('If there is an account associated with this email, you will receive a password reset link.')
                navigate('/reset-password') // Redirect to the reset passwprd page
            }else {
                throw new Error(data.message || 'Failed to send password reset email')
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    
    <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <Link to='/'>
                <a href="#" className='flex items-center mb-6 text-2xl font-semibold text-gray-400 dark:text-white' alt='logo'>
                    <img src={logo} alt="logo" />
                    {/* Immobiliario<span className='text-gray-700'>Virtual</span> */}
                </a>
            </Link>
            <div className='w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray 700 sm:p-8'>
                <h2 className='mg-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Forgot your password ?</h2>
                <p
                    className='font-light text-gray-600 dark:text-gray-400 mb-6'
                >
                    Don't fret! Just type in your email and we will send you a code to reset your password!
                </p>
                <form 
                    onSubmit={handleResetPassword}
                    className='mt-4 space-y-4 lg:mt-5 md:space-y-5'
                >
                    <div>
                        <label 
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Your email
                        </label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500 '

                            type='email'
                            id='email'
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-slate-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-700 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
                    <button 
                        type='submit' 
                        className='w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"'
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className='success-message text-green-700'>{message}</p>}
                {error && <p className='error-message text-red-700'>{error}</p>}
            </div>
        </div>
    </section>
  )
}
