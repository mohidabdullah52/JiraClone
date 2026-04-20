import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/NoAuthAxios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      axiosInstance.post('/auth/login', {
        email: email.trim(),
        password: password.trim()
      })
        .then((response) => {
          localStorage.setItem('access', response.data.access_token);
          localStorage.setItem('refresh', response.data.refresh_token);
          localStorage.setItem('token_type', response.data.token_type);
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error(error);
          alert(`Login Failed: ${error.message}`);
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
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text-[#9fadbc] mb-1.5 ml-0.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-[#1d2125] border border-[#738496] rounded px-3 py-2 text-[#c7d1db] placeholder-[#738496] focus:outline-none focus:border-[#4c9aff] focus:ring-1 focus:ring-[#4c9aff] transition-all text-[14px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[12px] font-bold text-[#9fadbc] mb-1.5 ml-0.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-[#1d2125] border border-[#738496] rounded px-3 py-2 text-[#c7d1db] placeholder-[#738496] focus:outline-none focus:border-[#4c9aff] focus:ring-1 focus:ring-[#4c9aff] transition-all text-[14px]"
            />
          </div>

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
