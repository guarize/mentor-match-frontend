import Link from 'next/link';
import { useState } from 'react';

export default function AuthForm({ mode, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('STUDENT');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, name, role });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-1/3">
        <h1 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Registro'}</h1>
        {mode === 'register' && (
          <>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded">
              <option value="STUDENT">Aluno</option>
              <option value="MENTOR">Mentor</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {mode === 'login' ? 'Login' : 'Criar Conta'}
        </button>
        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <Link href="/auth/register" passHref legacyBehavior>
              <a className="text-blue-500">Criar uma conta</a>
            </Link>
          ) : (
            <Link href="/auth/login" passHref legacyBehavior>
              <a className="text-blue-500">Já tem uma conta? Login</a>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
