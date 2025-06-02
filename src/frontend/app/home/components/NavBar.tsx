import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        router.replace('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error: ' + (error as Error).message);
    }
    setMenuOpen(false);
  }

  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
      <div className="flex-1 max-w-xxl">
        <input
          type="search"
          placeholder="Rechercher..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="relative ml-4" ref={avatarRef}>
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="User menu"
        >
          🧑‍💻
        </button>

        {menuOpen && (
          <div className="absolute top-11 -right-4 mt-2 w-50 bg-white border border-gray-200 rounded-b shadow-lg z-20">
            <p className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded">
              user@mail.com
            </p>
            <button
              onClick={() => {
                void handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded"
            >
              Déconnection
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
