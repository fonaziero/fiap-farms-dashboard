import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                navigate('/login');
            } else {
                setUser(firebaseUser);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-card p-6">
            <div className="max-w-xl mx-auto bg-background p-6 rounded shadow">
                <h1 className="text-2xl font-bold text-card-foreground mb-4">👤 Perfil do Usuário</h1>
                {user ? (
                    <div className="space-y-4">
                        <div className='flex gap-3'>
                            <span className="font-semibold text-card-foreground">Nome:</span>
                            <p className="text-card-foreground">{user.displayName || 'Não informado'}</p>
                        </div>
                        <div className='flex gap-3'>
                            <span className="font-semibold text-card-foreground">Email:</span>
                            <p className="text-card-foreground">{user.email}</p>
                        </div>
                        <div className='flex gap-3'>
                            <span className="font-semibold text-card-foreground">UID:</span>
                            <p className="text-gray-500 text-sm">{user.uid}</p>
                        </div>
                    </div>
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>
        </div>
    );
}
