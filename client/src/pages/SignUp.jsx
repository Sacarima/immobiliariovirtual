import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaEnvelope, FaLock, FaSearch, FaUser} from 'react-icons/fa'
import OAuth from '../components/OAuth'



const SignUp = () => {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })

    if (e.target.id === 'password') {
      setConfirmPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if password and confirmPassword match
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match')
      return
    } else {
      setError(null) // Clear the error if passwords match
    }

    if (!formData.username || !formData.email || !formData.password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    } else {
      setError(null) // Clear the error if all fields are filled
    }
    
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          confirmPassword: confirmPassword,
        }),
      })
      const data = await res.json()
      console.log(data)
      
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <div>
           
        </div>

        <div>
          <div className='border rounded-lg py-6 px-8 pb-20 mt-20 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            <h1 className='text-3xl text-center font-semibold  mt-7 mb-7'>Sign Up</h1>
          
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <label className="flex items-center gap-2 border-b focus:border-b-slate-600 mt-3">
          
                      <FaUser className=" text-slate-600" />
                      <input
                          type="text"
                          placeholder='Username'
                          className='border p-3 rounded-lg outline-none bg-transparent border-none flex-auto'
                          onChange={handleChange}
                          id='username'
                      />
                </label>
                <label className="flex items-center gap-2 border-b focus:border-b-slate-600">
                      <FaEnvelope className=" text-slate-600" />
                      <input
                          type="email"
                          placeholder='Email'
                          className='border p-3 rounded-lg outline-none bg-transparent border-none flex-auto'
                          onChange={handleChange}
                          id='email'
                      />
                </label>
                  <label className="flex items-center gap-2 border-b">
                      <FaLock className=" text-slate-600" />
                      <input
                          type="password"
                          placeholder='Password'
                          className=' p-3 rounded-lg outline-none  border-none focus:bg-none flex-auto'
                          onChange={handleChange}
                          id='password'
                      />
          
                  </label>

                  <label className="flex items-center gap-2 border-b">
                      <FaLock className=" text-slate-600" />
                      <input
                          type="password"
                          placeholder='Confirm Password'
                          className=' p-3 rounded-lg outline-none  border-none focus:bg-none flex-auto'
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id='confirmPassword'
                      />
                  
                  </label>
          
                <button
                  disabled={loading}
                  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 outline-none mt-6'
                >
                    {loading ? 'Loading...' : 'Sign up'}
                </button>
                <OAuth />
                  </form>
          
                  <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className='text-blue-700'>Sign in</span>
            </Link>
                  </div>
                  {error && <p className='text-red-500 mt-5'>{error}</p>}
          </div>
        </div>
    </div>
  )
}

export default  SignUp