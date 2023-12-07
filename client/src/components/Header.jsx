import {FaLock, FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

 const Header = () => {
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()

  return (
    <header className='bg-slate-100'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-6'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Immobiliario</span>
                    <span className='text-slate-700'>Virtual</span>
                </h1>
            </Link>
            <form className='flex  items-center bg-white p-1 rounded-lg'>
                <input type="text" placeholder='Search...' className='outline-none bg-transparent w-24 sm:w-64'/>
                <FaSearch className='text-slate-600' />
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:scale-110'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:scale-110'>About</li>
                </Link>
                <Link to='/sign-in'>
                    <li className=' text-slate-700 hover:scale-110'>Sign in</li>
                </Link>
                <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header
