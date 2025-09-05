import { useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia"
import { FaParking, FaCouch, FaTag } from 'react-icons/fa'
import { app } from "../firebase"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer"


const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })

  console.log(formData)

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false)
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 mt-14 lg:mt-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#041337] to-[#C85F31]">Create a Listing</h1>
          <p className="mt-2 text-slate-600">Add property details, upload photos, and publish your listing in minutes.</p>
          <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-[#041337] to-[#C85F31]"></div>
        </div>
        {/* Card Shell */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6 sm:p-8">
                {/* Name */}
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                <div className="mt-2">
                  <input
                    type='text'
                    id='name'
                    placeholder='e.g., Bright 2‑bedroom apartment near city center'
                    maxLength='62'
                    minLength='10'
                    required
                    onChange={handleChange}
                    value={formData.name}
                    className="w-full rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5"
                  />
                  <div className="mt-1 text-xs text-slate-500 flex justify-between"><span>10–62 characters</span><span>{formData.name?.length || 0}/62</span></div>
                </div>
                {/* Description */}
                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    id='description'
                    placeholder='Describe the property, neighborhood, and what makes it special…'
                    required
                    onChange={handleChange}
                    value={formData.description}
                    className="mt-2 w-full min-h-[140px] rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5 whitespace-pre-wrap"
                  />
                </div>
                {/* Address */}
                <div className="mt-6">
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
                  <input
                    type='text'
                    id='address'
                    placeholder='Street, City, Country'
                    required
                    onChange={handleChange}
                    value={formData.address}
                    className="mt-2 w-full rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5"
                  />
                </div>
                {/* Type & Features */}
                <div className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Type selector (keeps the same checkbox logic) */}
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Listing Type</p>
                      <div className="inline-flex bg-slate-100 rounded-xl p-1">
                        <label className={`cursor-pointer select-none px-4 py-2 rounded-lg text-sm font-medium ${formData.type === 'sale' ? 'bg-white shadow border border-[#C85F31]' : 'text-slate-600'}`}>
                          <input
                            type='checkbox'
                            id='sale'
                            className='sr-only'
                            onChange={handleChange}
                            checked={formData.type === 'sale'}
                          />
                          Sell
                        </label>
                        <label className={`cursor-pointer select-none px-4 py-2 rounded-lg text-sm font-medium ${formData.type === 'rent' ? 'bg-white shadow border border-[#C85F31]' : 'text-slate-600'}`}>
                          <input
                            type='checkbox'
                            id='rent'
                            className='sr-only'
                            onChange={handleChange}
                            checked={formData.type === 'rent'}
                          />
                          Rent
                        </label>
                      </div>
                    </div>
                    {/* Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'parking',   label: 'Parking',   Icon: FaParking },
                        { id: 'furnished', label: 'Furnished', Icon: FaCouch   },
                        { id: 'offer',     label: 'Offer',     Icon: FaTag     },
                      ].map(({ id, label, Icon }) => (
                        <div key={id} className="relative">
                          {/* Make the input the peer so peer-checked styles work reliably on desktop */}
                          <input
                            type="checkbox"
                            id={id}
                            onChange={handleChange}
                            checked={formData[id]}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={id}
                            role="switch"
                            aria-checked={!!formData[id]}
                            className="
                              flex items-center justify-between gap-3
                              rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm
                              cursor-pointer select-none transition
                              peer-checked:border-[#C85F31] peer-checked:bg-[#C85F31]/5
                            "
                          >
                            {/* Left: feature icon + label (tints on check) */}
                            <span className="inline-flex items-center gap-2">
                              <Icon className="text-slate-500 text-lg transition peer-checked:text-[#C85F31]" />
                              <span className="text-slate-700 transition peer-checked:text-[#041337]">
                                {label}
                              </span>
                            </span>
                            {/* Right: MOBILE toggle icons (swap on click) */}
                            <span className="sm:hidden">
                              {formData[id] ? (
                                <LiaToggleOnSolid className="text-2xl text-[#C85F31]" />
                              ) : (
                                <LiaToggleOffSolid className="text-2xl text-slate-400" />
                              )}
                            </span>
                            {/* Right: DESKTOP pill switch (color changes on check) */}
                            <span className="hidden sm:inline-block relative h-8 w-12 rounded-full bg-slate-300 transition peer-checked:bg-[#c85e31]">
                              <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform will-change-transform peer-checked:translate-x-5" />
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Numbers */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Bedrooms</span>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type='number'
                        id='bedrooms'
                        min='1'
                        max='10'
                        required
                        onChange={handleChange}
                        value={formData.bedrooms}
                        className='w-full rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5'
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Bathrooms</span>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type='number'
                        id='bathrooms'
                        min='1'
                        max='10'
                        required
                        onChange={handleChange}
                        value={formData.bathrooms}
                        className='w-full rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5'
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Regular price <span className="text-xs text-slate-500">($ / month)</span></span>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type='number'
                        id='regularPrice'
                        min='50'
                        max='10000000'
                        required
                        onChange={handleChange}
                        value={formData.regularPrice}
                        className='w-full rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5'
                      />
                    </div>
                  </label>
                </div>
                {formData.offer && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Discounted price <span className="text-xs text-slate-500">($ / month)</span></span>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type='number'
                          id='discountPrice'
                          min='0'
                          max='100000000'
                          required
                          onChange={handleChange}
                          value={formData.discountPrice}
                          className='w-full rounded-xl border-slate-300 focus:border-[#C85F31] focus:ring-[#C85F31] p-3.5'
                        />
                      </div>
                    </label>
                  </div>
                )}
                {/* Error alert */}
                {error && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
                )}
              </div>
            </div>
          </div>
          {/* Right: Photos & Submit */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-6">
              {/* Upload Card */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-6 sm:p-7">
                  <p className="font-semibold text-slate-900">Images</p>
                  <p className='mt-1 text-sm text-slate-600'>The first image will be the cover (max 6)</p>
                  {/* File input row (kept the same ids/behavior) */}
                  <div className='mt-4 flex gap-3'>
                    <input
                      className='p-2.5 border border-slate-300 rounded-lg w-full text-slate-700 file:mr-3 file:py-2 file:px-4 hover:file:opacity-75 file:rounded-md file:border-0 file:cursor-pointer'
                      type='file'
                      id='images'
                      accept='image/*'
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <button
                      onClick={handleImageSubmit}
                      type='button'
                      disabled={uploading}
                      className='shrink-0 rounded-lg border border-[#C85F31] px-4 py-2.5 text-[#C85F31] hover:shadow disabled:opacity-70'
                    >
                      {uploading ? 'Uploading…' : 'Upload'}
                    </button>
                  </div>
                  {imageUploadError && <p className="mt-2 text-sm text-red-700">{imageUploadError}</p>}
                  {/* Preview Grid */}
                  {formData.imageUrls.length > 0 && (
                    <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3'>
                      {formData.imageUrls.map((url, index) => (
                        <div key={url} className='group relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50'>
                          <img src={url} alt='listing' className='h-28 w-full object-cover' />
                          <button
                            type='button'
                            onClick={() => handleRemoveImage(index)}
                            className='absolute top-2 right-2 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-red-600 shadow hover:bg-white'
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Submit */}
              <button
                disabled={loading || uploading}
                className='w-full rounded-2xl bg-gradient-to-r from-[#041337] to-[#C85F31] text-white py-3.5 text-sm font-medium tracking-wide hover:opacity-95 disabled:opacity-70 shadow-lg'
              >
                {loading ? 'Creating…' : 'Create listing'}
              </button>
            </div>
          </aside>
        </form>
      </main>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default CreateListing

