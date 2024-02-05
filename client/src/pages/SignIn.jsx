import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {FaEnvelope, FaLock, FaSearch} from 'react-icons/fa'
import { signInStart, signInSuccess, signInFailure  } from '../redux/user/userSlice'
import OAuth from '../components/OAuth';


const SignIn = () => {

  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div className='border rounded-lg py-6 px-8 pb-20 mt-20 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            <Link to="/forgot-password">
              <p className='text-blue-600 cursor-pointer'>Forgot password?</p>
            </Link>
            <button
              disabled={loading}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 outline-none'
            >
                {loading ? 'Loading...' : 'Sign in'}
            </button>
            <OAuth />
      </form>
      
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  )
}

export default  SignIn