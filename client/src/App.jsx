import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import AboutImmobiliaVirtual from './pages/AboutImmobiliaVirtual'
import ServicesImmobiliaVirtual from './pages/ServicesImmobiliaVirtual'


 const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<AboutImmobiliaVirtual />}/>
          <Route path='/contact' element={<Contact />} />
          <Route path='/service' element={<ServicesImmobiliaVirtual />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          </Route>
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route path='/search' element={<Search />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App