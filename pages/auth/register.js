import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AuthForm from '../../components/AuthForm';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleRegister = async ({ email, password, name, role }) => {
    try {
      await axios.post('http://localhost:3000/auth/register', { email, password, name, role });
      router.push('/auth/login');
    } catch (error) {
      setError('Falha no registro. Tente novamente.');
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <AuthForm mode="register" onSubmit={handleRegister} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
}
