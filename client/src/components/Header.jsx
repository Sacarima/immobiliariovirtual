import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useMediaQuery from '../hooks/useMediaQuery'
import logo from '../assets/logo22.png'
import menu from '../assets/menu-icon.svg'
import closeIcon from '../assets/close-icon.svg'

const BRAND = "#041337";   
const BRAND2 = "#C85F31"; 

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuToggled, setIsMenuToggled] = useState(false)
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl)
  }, [location.search])

  // Tailwind class helpers
  const baseDesktop =
    'hidden sm:inline px-1.5 py-1 text-slate-500 hover:text-[#C85F31] transition-colors'
  const activeDesktop =
    'text-[#C85F31] font-semibold border-b-2 border-[#C85F31]'

  const baseMobile =
    'text-slate-50  hover:text-white hover:bg-white/20 list-none border-b-[.5px] border-white/30 py-4 px-2'
  const activeMobile = 'bg-white/20 text-white font-medium'

  return (
    <header className="bg-[white] border-b-[0.5px] w-full fixed top-0 z-[40] " style={{ "--brand": BRAND, "--brand2": BRAND2 }}>
      <div className="flex justify-between items-center lg:max-w-6xl mx-auto lg:py-2 px-2">
        <Link to="/">
          <div className="py-4 lg:py-2 ">
            <span className="font-bold text-[#C85F31] text-xl">Immobiliario</span>
            <span className="text-md shadow-lg border-[1px] border-black rounded-full px-2">Virtual</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        {isAboveSmallScreens ? (
          <ul className="flex gap-4">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${baseDesktop} ${isActive ? activeDesktop : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${baseDesktop} ${isActive ? activeDesktop : ''}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  `${baseDesktop} ${isActive ? activeDesktop : ''}`
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${baseDesktop} ${isActive ? activeDesktop : ''}`
                }
              >
                Contact
              </NavLink>
            </li>

            <li>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                ) : (
                  <div className="flex items-center gap-1 hover:bg-[#C85F31] px-4 rounded-full py-1  hover:border-[#C85F31] hover:border-[.5px]" style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}>
                    <span className="text-white hover:text-white" >Login</span>
                  </div>
                )}
              </Link>
            </li>
          </ul>
        ) : (
          <button
            className="rounded-full bg-[#C85F31] p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <img src={menu} alt="Menu" />
          </button>
        )}

        {/* Mobile menu */}
        {!isAboveSmallScreens && isMenuToggled && (
          <div className="fixed right-0 bottom-0 h-full bg-[#C85F31] w-full">
            <div className="flex justify-end px-2 pt-1">
              <button
                className="rounded-full"
                onClick={() => setIsMenuToggled(false)}
              >
                <img src={closeIcon} alt="Close menu" />
              </button>
            </div>

            <ul className="flex flex-col items-center gap-4 h-screen w-full text-white p-4">
              <li className='w'>
                <NavLink
                  to="/"
                  end
                  onClick={() => setIsMenuToggled(false)}
                  className={({ isActive }) =>
                    `${baseMobile} ${isActive ? activeMobile : ''}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuToggled(false)}
                  className={({ isActive }) =>
                    `${baseMobile} ${isActive ? activeMobile : ''}`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMenuToggled(false)}
                  className={({ isActive }) =>
                    `${baseMobile} ${isActive ? activeMobile : ''}`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  onClick={() => setIsMenuToggled(false)}
                  className={({ isActive }) =>
                    `${baseMobile} ${isActive ? activeMobile : ''}`
                  }
                >
                  Services
                </NavLink>
              </li>
              <li className="border-b-[.5px] border-white/30">
                <Link to="/profile" onClick={() => setIsMenuToggled(false)}>
                  {currentUser ? (
                    <img
                      className="rounded-full h-16 w-16 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  ) : (
                    <div className="flex items-center gap-2 py-4">
                      <span className="text-slate-50">Login</span>
                    </div>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
