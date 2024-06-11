import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AuthForm from '../../components/AuthForm';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <AuthForm mode="login" onSubmit={handleLogin} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
}
