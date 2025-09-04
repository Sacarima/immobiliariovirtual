import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiInfo, FiPhone, FiBriefcase } from "react-icons/fi"
import { useSelector } from 'react-redux'
import useMediaQuery from '../hooks/useMediaQuery'
import logo from '../assets/logo22.png'
import menu from '../assets/menu-icon.svg'
import { CiMenuFries } from "react-icons/ci"
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
      <div className="flex justify-between items-center lg:max-w-7xl mx-auto lg:py-2 px-2">
        <Link to="/">
          <div className="py-4 lg:py-2 ">
            <span className="font-bold text-[#C85F31] text-xl">Immobiliario</span>
            <span className="text-md uppercase font-extralight">Virtual</span>
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
            className="rounded-full  p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <CiMenuFries className='text-3xl'/>
          </button>
        )}

        {/* Mobile menu */}
        {/* {!isAboveSmallScreens && isMenuToggled && (
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
        )} */}

        {/* Mobile menu */}
        {!isAboveSmallScreens && isMenuToggled && (
          <div className="fixed inset-0 z-50">
            {/* Soft backdrop for depth (visual only) */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* Panel */}
            <nav
              className="
                relative h-full w-full text-white
                bg-gradient-to-br from-[#041337] to-[#C85F31]
                pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
                shadow-2xl
              "
              aria-label="Mobile Navigation"
            >
              {/* Top bar */}
              <div className="flex items-center justify-end px-3 py-2">
                <button
                  className="rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 hover:scale-[1.03] transition"
                  onClick={() => setIsMenuToggled(false)}
                  aria-label="Close menu"
                >
                  <img src={closeIcon} alt="Close menu" className="h-6 w-6" />
                </button>
              </div>

              {/* Links */}
              <ul className="relative z-10 flex flex-col items-stretch gap-3 h-[calc(100vh-72px)] px-5 pb-6">
                <li className="group">
                  <NavLink
                    to="/"
                    end
                    onClick={() => setIsMenuToggled(false)}
                    className={({ isActive }) =>
                      `${baseMobile} ${isActive ? activeMobile : ""} flex items-center gap-3 rounded-xl px-4 py-3 bg-white/0 hover:bg-white/10 transition`
                    }
                  >
                    {/* Icon tints on active/hover but does not change logic */}
                    <FiHome className="text-white/80 group-hover:text-white" />
                    <span className="truncate">Home</span>
                  </NavLink>
                </li>

                <li className="group">
                  <NavLink
                    to="/about"
                    onClick={() => setIsMenuToggled(false)}
                    className={({ isActive }) =>
                      `${baseMobile} ${isActive ? activeMobile : ""} flex items-center gap-3 rounded-xl px-4 py-3 bg-white/0 hover:bg-white/10 transition`
                    }
                  >
                    <FiInfo className="text-white/80 group-hover:text-white" />
                    <span className="truncate">About</span>
                  </NavLink>
                </li>

                <li className="group">
                  <NavLink
                    to="/contact"
                    onClick={() => setIsMenuToggled(false)}
                    className={({ isActive }) =>
                      `${baseMobile} ${isActive ? activeMobile : ""} flex items-center gap-3 rounded-xl px-4 py-3 bg-white/0 hover:bg-white/10 transition`
                    }
                  >
                    <FiPhone className="text-white/80 group-hover:text-white" />
                    <span className="truncate">Contact</span>
                  </NavLink>
                </li>

                <li className="group">
                  <NavLink
                    to="/service"
                    onClick={() => setIsMenuToggled(false)}
                    className={({ isActive }) =>
                      `${baseMobile} ${isActive ? activeMobile : ""} flex items-center gap-3 rounded-xl px-4 py-3 bg-white/0 hover:bg-white/10 transition`
                    }
                  >
                    <FiBriefcase className="text-white/80 group-hover:text-white" />
                    <span className="truncate">Services</span>
                  </NavLink>
                </li>

                {/* Divider */}
                <li className="my-2 border-t border-white/20" />

                {/* Profile / Login */}
                <li className="border-b border-white/20 pb-3">
                  <Link to="/profile" onClick={() => setIsMenuToggled(false)} className="block">
                    {currentUser ? (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
                        <img
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-white/70"
                          src={currentUser.avatar}
                          alt="profile"
                        />
                        <div className="min-w-0">
                          <p className="text-sm opacity-90">Signed in</p>
                          <p className="truncate font-medium">Profile</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition">
                        <span className="text-white font-medium">Login</span>
                      </div>
                    )}
                  </Link>
                </li>

                {/* Bottom gradient accent bar (purely decorative) */}
                <li className="mt-auto">
                  <div className="h-1.5 w-24 rounded-full bg-white/40" />
                </li>
              </ul>
            </nav>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header
