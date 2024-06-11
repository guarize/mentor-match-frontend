import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" legacyBehavior passHref>
          <a className="text-white font-bold">Mentor Match</a>
        </Link>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/auth/login';
            }}
            className="text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
