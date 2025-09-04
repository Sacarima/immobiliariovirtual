// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ListingItem from '../components/ListingItem';
// import useMediaQuery from '../hooks/useMediaQuery';



// const BRAND = "#041337";    
// const BRAND2 = "#C85F31";

// const HomeSearch = () => {
//   const navigate = useNavigate();
//   const [sidebardata, setSidebardata] = useState({
//     searchTerm: '',
//     type: 'all',
//     parking: false,
//     furnished: false,
//     offer: false,
//     sort: 'created_at',
//     order: 'desc',
//     minPrice: 0,
//     maxPrice: 100000000, // 100 million
//   });

//   const [listings, setListings] = useState([]);
//   const isAboveSmallScreens = useMediaQuery("(min-width: 768px)")

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     const typeFromUrl = urlParams.get('type');
//     const parkingFromUrl = urlParams.get('parking');
//     const furnishedFromUrl = urlParams.get('furnished');
//     const offerFromUrl = urlParams.get('offer');
//     const sortFromUrl = urlParams.get('sort');
//     const orderFromUrl = urlParams.get('order');
//     const minPriceFromUrl = urlParams.get('minPrice');
//     const maxPriceFromUrl = urlParams.get('maxPrice');

//     if (
//       searchTermFromUrl ||
//       typeFromUrl ||
//       parkingFromUrl ||
//       furnishedFromUrl ||
//       offerFromUrl ||
//       sortFromUrl ||
//       orderFromUrl ||
//       minPriceFromUrl ||
//       maxPriceFromUrl
//     ) {
//       setSidebardata({
//         searchTerm: searchTermFromUrl || '',
//         type: typeFromUrl || 'all',
//         parking: parkingFromUrl === 'true' ? true : false,
//         furnished: furnishedFromUrl === 'true' ? true : false,
//         offer: offerFromUrl === 'true' ? true : false,
//         sort: sortFromUrl || 'created_at',
//         order: orderFromUrl || 'desc',
//         minPrice: minPriceFromUrl || 0,
//         maxPrice: maxPriceFromUrl || 100000000, // 100 million
//       });
//     }

//     const fetchListings = async () => {
//       const searchQuery = urlParams.toString();
//       const res = await fetch(`/api/listing/get?${searchQuery}`);
//       const data = await res.json();
//       if (data.length > 8) {
//         setShowMore(true);
//       } else {
//         setShowMore(false);
//       }
//       setListings(data);
//     };

//     fetchListings();
//   }, [location.search]);

//   const handleChange = (e) => {
//     if (
//       e.target.id === 'all' ||
//       e.target.id === 'rent' ||
//       e.target.id === 'sale'
//     ) {
//       setSidebardata({ ...sidebardata, type: e.target.id });
//     }

//     if (e.target.id === 'searchTerm') {
//       setSidebardata({ ...sidebardata, searchTerm: e.target.value });
//     }

//     if (
//       e.target.id === 'parking' ||
//       e.target.id === 'furnished' ||
//       e.target.id === 'offer'
//     ) {
//       setSidebardata({
//         ...sidebardata,
//         [e.target.id]:
//           e.target.checked || e.target.checked === 'true' ? true : false,
//       });
//     }

//     if (e.target.id === 'sort_order') {
//       const sort = e.target.value.split('_')[0] || 'created_at';
//       const order = e.target.value.split('_')[1] || 'desc';
//       setSidebardata({ ...sidebardata, sort, order });
//     }

//     if (e.target.id === 'minPrice') {
//       setSidebardata({ ...sidebardata, minPrice: e.target.value });
//     }

//     if (e.target.id === 'maxPrice') {
//       setSidebardata({ ...sidebardata, maxPrice: e.target.value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams();
//     urlParams.set('searchTerm', sidebardata.searchTerm);
//     urlParams.set('type', sidebardata.type);
//     urlParams.set('parking', sidebardata.parking);
//     urlParams.set('furnished', sidebardata.furnished);
//     urlParams.set('offer', sidebardata.offer);
//     urlParams.set('sort', sidebardata.sort);
//     urlParams.set('order', sidebardata.order);
//     urlParams.set('minPrice', sidebardata.minPrice);
//     urlParams.set('maxPrice', sidebardata.maxPrice);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   const onShowMoreClick = async () => {
//     const numberOfListings = listings.length;
//     const startIndex = numberOfListings;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('startIndex', startIndex);
//     const searchQuery = urlParams.toString();
//     const res = await fetch(`/api/listing/get?${searchQuery}`);
//     const data = await res.json();
//     if (data.length < 9) {
//       setShowMore(false);
//     }
//     setListings([...listings, ...data]);
//   };

//   return (
//     <div className='flex flex-row md:flex-row md:flex-wrap' style={{ "--brand": BRAND, "--brand2": BRAND2 }}>
//       <div className=''>
//         {<form onSubmit={handleSubmit} className='flex bg-white flex-col p-4 gap-8 md:flex-row  lg:flex-wrap'>
//           <div className='flex flex-col items-center md:flex-row md:flex-wrap  gap-2'>
//             <label className='whitespace-nowrap font-semibold'>
//               Search Term:
//             </label>
//             <input
//               type='text'
//               id='searchTerm'
//               placeholder='Search...'
//               className='border rounded-lg p-3 w-full outline-none'
//               value={sidebardata.searchTerm}
//               onChange={handleChange}
//             />
//           </div>
//           <div className='flex gap-2 flex-wrap items-center'>
//             <label className='font-semibold'>Type:</label>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='all'
//                 className='w-5 accent-[#C85F31]'
//                 onChange={handleChange}
//                 checked={sidebardata.type === 'all'}
//               />
//               <span>Rent & Sale</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='rent'
//                 className='w-5 accent-[#C85F31]'
//                 onChange={handleChange}
//                 checked={sidebardata.type === 'rent'}
//               />
//               <span>Rent</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='sale'
//                 className='w-5 accent-[#C85F31]'
//                 onChange={handleChange}
//                 checked={sidebardata.type === 'sale'}
//               />
//               <span>Sale</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='offer'
//                 className='w-5 accent-[#C85F31]'
//                 onChange={handleChange}
//                 checked={sidebardata.offer}
//               />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className='flex gap-2 flex-wrap items-center'>
//             <label className='font-semibold'>Amenities:</label>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='parking'
//                 className='w-5 accent-[#C85F31]'
//                 onChange={handleChange}
//                 checked={sidebardata.parking}
//               />
//               <span>Parking</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='furnished'
//                 className='w-5 accent-[#C85F31]'
//                 onChange={handleChange}
//                 checked={sidebardata.furnished}
//               />
//               <span>Furnished</span>
//             </div>
//           </div>
//           <div className='flex items-center gap-2'>
//             <label className='font-semibold'>Sort:</label>
//             <select
//               onChange={handleChange}
//               defaultValue={'created_at_desc'}
//               id='sort_order'
//               className='border rounded-lg p-3 outline-none'
//             >
//               <option value='default'>Select price range</option>
//               <option value='regularPrice_desc'>Price high to low</option>
//               <option value='regularPrice_asc'>Price low to hight</option>
//               <option value='createdAt_desc'>Latest</option>
//               <option value='createdAt_asc'>Oldest</option>
//             </select>
//           </div>
//           <div className='flex items-center gap-2'>
//             <label className='font-semibold text'>Price range</label>
//             <input
//               type='number'
//               id='minPrice'
//               placeholder='Min'
//               className='border rounded-lg p-3 w-auto outline-none'
//               value={sidebardata.minPrice === '' ? '' : undefined}
//               onChange={handleChange}
//             />
//             <input
//               type='number'
//               id='maxPrice'
//               placeholder='Max'
//               className='border rounded-lg p-3 w-auto outline-none'
//               value={sidebardata.maxPrice === '' ? '' : undefined}
//               onChange={handleChange}
//             />
//           </div>
//           <button 
//              className="inline-flex items-center gap-2 rounded-xl px-8 py-2.5 text-white shadow-sm transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
//               style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
//           >
//             Search
//           </button>
//         </form>}
//       </div>
//     </div>
//   );
// };

// export default HomeSearch;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import useMediaQuery from '../hooks/useMediaQuery';

// Icons (UI only)
import { FiSearch } from 'react-icons/fi';
import { HiAdjustmentsVertical } from 'react-icons/hi2';
import { FaParking, FaCouch, FaTag } from 'react-icons/fa';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia';

const BRAND = "#041337";
const BRAND2 = "#C85F31";

const HomeSearch = () => {
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

  const [listings, setListings] = useState([]);
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');

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
        maxPrice: maxPriceFromUrl || 100000000,
      });
    }

    const fetchListings = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
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

  return (
    <section
      className="w-full"
      style={{ "--brand": BRAND, "--brand2": BRAND2 }}
    >
      {/* Shell */}
      <div className="mx-auto max--7xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-white text-center lg:text-start font-bold text-4xl mt-20 lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Find your next place
          </h2>
          <p className="mt-2 text-center lg:text-start text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Search by term, type, amenities, price and sort preferences.</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Search term */}
            <div className="lg:col-span-4">
              <label htmlFor="searchTerm" className="block text-sm font-medium text-slate-700">Search</label>
              <div className="mt-2 relative">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="City, street, keyword…"
                  className="w-full rounded-xl border-slate-300 pl-10 pr-3 py-3 outline-none focus:border-[var(--brand2)] focus:ring-[var(--brand2)]"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Type selector */}
            <div className="lg:col-span-4">
              <span className="block text-sm font-medium text-slate-700">Type</span>
              <div className="mt-2 inline-flex flex-wrap gap-2 bg-slate-100 rounded-xl p-1">
                {[{ id: 'all', label: 'Rent & Sale' }, { id: 'rent', label: 'Rent' }, { id: 'sale', label: 'Sale' }].map(({ id, label }) => (
                  <div key={id} className="relative">
                    <input
                      type="checkbox"
                      id={id}
                      onChange={handleChange}
                      checked={sidebardata.type === id}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className="cursor-pointer select-none px-4 py-2 rounded-lg text-sm font-medium transition peer-checked:bg-white peer-checked:shadow peer-checked:border peer-checked:border-[var(--brand2)] text-slate-600"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities + Offer */}
            <div className="lg:col-span-4">
              <span className="block text-sm font-medium text-slate-700">Filters</span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'parking', label: 'Parking', Icon: FaParking },
                  { id: 'furnished', label: 'Furnished', Icon: FaCouch },
                  { id: 'offer', label: 'Offer', Icon: FaTag },
                ].map(({ id, label, Icon }) => (
                  <div key={id} className="relative">
                    <input
                      type="checkbox"
                      id={id}
                      onChange={handleChange}
                      checked={sidebardata[id]}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm cursor-pointer select-none transition peer-checked:border-[var(--brand2)] peer-checked:bg-[color-mix(in_srgb,var(--brand2)_10%,white)]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="text-slate-500 text-lg transition peer-checked:text-[var(--brand2)]" />
                        <span className="text-slate-700 transition peer-checked:text-[var(--brand)]">{label}</span>
                      </span>

                      {/* Mobile toggle icons */}
                      <span className="sm:hidden">
                        {sidebardata[id] ? (
                          <LiaToggleOnSolid className="text-2xl text-[var(--brand2)]" />
                        ) : (
                          <LiaToggleOffSolid className="text-2xl text-slate-400" />
                        )}
                      </span>

                      {/* Desktop pill switch */}
                      <span className="hidden sm:inline-block relative h-5 w-10 rounded-full bg-slate-300 transition peer-checked:bg-[var(--brand2)]">
                        <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="lg:col-span-4">
              <label htmlFor="sort_order" className="block text-sm font-medium text-slate-700">Sort</label>
              <div className="mt-2 relative">
                <HiAdjustmentsVertical className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  onChange={handleChange}
                  defaultValue={'created_at_desc'}
                  id='sort_order'
                  className='w-full rounded-xl border-slate-300 pl-10 pr-3 py-3 outline-none focus:border-[var(--brand2)] focus:ring-[var(--brand2)]'
                >
                  <option value='default'>Select price range</option>
                  <option value='regularPrice_desc'>Price high to low</option>
                  <option value='regularPrice_asc'>Price low to hight</option>
                  <option value='createdAt_desc'>Latest</option>
                  <option value='createdAt_asc'>Oldest</option>
                </select>
              </div>
            </div>

            {/* Price range */}
            <div className="lg:col-span-8">
              <span className="block text-sm font-medium text-slate-700">Price range</span>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <input
                  type='number'
                  id='minPrice'
                  placeholder='Min'
                  className='rounded-xl border border-slate-300 p-3 outline-none focus:border-[var(--brand2)] focus:ring-[var(--brand2)]'
                  value={sidebardata.minPrice === '' ? '' : undefined}
                  onChange={handleChange}
                />
                <span className="text-slate-400">—</span>
                <input
                  type='number'
                  id='maxPrice'
                  placeholder='Max'
                  className='rounded-xl border border-slate-300 p-3 outline-none focus:border-[var(--brand2)] focus:ring-[var(--brand2)]'
                  value={sidebardata.maxPrice === '' ? '' : undefined}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="lg:col-span-4 flex items-end">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-white shadow-sm transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundImage: 'linear-gradient(90deg, var(--brand), var(--brand2))' }}
              >
                <FiSearch />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HomeSearch;
