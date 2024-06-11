import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MenuIcon, LogoutIcon } from '@heroicons/react/outline';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" legacyBehavior passHref>
          <a className="text-2xl font-bold">Mentor Match</a>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" legacyBehavior passHref>
            <a className="hover:text-gray-200 transition-colors duration-300">Home</a>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center hover:text-gray-200 transition-colors duration-300"
          >
            <LogoutIcon className="h-5 w-5 mr-1" />
            Logout
          </button>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/" legacyBehavior passHref>
              <a onClick={() => setIsMenuOpen(false)} className="hover:text-gray-200 transition-colors duration-300">Home</a>
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center hover:text-gray-200 transition-colors duration-300"
            >
              <LogoutIcon className="h-5 w-5 mr-1" />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
