
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'


// Icons
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaArrowLeft,
} from 'react-icons/fa'

import Contact from '../components/Contact'

export default function Listing() {


  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(true) // keep existing default behavior

  const params = useParams()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  // ===== Utils =====
  const formatPrice = (value) =>
    typeof value === 'number' ? value.toLocaleString('en-US') : value

  const mapUrl = useMemo(() => {
    if (!listing?.address) return '#'
    const q = encodeURIComponent(listing.address)
    return `https://www.google.com/maps/search/?api=1&query=${q}`
  }, [listing])

  // ===== Data Fetching =====
  useEffect(() => {
    const controller = new AbortController()
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(`/api/listing/get/${params.listingId}`, {
          signal: controller.signal,
        })
        const data = await res.json()
        if (data?.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchListing()
    return () => controller.abort()
  }, [params.listingId])

  // ===== Handlers =====
  const navigateBack = () => navigate('/search')

  const handleShare = async () => {
    const shareData = {
      title: listing?.name || 'Listing',
      text: 'Check out this listing',
      url: window.location.href,
    }

    // Web Share API if available
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
    } catch (_) {
      // fall through to clipboard copy
    }

    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  // ===== UI Subcomponents =====
  const Skeleton = () => (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="animate-pulse">
        <div className="h-6 w-56 bg-slate-200 rounded mb-6" />
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="h-[420px] rounded-xl bg-slate-200" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 rounded-lg bg-slate-200" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-64 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )

  const ErrorView = () => (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-100">
        <span className="i-ph-warning-circle-duotone" />
        <span className="font-medium">Something went wrong</span>
      </div>
      <p className="mt-4 text-slate-600">We couldn't load this listing. Please try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:opacity-95"
      >
        Reload
      </button>
    </div>
  )

  const Stat = ({ icon: Icon, label, value }) => (
    <div className="min-w-[140px]">
      <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">{label}</p>
      <div className="flex items-center gap-2 text-slate-800">
        <Icon className="text-lg" />
        <span className="font-medium">{value}</span>
      </div>
    </div>
  )

  const Badge = ({ children, tone = 'slate' }) => (
    <span
      className={
        `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ` +
        (tone === 'green'
          ? 'bg-green-50 text-green-700 border border-green-100'
          : tone === 'red'
          ? 'bg-red-50 text-red-700 border border-red-100'
          : 'bg-slate-50 text-slate-700 border border-slate-100')
      }
    >
      {children}
    </span>
  )

  const PriceBlock = () => (
    <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-5 shadow-sm">
      <div className="flex items-end gap-2">
        <p className="text-2xl font-semibold text-slate-900">
          {listing?.offer ? (
            <>
              ${formatPrice(listing.discountPrice)}
              {listing?.type === 'rent' && <span className="text-base font-normal text-slate-500"> / month</span>}
            </>
          ) : (
            <>
              ${formatPrice(listing?.regularPrice)}
              {listing?.type === 'rent' && <span className="text-base font-normal text-slate-500"> / month</span>}
            </>
          )}
        </p>
        {listing?.offer && (
          <Badge tone="green">Save ${formatPrice(+listing.regularPrice - +listing.discountPrice)}</Badge>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge tone={listing?.type === 'rent' ? 'red' : 'green'}>
          {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
        </Badge>
        <Badge>
          <FaMapMarkerAlt className="mr-1" />
          <a href={mapUrl} target="_blank" rel="noreferrer" className="hover:underline">
            View on map
          </a>
        </Badge>
      </div>

      {currentUser && listing?.userRef !== currentUser._id && !contact && (
        <button
          onClick={() => setContact(true)}
          className="mt-5 w-full rounded-lg bg-slate-900 text-white py-3 font-medium hover:opacity-95"
        >
          Contact landlord
        </button>
      )}

      {contact && (
        <div className="mt-6">
          <Contact listing={listing} />
        </div>
      )}
    </div>
  )

  const Gallery = () => {
  const images = listing?.imageUrls || []

  // Main carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: 'start',
  })

  // Thumbs carousel
  const [thumbRef, thumbApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'start',
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const i = emblaApi.selectedScrollSnap()
    setSelectedIndex(i)
    // keep the selected thumb in view
    if (thumbApi) thumbApi.scrollTo(i)
  }, [emblaApi, thumbApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const onThumbClick = useCallback(
    (index) => () => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  if (!images.length) {
    return (
      <div className="w-full h-[56vw] sm:h-[420px] md:h-[520px] rounded-2xl bg-slate-100" />
    )
  }

  return (
    <div className="relative">
      {/* MAIN */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((url, i) => (
            <div key={url} className="flex-none basis-full min-w-0">
              <div className="w-full h-[62vw] sm:h-[420px] md:h-[520px] bg-slate-100">
                <img
                  src={url}
                  alt={`Photo ${i + 1} of ${listing?.name || 'listing'}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows (kept inside so they never cause horizontal overflow) */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous photo"
            onClick={scrollPrev}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
          >
            <FaChevronLeft className="text-slate-700" />
          </button>
          <button
            aria-label="Next photo"
            onClick={scrollNext}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
          >
            <FaChevronRight className="text-slate-700" />
          </button>
        </>
      )}

      {/* THUMBS */}
      <div className="mt-3 overflow-hidden" ref={thumbRef}>
        <div className="flex gap-2">
          {images.map((url, i) => (
            <button
              key={url}
              onClick={onThumbClick(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={[
                'flex-none basis-1/4 sm:basis-1/5 lg:basis-1/6',
                'h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border',
                i === selectedIndex ? 'border-slate-300 ring-2 ring-slate-400' : 'border-slate-200',
              ].join(' ')}
            >
              <img
                src={url}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}



  // ===== Render =====
  return (
    <main className="min-h-screen overflow-x-hidden">
      {loading && <Skeleton />}
      {error && !loading && <ErrorView />}


      {listing && !loading && !error && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:my-10 relative overflow-x-hidden touch-pan-y mt-10">
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">{listing.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <FaMapMarkerAlt className="text-green-700" />
              <span>{listing.address}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Gallery + details */}
            <div className="lg:col-span-8">
              <Gallery />

              {/* Stats */}
              <div className="mt-6 border-y border-slate-100 py-5 flex flex-wrap gap-x-10 gap-y-4">
                <Stat
                  icon={FaBed}
                  label="Bedrooms"
                  value={
                    listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`
                  }
                />
                <Stat
                  icon={FaBath}
                  label="Bathrooms"
                  value={
                    listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`
                  }
                />
                <Stat
                  icon={FaParking}
                  label="Parking"
                  value={listing.parking ? 'Parking spot' : 'No parking'}
                />
                <Stat
                  icon={FaChair}
                  label="Appliances"
                  value={listing.furnished ? 'Furnished' : 'Unfurnished'}
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-slate-800 whitespace-pre-line leading-relaxed">
                  <span className="font-semibold text-slate-950">Description — </span>
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Right: Pricing + contact */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <PriceBlock />
              {/* Quick info card */}
              <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">At a glance</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FaMapMarkedAlt className="text-slate-500" />
                    <a href={mapUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      Open in Google Maps
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShare className="text-slate-500" />
                    <button onClick={handleShare} className="hover:underline">Share this listing</button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* Floating share button (kept, but modernized) */}
      {listing && (
        <button
          onClick={handleShare}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:shadow-lg"
          aria-label="Share"
        >
          <FaShare className="text-slate-600" />
        </button>
      )}

      {/* Copied toast */}
      <div
        className={`pointer-events-none fixed right-6 bottom-24 z-40 transition-all ${
          copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
        aria-live="polite"
      >
        <div className="rounded-lg bg-slate-900 text-white px-3 py-2 text-sm shadow-lg">Link copied</div>
      </div>
      <Footer />
    </main>
  )
}
