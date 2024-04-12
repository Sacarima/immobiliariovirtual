import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useMediaQuery from '../hooks/useMediaQuery'
import logo from '../assets/logo2.png'
import menu from '../assets/menu-icon.svg'
import closeIcon from '../assets/close-icon.svg'


const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-[white]  border-b-[0.5px] w-full fixed top-0 z-[40] '>
      <div className='flex justify-between items-center sm:max-w-[100%]  max-w-[75%] mx-auto p-6 py-0 '>
        <Link to='/'>
          <div>
            <img src={logo} alt='logo' className='w-[100%]'/>
          </div>
        </Link>
        {/** Desktop Menu */}
       { isAboveSmallScreens ?( <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline  text-slate-500 hover:text-[#C85F31]'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-500  hover:text-[#C85F31]'>About</li>
          </Link>
          <Link to='/contact'>
            <li className='hidden sm:inline text-slate-500 hover:text-[#C85F31]'>Contact</li>
          </Link>
          <Link to='/service'>
            <li className='hidden sm:inline text-slate-500 hover:text-[#C85F31]'>Services</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <div className='flex items-center gap-1'>
                <FaUser className='text-slate-500' />
                <li className='  text-slate-500 '> Login</li>
              </div>
            )}
          </Link>
            </ul>
            ) : ( 
              <button
                  className="rounded-full bg-[#C85F31] p-2"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <img src={menu} alt="Menu" />
             </button>
            )}

            {/** Mobile menu */}
            {!isAboveSmallScreens && isMenuToggled && (
              
              
              <div className="fixed right-0 bottom-0 h-full bg-[#C85F31] w-[300px]">
                <div className="flex justify-end p-12">
                <button
                        className="rounded-full p-2"
                        onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                        <img src={closeIcon} alt="Menu" />
                    </button>
                </div>
                <div className="flex flex-col gap-10 ml-[33%] text-2lx text-white">
                  <Link to='/'>
                    <li className='text-slate-50 hover:text-white list-none'>Home</li>
                  </Link>
                  <Link to='/about'>
                    <li className='text-slate-50  hover:text-white list-none'>About</li>
                  </Link>
                  <Link to='/contact'>
                    <li className='text-slate-50 hover:text-white list-none'>Contact</li>
                  </Link>
                  <Link to='/service'>
                    <li className='text-slate-50 hover:text-white list-none'>Services</li>
                  </Link>
                  <Link to='/profile'>
                    {currentUser ? (
                      <img
                        className='rounded-full h-16 w-16 object-cover'
                        src={currentUser.avatar}
                        alt='profile'
                      />
                    ) : (
                      <div className='flex items-center gap-2'>
                        <FaUser className='text-slate-50' />
                        <li className='  text-slate-50 list-none'> Login</li>
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            )}
        </div>
    </header>
  )
}

export default Header
