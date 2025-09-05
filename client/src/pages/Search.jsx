import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
    minPrice: 0,
    maxPrice: 100000000, // 100 million
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
        minPrice: minPriceFromUrl || 0,
        maxPrice: maxPriceFromUrl || 100000000, // 100 million
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }

    if (e.target.id === 'minPrice') {
      setSidebardata({ ...sidebardata, minPrice: e.target.value });
    }

    if (e.target.id === 'maxPrice') {
      setSidebardata({ ...sidebardata, maxPrice: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    urlParams.set('minPrice', sidebardata.minPrice);
    urlParams.set('maxPrice', sidebardata.maxPrice);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  /* -------------------- UI (modern, responsive, accessible) -------------------- */
  return (
<main
  className="relativ flex flex-col lg:flex-row min-h-screen bg-white text-gray-900"
  style={{ ['--brand']: '#041337', ['--brand2']: '#C85F31' }}
>
  {/* decorative aura */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 -z-10"
    style={{
      background:
        'radial-gradient(900px 300px at 50% -10%, rgba(4,19,55,0.08), transparent 60%), radial-gradient(540px 240px at 85% 120%, rgba(200,95,49,0.10), transparent 60%)',
    }}
  />
        {/* Sidebar / Filters */}
      <aside className="lg:col-[1] w-full lg:w-auto px-4 lg:px-0 mt-20 lg:mt-0  md:sticky md:top-24 self-start">
         <header className="mb-6 px-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand2)] bg-clip-text text-transparent">
              Search listings
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Filter by type, amenities, price, and more.
          </p>
          <p className=" text-sm text-gray-600">
            Results update on submit.
          </p>
        </header>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm lg:w-[320px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Search term */}
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">
                Search term
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="e.g., Warsaw apartment"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <fieldset>
              <legend className="text-sm font-medium text-gray-700">Type</legend>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="all"
                    className="h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    onChange={handleChange}
                    checked={sidebardata.type === 'all'}
                  />
                  <span>Rent & Sale</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="rent"
                    className="h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    onChange={handleChange}
                    checked={sidebardata.type === 'rent'}
                  />
                  <span>Rent</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="sale"
                    className="h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    onChange={handleChange}
                    checked={sidebardata.type === 'sale'}
                  />
                  <span>Sale</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="offer"
                    className="h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  <span>Offer</span>
                </label>
              </div>
            </fieldset>

            {/* Amenities */}
            <fieldset>
              <legend className="text-sm font-medium text-gray-700">Amenities</legend>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="parking"
                    className="h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span>Parking</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span>Furnished</span>
                </label>
              </div>
            </fieldset>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort_order" className="text-sm font-medium text-gray-700">
                Sort
              </label>
              <select
                onChange={handleChange}
                defaultValue={'created_at_desc'}
                id="sort_order"
                className="ml-auto rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand2)] focus:ring-2 focus:ring-[color:var(--brand2)]/30"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>

            {/* Price range */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price range</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  id="minPrice"
                  placeholder="Min"
                  className="w-28 rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                  value={sidebardata.minPrice === '' ? '' : undefined}
                  onChange={handleChange}
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="Max"
                  className="w-28 rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                  value={sidebardata.maxPrice === '' ? '' : undefined}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-white font-medium shadow-sm transition active:scale-95"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--brand), var(--brand2))' }}
            >
              Search
            </button>
          </form>
        </div>
      </aside>

  <section className="flex-1 w-full gap-2  px-4 sm:px-6 pt-24 md:pt-28 pb-6 ml-auto">
  {/* Centered inner container: full width on mobile, capped on large screens */}
  <div className="w-full max-w-full lg:max-w-[900px mx-auto">
    <div className="rounded-2xl  bg-white p-4 sm:p-5">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-700">Listing results:</h2>
    </div>

    <div className="pt-4">
      <div className="p-4 sm:p-6  bg-white">
        {/* states */}
        {!loading && listings.length === 0 && (
          <p className="text-gray-600">No listing found.</p>
        )}
        {loading && (
          <div className="w-full py-10 grid place-items-center gap-4 text-slate-700">
            <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
            </svg>
          </div>
        )}

        {/* grid */}
        {!loading && listings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-2 items-stretch">
            {listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        {showMore && (
          <div className="mt-8">
            <button
              onClick={onShowMoreClick}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[color:var(--brand)] font-medium shadow-sm hover:bg-gray-50 active:scale-95"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
</main>

  );
}
