import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { app } from '../firebase'
import { Link } from 'react-router-dom'
import DeleteConfirmation from '../components/DeleteConfirmation'
import Footer from '../components/Footer'


const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (file) handleFileUpload(file)
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 mt-14 lg:mt-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#041337] to-[#C85F31]">Profile</h1>
          <p className="mt-2 text-slate-600">Manage your account details, avatar, and your listings.</p>
          <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#041337] to-[#C85F31]"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile form */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-[#041337]/5 to-[#C85F31]/5">
                <h2 className="text-lg font-semibold text-slate-900">Account</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <img
                    src={formData.avatar || currentUser.avatar}
                    alt="profile"
                    className="h-28 w-28 rounded-full ring-2 ring-[#C85F31] object-cover cursor-pointer shadow"
                    onClick={() => fileRef.current?.click()}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-600">Click the avatar to upload a new image.</p>
                    <div className="mt-2 h-1 rounded bg-slate-200">
                      {(filePerc > 0 && filePerc < 100) && (
                        <div
                          className="h-1 rounded bg-gradient-to-r from-[#041337] to-[#C85F31]"
                          style={{ width: `${filePerc}%` }}
                        />
                      )}
                    </div>
                    <p className="mt-2 text-sm">
                      {fileUploadError ? (
                        <span className="text-red-700">Error Image upload (image must be less than 2 mb)</span>
                      ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                      ) : filePerc === 100 ? (
                        <span className="text-emerald-700">Image successfully uploaded!</span>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>
                {/* Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Username</span>
                    <input
                      type="text"
                      id="username"
                      placeholder="username"
                      defaultValue={currentUser.username}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border-slate-300 p-3.5 focus:border-[#C85F31] focus:ring-[#C85F31]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input
                      type="email"
                      id="email"
                      placeholder="email"
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border-slate-300 p-3.5 focus:border-[#C85F31] focus:ring-[#C85F31]"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Password</span>
                    <input
                      type="password"
                      id="password"
                      placeholder="password"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border-slate-300 p-3.5 focus:border-[#C85F31] focus:ring-[#C85F31]"
                    />
                  </label>
                </div>
                {/* Form actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <button
                    disabled={loading}
                    className="inline-flex justify-center rounded-2xl bg-gradient-to-r from-[#041337] to-[#C85F31] px-5 py-3 text-white text-sm font-medium tracking-wide hover:opacity-95 disabled:opacity-70 shadow"
                  >
                    {loading ? 'Loading...' : 'Update'}
                  </button>
                  <Link
                    to="/create-listing"
                    className="inline-flex justify-center rounded-2xl border border-[#C85F31] px-5 py-3 text-sm font-medium text-[#C85F31] hover:shadow"
                  >
                    Create Listing
                  </Link>
                </div>
                {/* Alerts */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-sm">{error}</div>
                )}
                {updateSuccess && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700 text-sm">Profile updated successfully</div>
                )}
              </form>
            </div>
          </section>
          {/* Side actions */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="px-6 py-5 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Quick actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={handleShowListings}
                  className="w-full rounded-xl bg-gradient-to-r from-[#041337] to-[#C85F31] px-4 py-2.5 text-white text-sm font-medium hover:opacity-95"
                >
                  Show Listings
                </button>
                {showListingsError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-700 text-sm">Error showing listings</div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="px-6 py-5 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Account</h3>
              </div>
              <div className="p-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => DeleteConfirmation() && handleDeleteUser()}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#C85F31] border border-[#C85F31] hover:shadow"
                >
                  Delete account
                </button>
                <button
                  onClick={handleSignOut}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 hover:shadow"
                >
                  Sign out
                </button>
              </div>
            </div>
          </aside>
        </div>
        {/* Listings */}
        {userListings && userListings.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">Your Listings</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userListings.map((listing) => (
                <div key={listing._id} className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 flex items-center gap-4">
                  <Link to={`/listing/${listing._id}`} className="shrink-0">
                    <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 rounded-lg object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={`/listing/${listing._id}`} className="block text-slate-800 font-medium hover:underline truncate">
                      {listing.name}
                    </Link>
                    <div className="mt-2 flex gap-3">
                      <button onClick={() => handleListingDelete(listing._id)} className="text-sm font-medium text-[#C85F31]">Delete</button>
                      <Link to={`/update-listing/${listing._id}`} className="text-sm font-medium text-[#041337]">Edit</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Profile
