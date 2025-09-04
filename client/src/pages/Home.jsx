// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Navigation } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import ListingItem from '../components/ListingItem';
// import HomeSearch  from './HomeSearch'
// import bgImg from '../assets/bgimg666.jpg';
// import Service from './ServicesImmobiliaVirtual';
// import ImmobiliaVirtualFAQ from '../components/ImmobiliaVirtualFAQ'
// import NewsletterSubscribe from '../components/NewsletterSubscribe';
// import Footer from '../components/Footer';


// const BRAND = "#041337"; 
// const BRAND2 = "#C85F31"; 


// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation]);
//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?offer=true&limit=4');
//         const data = await res.json();
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchRentListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=rent&limit=4');
//         const data = await res.json();
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchSaleListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=sale&limit=4');
//         const data = await res.json();
//         setSaleListings(data);
//       } catch (error) {
//         log(error);
//       }
//     };
//     fetchOfferListings();
//   }, []);
//   return (
//     <div>
//       {/* top */}
//       <div className='' style={
//         { 
          
//           backgroundImage: `url(${bgImg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundColor: 'rgba(17, 24, 39)',
//           boxShadow: 'inset 0 0 0 2000px rgba(17, 24, 39, 0.6)',
//         }
//       }
//       >
//         <div className='flex flex-col gap-6 p-28 px-3 lg:max-w-6xl mx-auto  md:flex-col w-full'>
//           {/* <h1 className=' text-slate-50 text-center lg:text-start font-bold text-3xl mt-20 lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
//             The Best Place to buy and sale houses with ease
//           </h1>
//           <h3 className='text-2xl text-white text-center '>Imovirtual: full house</h3> */}
//           <HomeSearch
//             className='max-w-8x mx-aauto'
//           />
//         </div>
//       </div>
   

//       {/* listing results for offer, sale and rent */}

//       <div className=' max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
//         <div className='text-center'>
//           <h2 className='text-4xl font-semibold text-slate-700'>Explore homes on ImmobiliarioVirtual</h2>
//           <p className='text-slate-600 text-lg mt-4'>
//             Take a deep dive and browse homes for sale, original neighborhood photos, <br />resident reviews and local insights to find what is right for you.
//           </p>
//         </div>
//         {offerListings && offerListings.length > 0 && (
//           <div className='mx-auto'>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
//               <Link className='text-sm text-[#C85F31] hover:underline' to={'/search?offer=true'}>Show more offers</Link>
//             </div>
//             <div className='flex flex-wrap gap-4 space-x-4'>
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className='mx-auto'>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
//               <Link className='text-sm text-[#C85F31] hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
//             </div>
//             <div className='flex flex-wrap gap-4 space-x-4'>
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className=' mx-auto'>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
//               <Link className='text-sm text-[#C85F31] hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
//             </div>
//             <div className='flex flex-wrap gap-4 space-x-4'>
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* FAQ */}
//       <div className='bg-gray-50'>
//         <ImmobiliaVirtualFAQ />
//       </div>

//         {/* NEWS LETTER */}
//       <div className=''>
//         <NewsletterSubscribe />
//       </div>
//       <Footer />
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import HomeSearch from './HomeSearch';
import bgImg from '../assets/bgimg666.jpg';
import Service from './ServicesImmobiliaVirtual';
import ImmobiliaVirtualFAQ from '../components/ImmobiliaVirtualFAQ';
import NewsletterSubscribe from '../components/NewsletterSubscribe';
import Footer from '../components/Footer';

const BRAND = '#041337';
const BRAND2 = '#C85F31';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    // Prevent horizontal scroll on mobile globally for this page
    <div className="overflow-x-hidden" style={{ '--brand': BRAND, '--brand2': BRAND2 }}>
      {/* HERO */}
      <section
        className="relative w-full"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4,19,55,0.65), rgba(200,95,49,0.35)), url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-24">
          {/* Keep your HomeSearch exactly the same behavior */}
          <HomeSearch />
        </div>
      </section>

      {/* LISTING SECTIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 md:py-14">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">Explore homes on ImmobiliarioVirtual</h2>
          <p className="text-slate-600 text-base md:text-lg mt-3 md:mt-4">
            Take a deep dive and browse homes for sale, original neighborhood photos,<br className="hidden md:block" />
            resident reviews and local insights to find what is right for you.
          </p>
        </div>

        {/* Offers */}
        {offerListings && offerListings.length > 0 && (
          <div className="mt-10">
            <div className="fle items-end justify-between gap-3 flex-wrap">
              <h3 className="text-2xl font-semibold text-slate-700">Recent offers</h3>
              <Link className="text-sm text-[var(--brand2)] hover:underline" to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="mt-12">
            <div className="fle items-end justify-between gap-3 flex-wrap">
              <h3 className="text-2xl font-semibold text-slate-700">Recent places for rent</h3>
              <Link className="text-sm text-[var(--brand2)] hover:underline" to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="mt-12">
            <div className="fle items-end justify-between gap-3 flex-wrap">
              <h3 className="text-2xl font-semibold text-slate-700">Recent places for sale</h3>
              <Link className="text-sm text-[var(--brand2)] hover:underline" to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 ">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10">
          <ImmobiliaVirtualFAQ />
        </div>
      </section>

      {/* Newsletter */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10">
          <NewsletterSubscribe />
        </div>
      </section>

      <Footer />
    </div>
  );
}
