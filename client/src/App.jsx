import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Footer from './components/Footer'


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
          <Route path="/about" element={<About />}/>
          <Route path='/contact' element={<Contact />} />
          <Route path='/service' element={<Service />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          </Route>
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  )
}

export default App