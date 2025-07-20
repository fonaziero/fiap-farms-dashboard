import { Menu, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../lib/utils';

export default function Header({ user, setSidebarOpen }: any) {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const theme = getTheme();

    const handleLogout = () => {
        signOut(auth).then(() => navigate('/login'));
    };

    const handleProfile = () => navigate('/profile')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="relative flex justify-between items-center bg-background p-4 mx-3 md:mx-6 rounded shadow mb-6">
            {/* Botão de menu mobile */}
            <button
                onClick={() => setSidebarOpen(true)}
                className={`md:hidden bg-background p-2 rounded-md shadow mr-2 ${theme === 'dark' ? 'text-green-700' : 'text-primary'} `}
            >
                <Menu />
            </button>

            {/* Título */}
            <h1 className={`text-2xl font-bold  text-center md:text-start ${theme === 'dark' ? 'text-green-700' : 'text-primary'}`}>🌾 FIAP Farms Dashboard</h1>

            {/* Usuário + dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 text-card-foreground hover:text-green-700"
                >
                    <span>{user?.displayName || user?.email}</span>
                    <ChevronDown size={16} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-background border rounded shadow-lg z-50">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm"
                            onClick={handleProfile}
                        >
                            Perfil
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm text-red-600"
                            onClick={handleLogout}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
