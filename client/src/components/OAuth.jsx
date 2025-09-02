import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const BRAND = "#041337";   
const BRAND2 = "#C85F31"; 

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (

        <div className='w-full' style={{ "--brand": BRAND, "--brand2": BRAND2 }}>
          <button
              className='bg-[#C85F31] w-full text-white p-3 uppercase items-center rounded-lg justify-center flex gap-3 hover:opacity-95' type='button'
               style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
              onClick={handleGoogleClick}
          >
              <FaGoogle  />
              <span>Continue with Google</span>
          </button>
        </div>


  );
}