import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          HeadlinesHub
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/personalized" className="hover:text-gray-300">Personalized</Link>
              <button onClick={logout} className="hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}; 