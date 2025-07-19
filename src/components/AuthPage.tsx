// src/pages/AuthPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export default function AuthPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        console.log('token')
        console.log(token)
        if (token) {
            const auth = getAuth();
            signInWithCustomToken(auth, token)
                .then(() => {
                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.error('Erro ao autenticar com token:', err);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, []);

    return <p className="text-center mt-20">Autenticando via app...</p>;
}
