import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
//import SwiperCol from '../components/SwiperCol';
import HomeSearch  from './HomeSearch'
import bgImg from '../assets/bgimg66.jpg';
//import Footer from '../components/Footer';
//import { FaFontAwesome } from 'react-icons/fa';
import Service from './Service';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  //console.log(offerListings);
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
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div style={
        { 
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(17, 24, 39)',
          
          
          
        }
      }
      >
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto  md:flex-col'>
          <h1 className=' text-slate-50 font-bold text-3xl mt-20 lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
            The Best Place to buy and sale houses with ease
          </h1>
          <h3 className='text-2xl text-white text-center '>Imovirtual: full house</h3>
          <HomeSearch
            className='max-w-8xl mx-auto'
          />
        </div>
      </div>
   
      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  width: '100%',
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className='h-[550px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* listing results for offer, sale and rent */}

      <div className=' max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className='text-center'>
          <h2 className='text-4xl font-semibold text-slate-700'>Explore homes on ImmobiliarioVirtual</h2>
          <p className='text-slate-600 text-lg mt-4'>
            Take a deep dive and browse homes for sale, original neighborhood photos, <br />resident reviews and local insights to find what is right for you.
          </p>
        </div>
        {offerListings && offerListings.length > 0 && (
          <div className='mx-auto'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-[#C85F31] hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 space-x-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='mx-auto'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-[#C85F31] hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4 space-x-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=' mx-auto'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-[#C85F31] hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4 space-x-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='bg-[#03557617]'>
        <Service/>
      </div>

      {/* <div>
      <div class="relative bg-[#C85F31] mb-6">
    <div class="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 224 12" fill="currentColor" class="w-full -mb-1 text-white" preserveAspectRatio="none">
            <path
                d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z">
            </path>
        </svg>
    </div>
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div class="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 class="mb-6 font-sans text-3xl text-center font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              Subscribe to our newsletter
            </h2>
            <p class="mb-6 text-base text-indigo-200 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae. explicabo. Sed ut perspiciatis unde omnis.
            </p>
            <form class="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
                <input
          placeholder="Email"
          required=""
          type="text"
          class="flex-grow w-full h-12 px-4 mb-3 text-white transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
        />
                <a href="/"
                    class="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-gray-200 transition duration-200 rounded shadow-md md:w-auto hover:text-deep-purple-900 bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none">
                    Subscribe
                </a>
            </form>
            <p class="max-w-md mb-10 text-xs tracking-wide text-indigo-100 sm:text-sm sm:mx-auto md:mb-16">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
            </p>
            <a href="/" aria-label="Scroll down"
                class="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path
                        d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z">
                    </path>
                </svg>
            </a>
        </div>
    </div>
</div>
      </div> */}

      <div className='max-w-6xl mx-auto p-3'>
        <div className="2xl:mx-auto 2xl:container mx-4 py-16">
          <div className="w-full relative flex items-center justify-center">
            <img src="https://i.ibb.co/4sYZ8gC/img-2.png" alt="dining" className="w-full h-full absolute z-0 hidden xl:block" />
            <img src="https://i.ibb.co/bbS3J9C/pexels-max-vakhtbovych-6301182-1.png" alt="dining" className="w-full h-full absolute z-0 hidden sm:block xl:hidden" />
            <img src="https://i.ibb.co/JKkzGDs/pexels-max-vakhtbovych-6301182-1.png" alt="dining" className="w-full h-full absolute z-0 sm:hidden" />
            <div className="bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
              <h1 className="text-4xl font-semibold leading-9 text-white text-center">Do not miss out!</h1>
              <p className="text-base leading-normal text-center text-white mt-6">
                Subscribe to your newsletter to stay in the loop. Our newsletter is sent once in <br />
                a week on every friday so subscribe to get latest news and updates.
              </p>
              <div className="sm:border border-white flex-col sm:flex-row flex items-center lg:w-5/12 w-full mt-12 space-y-4 sm:space-y-0">
                <input className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white" placeholder="Email Address" />
                <button className="focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}