import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'
const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // 'Login' or 'SignUp'
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');

const navigate=useNavigate()
  const onSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/send-otp', { email });
      alert('OTP sent to email');
      setStep(2);
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/verify-otp', {
        email,
        otp,
        name: currentState === 'SignUp' ? name : undefined
      });
      localStorage.setItem('token', res.data.token);
      alert('✅ Logged in!');
     navigate('/')
      
    } catch (err) {
      alert('❌ Invalid OTP');
    }
  };

  return (
    <div>
      <form
        onSubmit={step === 1 ? onSendOtp : onVerifyOtp}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === 'SignUp' && step === 1 && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {step === 2 && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Need help?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => {
                setCurrentState('SignUp');
                setStep(1);
              }}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => {
                setCurrentState('Login');
                setStep(1);
              }}
              className="cursor-pointer"
            >
              Login here
            </p>
          )}
        </div>

        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {step === 1 ? 'Send OTP' : 'Verify & Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
