import { forwardRef } from 'react';

interface SearchBarPropsType {
  email: string;
  menuOpen: boolean;
  setMenuOpen: () => void;
  signOut: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar = forwardRef<HTMLDivElement, SearchBarPropsType>(
  function SearchBar(
    { email, menuOpen, setMenuOpen, signOut, searchTerm, setSearchTerm },
    ref,
  ) {
    return (
      <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
        <div className="flex-1 max-w-xxl">
          <input
            type="search"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="relative ml-4" ref={ref}>
          <button
            onClick={setMenuOpen}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label="User menu"
          >
            {email ? Array.from(email)[0].toUpperCase() : `🧑‍💻`}
          </button>

          {menuOpen && (
            <div className="absolute top-11 -right-4 mt-2 w-50 bg-white border border-gray-200 rounded-b shadow-lg z-20">
              <p className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded">
                {email ?? 'johndoe@mail.com'}
              </p>
              <button
                onClick={signOut}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  },
);
export default SearchBar;
