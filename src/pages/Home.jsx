import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import toast from 'react-hot-toast';
import CustomInput from '../components/CustomInput';
import { AuthAPI } from '../services/authService/endpoints';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      AuthAPI.login({
        email: email.trim(),
        password: password.trim()
      })
        .then((response) => {
          localStorage.setItem('access', response.data.access_token);
          localStorage.setItem('refresh', response.data.refresh_token);
          localStorage.setItem('token_type', response.data.token_type);

          // Use the authenticated client to fetch user profile
          return AuthAPI.me();
        })
        .then((userResponse) => {
          // Save the user data object as a string in local storage
          localStorage.setItem('user', JSON.stringify(userResponse.data));

          // Broadcast to the global Redux Store
          dispatch(setUser(userResponse.data));

          navigate('/dashboard');
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Login Failed: ${error.message}`);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#1d2125] flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-[420px] bg-[#22272b] p-10 rounded-xl border border-[#8c9bab]/20 shadow-2xl flex flex-col">
        {/* Logo Header */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-[32px] h-[32px] bg-[#2684ff] rounded-md flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12l10 10 10-10L12 2z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-white text-[22px] tracking-tight">Jira Clone</span>
        </div>

        <h1 className="text-[#c7d1db] text-[16px] font-bold mb-6 text-center">
          Log in to your account
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          <CustomInput
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <CustomInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button
            type="submit"
            className={`mt-4 bg-[#579dff] text-[#1d2125] font-bold py-2 rounded transition-all flex items-center justify-center text-[15px] ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#85b8ff]'}`}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
